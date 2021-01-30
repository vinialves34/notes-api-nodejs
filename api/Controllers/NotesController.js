module.exports = () => {
    const controller = {};

    controller.listNotes = (req, res) => {
        try {
            return res.send("Teste");
        } catch (error) {
            return res.send(error);
        }
    }

    controller.createNotes = () => {

    }

    controller.updateNotes = () => {

    }

    controller.deleteNotes = () => {
        
    }

    return controller;
}