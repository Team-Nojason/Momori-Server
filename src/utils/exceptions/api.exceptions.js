class ApiExceptions extends Error {
    constructor (message, status = 400, state = 0) {
        super(message);
        this.message = message;
        this.name = "Api Error";
        this.state = state;
        this.status = status;
    }
}

module.exports = {
    ApiExceptions
};
