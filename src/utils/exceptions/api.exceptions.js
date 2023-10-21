class ApiExceptions extends Error {
    constructor (message, status = 400, state) {
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
