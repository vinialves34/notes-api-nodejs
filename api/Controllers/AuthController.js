module.exports = app => {
    const controller = {};
    const Users = app.Models.Users;
    const responseApi = app.Helpers.ResponseApi;
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcryptjs');

    controller.registerUser = async (req, res) => {
        let isRegistredEmail;
        let password = bcrypt.hashSync(req.body.password, 8);
            req.body.password = password;
        let dataUser = req.body;

        await Users.findByEmail(req.body.email)
                .then((response) => {
                    isRegistredEmail = response.length > 0 ? true : false;
                }).catch((err) => {
                    res.status(500).json(responseApi.error());
                    console.error(err);
                });

        if (isRegistredEmail) {
            res.status(200).json(
                responseApi.success("E-mail já registrado no banco de dados. Por favor insira outro E-mail", {email: req.body.email})
            );
        } else {
            Users.save(dataUser)
                .then((response) => {
                    const token = jwt.sign({ id: response.id}, process.env.ACCESS_TOKEN_SECRET);
                    
                    res.status(200).json(
                        responseApi.success("Usuário registrado com sucesso!", {auth: true, token: token})
                    );
                }).catch((err) => {
                    res.status(500).json(responseApi.error());
                    console.error(err);
                });
        }

    }

    controller.loginUser = (req, res) => {
        Users.findByEmail(req.body.email)
            .then((response) => {
                if (response.length === 0) {
                    res.status(404).json(
                        responseApi.notFound("Usuário não foi encontrado!")
                    );
                } else {
                    let passwordisValid = bcrypt.compareSync(req.body.password, response[0].senha);
                    if (!passwordisValid) res.status(401).json({ auth: false, token: null });

                    let token = jwt.sign({ id: response[0].id }, process.env.ACCESS_TOKEN_SECRET);

                    res.status(200).json(
                        responseApi.success("Login efetuado com sucesso!", {auth: true, token: token})
                    );
                }
            }).catch((err) => {
                res.status(500).json(responseApi.error());
                console.error(err);
            });
    }

    return controller;
}