const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const app = express();
app.use(express.json());
app.use(express.static("public"));
const path = require("path");

// Função para gerar uma API Key aleatória
function generateRandomApiKey() {
    return crypto.randomBytes(16).toString("hex");
}

app.get('/api/generate-api-key', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'generate-api-key.html'));
})

// Endpoint para gerar a API Key
app.post("/generate-api-key", (req, res) => {
    const { apiName } = req.body;
    if (!apiName) {
        return res.status(400).json({ error: "Nome da API Key é obrigatório." });
    }

    const apiKey = generateRandomApiKey();
    const timestamp = new Date().toISOString();

    // Carregar chaves de API existentes
    fs.readFile("apiKeys.json", "utf8", (err, data) => {
        let apiKeys = [];
        if (!err && data) {
            apiKeys = JSON.parse(data);
        }

        // Adicionar a nova chave
        apiKeys.push({ apiName, apiKey, timestamp });

        // Salvar no arquivo
        fs.writeFile("apiKeys.json", JSON.stringify(apiKeys, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: "Erro ao salvar a chave da API." });
            }
            res.json({ apiKey });
        });
    });
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
