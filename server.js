const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

// Stockage de l'historique des conversations
const conversationHistory = new Map();

app.post("/chat", async (req, res) => {
  const { message, gameId, gameTitle } = req.body;

  // Récupérer ou créer l'historique pour ce jeu
  if (!conversationHistory.has(gameId)) {
    conversationHistory.set(gameId, []);
  }
  const history = conversationHistory.get(gameId);

  // Construire le contexte avec l'historique
  const systemPrompt = `Tu es un assistant spécialisé qui représente le jeu "${gameTitle}". 
    Tu as une connaissance approfondie de ce jeu, de son développement, de ses fonctionnalités et de sa création.
    Réponds de manière engageante et personnelle, comme si tu étais le jeu lui-même qui parle aux joueurs.`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...history.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    { role: "user", content: message },
  ];

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.7,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer VOTRE_CLE_API_OPENAI`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;

    // Mettre à jour l'historique
    history.push({ role: "user", content: message });
    history.push({ role: "assistant", content: reply });

    res.json({ reply });
  } catch (error) {
    console.error("Erreur OpenAI:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la génération de la réponse" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
