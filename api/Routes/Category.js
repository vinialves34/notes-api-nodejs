module.exports = app => {
    const controller = app.Controllers.CategoryController;

    app.route('/api/category').get(controller.listCategory);
}