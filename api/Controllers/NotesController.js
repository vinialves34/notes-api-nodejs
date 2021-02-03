module.exports = app => {
    const controller = {};
    const Notes = app.Models.Notes
    const responseApi = app.Helpers.ResponseApi;

    controller.listNotes = (req, res) => {
        console.log("Caiu no Controller");
        Notes.findAll()
            .then((response) => { 
                res.status(200).send(
                    responseApi.success("Anotações listadas com sucesso!", response)
                );
            }).catch((err) => {
                res.status(500).send(responseApi.error());
                console.error(err);
            });
    }

    controller.createNotes = (req, res) => {
        let dataNotes = req.body;
        Notes.save(dataNotes)
            .then((response) => {
                res.status(200).send(
                    responseApi.success("Anotação salva com sucesso!", response)
                );
            }).catch((err) => {
                res.status(500).send(responseApi.error());
                console.error(err);
            });
    }

    controller.updateNotes = (req, res) => {
        let dataNotes = req.body;
        req.body.id = req.params.id;

        Notes.update(dataNotes)
            .then((response) => {
                res.status(200).send(
                    responseApi.success("Anotação atualizada com sucesso!", response)
                );
            }).catch((err) => {
                res.status(500).send(responseApi.error());
                console.error(err);
            });
    }

    controller.deleteNotes = (req, res) => {

    }

    return controller;
}