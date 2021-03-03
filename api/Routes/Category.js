module.exports = app => {
    const controller = app.Controllers.CategoryController;
    const auth = app.Security.Authentication;

    app.route('/api/category').get(auth, controller.listCategory);
    app.route('/api/category').post(auth, controller.createCategory);
    app.route('/api/category/:id').put(auth, controller.updateCategory);
    app.route('/api/category/:id').delete(auth, controller.deleteCategory);
}