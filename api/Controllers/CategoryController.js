module.exports = app => {
    const controller = {};
    const Category = app.Models.Category;
    const responseApi = app.Helpers.ResponseApi;

    controller.listCategory = (req, res) => {
        let dataCategory = req.body;
        req.body.user_id = req.userId;

        Category.findAll(dataCategory)
            .then((response) => {
                res.status(200).json(
                    responseApi.success("Suas categorias foram listadas com sucesso!", response)
                );
            }).catch((err) => {
                res.status(500).json(responseApi.error());
                console.error(err);
            });
    }

    controller.createCategory = (req, res) => {
        let dataCategory = req.body;
        req.body.user_id = req.userId;

        Category.save(dataCategory)
            .then((response) => {
                res.status(200).json(
                    responseApi.success("Categoria salva com sucesso!", response)
                );
            }).catch((err) => {
                res.status(500).json(responseApi.error());
                console.error(err);
            });
    }

    controller.updateCategory = (req, res) => {
        let dataCategory = req.body;
        req.body.id = req.params.id;

        Category.update(dataCategory)
            .then((response) => {
                res.status(200).json(
                    responseApi.success("Categoria atualizada com sucesso!", response)
                );
            }).catch((err) => {
                res.status(500).json(responseApi.error());
                console.error(err);
            });
    }

    controller.deleteCategory = (req, res) => {
        let dataCategory = req.body;
        req.body.id = req.params.id;

        Category.delete(dataCategory)
            .then((response) => {
                res.status(200).json(
                    responseApi.success("Categoria excluida com sucesso!", response)
                );
            }).catch((err) => {
                res.status(500).json(responseApi.error());
                console.error(err);
            });
    }

    return controller;
}