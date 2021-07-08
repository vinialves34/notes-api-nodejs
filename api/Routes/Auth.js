module.exports = app => {
    const controller = app.Controllers.AuthController

    app.route('/api/auth/register').post(controller.registerUser);
    app.route('/api/auth/login').post(controller.loginUser);
}