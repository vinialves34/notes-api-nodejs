module.exports = app => {
    const db = require('../Database/database');
    const model = {};

    model.save = async (req, res) => {
        try {
            await db.query('BEGIN');
            const queryText = "INSERT INTO public.usuarios(nome, email, senha) VALUES($1, $2, $3) RETURNING *";
            const responseQuery = await db.query(queryText, [req.name, req.email, req.password]);
            await db.query('COMMIT');

            return responseQuery.rows[0];
        } catch (error) {
            await db.query('ROLLBACK');
            throw error;
        }
    }

    model.findByEmail = async (req, res) => {
        try {
            const queryText = "SELECT * FROM public.usuarios WHERE email = $1"
            const responseQuery = await db.query(queryText, [req]);
            return responseQuery.rows;
        } catch (error) {
            throw error;
        }
    }

    model.findById = async (req, res) => {
        try {
            const queryText = "SELECT * FROM public.usuarios WHERE id = $1"
            const responseQuery = await db.query(queryText, [req]);
            return responseQuery.rows;
        } catch (error) {
            throw error;
        }
    }

    return model;
}