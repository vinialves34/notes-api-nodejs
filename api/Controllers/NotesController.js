module.exports = app => {
    const controller = {};
    const Notes = app.Models.Notes

    controller.listNotes = (req, res) => {
        Notes.findAll()
            .then((response) => { 
                res.status(200).send(response);
            }).catch((err) => {
                res.status(500).send({"Status": "500", "Message": "Ocorreu um problema!"});
            });
    }

    controller.createNotes = () => {

    }

    controller.updateNotes = () => {

    }

    controller.deleteNotes = () => {

    }

    return controller;
}