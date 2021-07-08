module.exports = app => {
    const db = require('../Database/database');
    const model = {};

    model.findAll = async (req, res) => {
        try {
            const queryText = "SELECT * FROM public.categorias WHERE usuario_id IN (1, $1)";
            const responseQuery = await db.query(queryText, [req.user_id]);
            return responseQuery.rows;
        } catch (error) {
            throw error;
        }
    }

    model.save = async (req, res) => {
        try {
            await db.query('BEGIN');
            const queryText = "INSERT INTO public.categorias(descricao, usuario_id) VALUES($1, $2) RETURNING *";
            const responseQuery = await db.query(queryText, [req.description, req.user_id]);
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
            const queryText = "UPDATE public.categorias SET descricao = $1 WHERE id = $2 RETURNING *";
            const responseQuery = await db.query(queryText, [req.description, req.id]);
            await db.query('COMMIT');

            return responseQuery.rows[0];
        } catch (error) {
            await db.query('ROLLBACK');
            throw error;
        }
    }

    model.delete = async (req, res) => {
        try {
            await db.query('BEGIN');
            const queryText = "DELETE FROM public.categorias WHERE id = $1 RETURNING *";
            const responseQuery = await db.query(queryText, [req.id]);
            await db.query('COMMIT');

            return responseQuery.rows[0];
        } catch (error) {
            await db.query('ROLLBACK');
            throw error;
        }
    }

    return model;
}