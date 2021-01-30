module.exports = app => {
    const db = require('../Database/database');
    const model = {};

    model.findAll = async (req, res) => {
        try {
            const response = await db.query("SELECT * FROM public.notas");
            return response.rows;
        } catch (error) {
            return error;
        }
    }

    return model;
}