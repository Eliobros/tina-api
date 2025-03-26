const axios = require("axios");
const { DIFY_API_KEY, API_BASE_URL } = require("./config");
const { validateUserApiKey } = require("./validator");

function tina(userApiKey) {
    if (!validateUserApiKey(userApiKey)) {
        throw new Error("API Key inválida. Gere uma chave válida para usar a Tina API.");
    }

    return {
        async ask(query, user, conversation_id = null, message_id = null, files = null) {
            if (!query) throw new Error("O parâmetro 'query' é obrigatório.");

            try {
                const response = await axios.post(
                    `${API_BASE_URL}/chat-messages`,
                    {
                        query,
                        inputs: {},
                        response_mode: "streaming",
                        user,
                        conversation_id,
                        message_id,
                        files,
                        auto_generate_name: true
                    },
                    {
                        headers: {
                            "Authorization": `Bearer ${DIFY_API_KEY}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                return response.data.answer; // Retorna apenas a resposta da IA
            } catch (error) {
                console.error("Erro ao acessar a API da Dify:", error.response ? error.response.data : error.message);
                throw new Error("Erro ao acessar a API da Dify.");
            }
        }
    };
}

module.exports = tina;
