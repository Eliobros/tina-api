const fs = require('fs');
const { API_KEYS_FILE } = require('./config');

function loadApiKeys() {
    if (!fs.existsSync(API_KEYS_FILE)) {
        fs.writeFileSync(API_KEYS_FILE, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(API_KEYS_FILE));
}

function validateUserApiKey(apiKey) {
    const apiKeys = loadApiKeys();
    return apiKeys.includes(apiKey);
}

function generateApiKey() {
    const newKey = Math.random().toString(36).substring(2, 15);
    const apiKeys = loadApiKeys();
    apiKeys.push(newKey);
    fs.writeFileSync(API_KEYS_FILE, JSON.stringify(apiKeys, null, 2));
    return newKey;
}

module.exports = {
    validateUserApiKey,
    generateApiKey
};