module.exports = app => {
    const db = require('../Database/database');
    const model = {};

    model.findAll = async (req, res) => {
        try {
            const responseQuery = await db.query("SELECT * FROM public.notas");
            return responseQuery.rows;
        } catch (error) {
            throw error;
        }
    }

    model.save = async (req, res) => {
        try {
            await db.query('BEGIN');
            const queryText = "INSERT INTO public.notas(titulo, descricao, categoria_id) VALUES($1, $2, $3) RETURNING *";
            const responseQuery = await db.query(queryText, [req.title, req.description, req.category_id]);
            await db.query('COMMIT');

            return responseQuery.rows[0];
        } catch (error) {
            await db.query('ROLLBACK');
            throw error;
        }
    }

    model.update = async (req, res) => {
        try {
            await db.query('BEGIN');
            const queryText = "UPDATE public.notas SET titulo = $1, descricao = $2, categoria_id = $3 WHERE id = $4 RETURNING *";
            const responseQuery = await db.query(queryText, [req.title, req.description, req.category_id, req.id]);
            await db.query('COMMIT');

            return responseQuery.rows[0];
        } catch (error) {
            await db.query('ROLLBACK');
            throw error
        }
    }

    return model;
}