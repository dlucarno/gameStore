import { HfInference } from "@huggingface/inference";

// Stockage de l'historique des conversations
const conversationHistory = new Map();

// Configuration HuggingFace
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

const getGameInfo = (gameTitle) => {
  const gameInfo = {
    "The Legend of Zelda: TOTK": {
      description:
        "Je suis The Legend of Zelda: Tears of the Kingdom, un jeu d'action-aventure développé par Nintendo. Je propose une vaste exploration dans le royaume d'Hyrule avec de nouvelles capacités comme la création d'objets et le voyage entre les îles célestes.",
      features: [
        "Monde ouvert",
        "Création d'objets",
        "Exploration verticale",
        "Nouvelles capacités",
        "Donjons complexes",
      ],
    },
    "Cyberpunk 2077": {
      description:
        "Je suis Cyberpunk 2077, un RPG en monde ouvert se déroulant dans Night City. Je mélange action, histoire profonde et customisation poussée dans un univers cyberpunk.",
      features: [
        "Monde ouvert futuriste",
        "Customisation du personnage",
        "Histoire non linéaire",
        "Combat immersif",
        "Hacking",
      ],
    },
    "Elden Ring": {
      description:
        "Je suis Elden Ring, un Action-RPG créé en collaboration entre FromSoftware et George R.R. Martin. Je propose un monde ouvert dark fantasy rempli de défis et de mystères.",
      features: [
        "Combat exigeant",
        "Monde ouvert",
        "Histoire cryptique",
        "Boss épiques",
        "Personnalisation poussée",
      ],
    },
  };
  return gameInfo[gameTitle];
};

export default defineEventHandler(async (event) => {
  try {
    const { message, gameId, gameTitle } = await readBody(event);
    const gameInfo = getGameInfo(gameTitle);

    console.log("Requête reçue:", { message, gameId, gameTitle }); // Debug

    // Vérifier la clé API
    if (!process.env.HUGGINGFACE_API_KEY) {
      throw new Error("Clé API HuggingFace manquante");
    }

    // Récupérer ou créer l'historique pour ce jeu
    if (!conversationHistory.has(gameId)) {
      conversationHistory.set(gameId, []);
    }
    const history = conversationHistory.get(gameId);

    // Construire un prompt plus structuré
    const context = `Tu es ${gameTitle}. ${gameInfo.description}
    
    Voici mes principales caractéristiques :
    ${gameInfo.features.join(", ")}
    
    Réponds de manière claire et cohérente à cette question : ${
      message || "Présente-toi"
    }
    
    Important: Réponds comme si tu étais le jeu qui parle directement au joueur, de manière amicale et engageante.`;

    console.log("Contexte envoyé:", context); // Debug

    const response = await hf.textGeneration({
      model: "facebook/opt-350m", // Modèle un peu plus grand
      inputs: context,
      parameters: {
        max_new_tokens: 100,
        temperature: 0.7,
        top_p: 0.9,
        do_sample: true,
        return_full_text: false,
      },
    });

    console.log("Réponse reçue:", response); // Debug

    let reply = response.generated_text.trim();

    // Si la réponse n'est pas cohérente, utiliser une réponse de secours
    if (reply.length < 10 || !reply.match(/[.!?]/)) {
      reply = message
        ? `Je suis désolé, je n'ai pas bien compris votre question. Pourriez-vous la reformuler ?`
        : gameInfo.description;
    }

    // Mettre à jour l'historique
    if (message) {
      history.push({ role: "user", content: message });
    }
    history.push({ role: "assistant", content: reply });

    return { reply };
  } catch (error) {
    console.error("Erreur complète:", error);

    // Si c'est une erreur de service, essayons avec un autre modèle de repli
    if (error.message.includes("Service Unavailable")) {
      try {
        const fallbackResponse = await hf.textGeneration({
          model: "facebook/opt-125m", // Modèle de repli encore plus léger
          inputs: `${gameTitle}: ${message || "Présente-toi"}`,
          parameters: {
            max_new_tokens: 50,
            temperature: 0.7,
          },
        });
        return { reply: fallbackResponse.generated_text.trim() };
      } catch (fallbackError) {
        console.error("Erreur avec le modèle de repli:", fallbackError);
        return {
          reply:
            "Je suis désolé, je suis temporairement indisponible. Veuillez réessayer dans quelques instants.",
        };
      }
    }

    return {
      reply:
        "Je suis désolé, je rencontre des difficultés techniques. Veuillez réessayer.",
    };
  }
});
