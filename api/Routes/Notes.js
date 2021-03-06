module.exports = app => {
    const controller = app.Controllers.NotesController;
    const auth = app.Security.Authentication;

    app.route('/api/notes').get(auth, controller.listNotes);
    app.route('/api/notes').post(auth, controller.createNotes);
    app.route('/api/notes/:id').put(auth, controller.updateNotes);
    app.route('/api/notes/:id').delete(auth, controller.deleteNotes);
}