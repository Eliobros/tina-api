const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const DIFY_API_KEY = process.env.DIFY_API_KEY;
const API_BASE_URL = process.env.API_BASE_URL;

module.exports = {
    DIFY_API_KEY: DIFY_API_KEY,
    API_BASE_URL: API_BASE_URL,
    API_KEYS_FILE: path.join(__dirname, "apiKeys.json")
}