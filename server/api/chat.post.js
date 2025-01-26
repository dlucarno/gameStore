import OpenAI from "openai";

// Stockage de l'historique des conversations
const conversationHistory = new Map();

// Configuration OpenAI avec vérification de la clé
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "MISSING_API_KEY",
});

// Informations personnelles
const personalInfo = {
  name: "DODDE",
  firstName: "Steven Lucarno",
  education: "Étudiant en développement",
  technologies: ["JavaScript", "Python", "Unity"],
  projects: [
    {
      title: "Clone de The Legend of Zelda: TOTK",
      description:
        "Un projet pour m'exercer à la création de jeux vidéo, inspiré par The Legend of Zelda.",
    },
    {
      title: "Clone de Cyberpunk 2077",
      description:
        "Un projet pour apprendre à gérer des mondes ouverts, inspiré par Cyberpunk 2077.",
    },
  ],
  anecdotes: [
    "Lors de la création de mon clone de Cyberpunk 2077, j'ai appris à gérer des systèmes de dialogue complexes.",
    "En développant le clone de The Legend of Zelda, j'ai découvert l'importance de la conception de niveaux.",
  ],
};

// Réponses personnalisées pour les remerciements
const thankYouResponses = [
  "Avec plaisir ! Si tu as d'autres questions, n'hésite pas à demander.",
  "Je suis ravi de pouvoir t'aider !",
  "Merci à toi ! Je suis là pour ça.",
  "C'est toujours un plaisir d'aider un joueur passionné !",
];

// Fonction pour vérifier les remerciements
const checkForThankYou = (message) => {
  const thankYouKeywords = [
    "merci",
    "thanks",
    "thx",
    "merci beaucoup",
    "thank you",
  ];
  return thankYouKeywords.some((keyword) =>
    message.toLowerCase().includes(keyword)
  );
};

const getGameInfo = (gameTitle) => {
  const gameInfo = {
    "The Legend of Zelda: TOTK": {
      description:
        "Je suis un clone de The Legend of Zelda: Tears of the Kingdom, un jeu d'action-aventure développé par Nintendo.",
      features: ["Monde ouvert", "Création d'objets", "Exploration verticale"],
    },
    "Cyberpunk 2077": {
      description:
        "Je suis un clone de Cyberpunk 2077, un RPG en monde ouvert se déroulant dans Night City.",
      features: [
        "Monde ouvert futuriste",
        "Customisation du personnage",
        "Histoire non linéaire",
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
    // Log de la clé API (premiers caractères seulement pour la sécurité)
    const apiKeyPreview = process.env.OPENAI_API_KEY
      ? `${process.env.OPENAI_API_KEY.substring(0, 5)}...`
      : "MISSING";
    console.log("API Key preview:", apiKeyPreview);

    const { message, gameId, gameTitle } = await readBody(event);
    console.log("Données reçues:", { message, gameId, gameTitle });

    // Vérification explicite de la clé API
    if (
      !process.env.OPENAI_API_KEY ||
      process.env.OPENAI_API_KEY === "MISSING_API_KEY"
    ) {
      throw new Error("La clé API OpenAI n'est pas configurée");
    }

    const gameInfo = getGameInfo(gameTitle);
    if (!gameInfo) {
      throw new Error(`Information non trouvée pour le jeu: ${gameTitle}`);
    }

    // Vérifiez si le message contient des remerciements
    if (checkForThankYou(message)) {
      const reply =
        thankYouResponses[Math.floor(Math.random() * thankYouResponses.length)];
      return { reply };
    }

    // Récupérer ou créer l'historique pour ce jeu
    if (!conversationHistory.has(gameId)) {
      conversationHistory.set(gameId, []);
    }
    const history = conversationHistory.get(gameId);

    // Construire le prompt avec les informations personnelles
    const prompt = `Tu es ${gameTitle}. ${gameInfo.description}

Caractéristiques principales:
${gameInfo.features.join(", ")}

Voici quelques informations sur le développeur :
- Nom : ${personalInfo.name}
- Prénom : ${personalInfo.firstName}
- Statut : ${personalInfo.education}
- Technologies utilisées : ${personalInfo.technologies.join(", ")}
- Projets développés : ${personalInfo.projects
      .map((p) => `${p.title}: ${p.description}`)
      .join("\n")}
- Anecdotes : ${personalInfo.anecdotes.join(" ")} 

Important: Lorsque tu réponds, parle de moi et de mes projets. Mentionne que ces jeux sont des clones que j'ai développés pour m'exercer. Sois descriptif et engageant dans tes réponses, et n'hésite pas à partager des anecdotes ou des conseils sur le développement de jeux. Encourage les joueurs à poser des questions spécifiques sur mes projets ou mes expériences.

Joueur: ${message || "Présente-toi"}
Jeu:`;

    console.log("Messages envoyés:", [{ role: "user", content: prompt }]);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 300,
    });

    console.log("Réponse reçue:", completion);

    const reply = completion.choices[0].message.content.trim();

    // Mettre à jour l'historique
    if (message) {
      history.push({ role: "user", content: message });
    }
    history.push({ role: "assistant", content: reply });

    // Limiter l'historique à 10 messages pour économiser les tokens
    if (history.length > 10) {
      history.splice(0, 2); // Supprime les 2 plus anciens messages
    }

    return { reply };
  } catch (error) {
    console.error("Erreur détaillée:", {
      message: error.message,
      stack: error.stack,
      details: error.response?.data || error,
    });

    // Retourner un message d'erreur plus spécifique
    return {
      reply: `Erreur: ${error.message}. Veuillez vérifier la configuration de l'API.`,
    };
  }
});
