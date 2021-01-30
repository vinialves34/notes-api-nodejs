module.exports = app => {
    const controller = app.Controllers.NotesController;

    app.route('/api/notes').get(controller.listNotes);
    app.route('/api/notes/create').post(controller.createNotes);
    app.route('/api/notes/update/:id').put(controller.updateNotes);
    app.route('/api/notes/delete/:id').delete(controller.deleteNotes);
}