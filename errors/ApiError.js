

class ApiError extends Error {

    constructor(status=500, msg='smt wrong with server') {
        super();
        this.status = status;
        this.msg = msg;
    }

    static notFound(msg) {
        return new ApiError(404, msg)
    }

    static conflict(msg) {
        return new ApiError(409, msg)
    }

    static forbidden(msg) {
        return new ApiError(403, msg)
    }

    static serverError(msg) {
        return new ApiError(500, msg)
    }
}

module.exports = ApiError