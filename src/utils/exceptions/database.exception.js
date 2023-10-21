class DatabaseException extends Error {
    constructor (message, status = 500, state = 0) {
        super(message);
        this.message = message;
        this.name = "Database Error";
        this.state = state;
        this.status = status;
    }
}

module.exports = {
    DatabaseException,
};