/**
 * 사전 지식 : 환경변수
 */
// dotenv 로딩
// 이걸 적어야 이 파일에서 환경 변수를 불러올 수 있음
require('dotenv').config()
 
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