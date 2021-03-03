module.exports = app => {
    const controller = {};
    const Notes = app.Models.Notes
    const responseApi = app.Helpers.ResponseApi;

    controller.listNotes = (req, res) => {
        Notes.findAll()
            .then((response) => { 
                res.status(200).json(
                    responseApi.success("Suas anotações foram listadas com sucesso!", response)
                );
            }).catch((err) => {
                res.status(500).json(responseApi.error());
                console.error(err);
            });
    }

    controller.createNotes = (req, res) => {
        let dataNotes = req.body;
        req.body.user_id = req.userId;

        Notes.save(dataNotes)
            .then((response) => {
                res.status(200).json(
                    responseApi.success("Anotação salva com sucesso!", response)
                );
            }).catch((err) => {
                res.status(500).json(responseApi.error());
                console.error(err);
            });
    }

    controller.updateNotes = (req, res) => {
        let dataNotes = req.body;
        req.body.id = req.params.id;

        Notes.update(dataNotes)
            .then((response) => {
                res.status(200).json(
                    responseApi.success("Anotação atualizada com sucesso!", response)
                );
            }).catch((err) => {
                res.status(500).json(responseApi.error());
                console.error(err);
            });
    }

    controller.deleteNotes = (req, res) => {
        let dataNotes = req.body;
        req.body.id = req.params.id;

        Notes.delete(dataNotes)
            .then((response) => {
                res.status(200).json(
                    responseApi.success("Anotação excluida com sucesso!", response)
                );
            }).catch((err) => {
                res.status(500).json(responseApi.error());
                console.error(err);
            });
    }

    return controller;
}