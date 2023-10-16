require('dotenv').config();

module.exports.Config = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 8080,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: 3306,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_DATABASE: process.env.DB_DATABASE,
    JWT_SECRET: process.env.JWT_SECRET
};