module.exports = app => {
    const responseApi = {};
    const res = {};

    responseApi.success = (message, req) => {
        res.statusCode = 200;
        res.message = message;
        res.data = req;

        return res;
    }

    responseApi.error = () => {
        res.statusCode = 500;
        res.message = "Ocorreu um problema!";

        return res;
    }

    return responseApi;
}