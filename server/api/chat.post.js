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
      title: "Jeu 8 Américains",
      description:
        "Recréation du jeu de cartes '8 Américains' en utilisant Lua et LÖVE 2D.",
      link: "https://votre-jeu-8-americains.com", // Remplacez par le lien réel
    },
    {
      title: "Jeu Pong",
      description:
        "Reprise du classique Pong en 2D, incluant un mode solo et multijoueur.",
      link: "https://votre-jeu-pong.com", // Remplacez par le lien réel
    },
    {
      title: "Jeu Tetris",
      description:
        "Recréation de Tetris avec des graphismes simples et un gameplay fluide.",
      link: "https://votre-jeu-tetris.com", // Remplacez par le lien réel
    },
    {
      title: "Jeu Snake",
      description:
        "Recréation du classique Snake, où le joueur contrôle un serpent.",
      link: "https://votre-jeu-snake.com", // Remplacez par le lien réel
    },
  ],
  anecdotes: [
    "Lors de la création de mon clone de Pong, j'ai appris à gérer les collisions.",
    "En développant le clone de Tetris, j'ai découvert l'importance de la mécanique de jeu.",
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
    "Jeu 8 Américains": {
      description:
        "Je suis un clone du jeu de cartes '8 Américains', un jeu amusant pour 2 à 7 joueurs.",
      features: ["Jeu de cartes", "Règles classiques", "Interface intuitive"],
      link: personalInfo.projects[0].link,
    },
    "Jeu Pong": {
      description:
        "Je suis un clone de Pong, un jeu d'arcade classique où les joueurs contrôlent des raquettes.",
      features: ["Mode solo", "Mode multijoueur", "Gameplay classique"],
      link: personalInfo.projects[1].link,
    },
    "Jeu Tetris": {
      description:
        "Je suis Tetris, un jeu de puzzle où les joueurs doivent empiler des blocs.",
      features: ["Graphismes simples", "Gameplay fluide", "Système de score"],
      link: personalInfo.projects[2].link,
    },
    "Jeu Snake": {
      description:
        "Je suis Snake, un jeu où le joueur contrôle un serpent qui grandit en mangeant des pommes.",
      features: ["Contrôle du serpent", "Éviter les murs", "Gameplay addictif"],
      link: personalInfo.projects[3].link,
    },
  };
  return gameInfo[gameTitle];
};

const getLinksResponse = (message) => {
  if (message.toLowerCase().includes("lien github")) {
    return "Voici mon GitHub : [Votre GitHub](https://github.com/dlucarno)";
  } else if (message.toLowerCase().includes("lien portfolio")) {
    return "Voici mon portfolio : [Votre Portfolio](https://www.dlucarno.com)";
  } else if (message.toLowerCase().includes("lien jeu")) {
    return "Voici le lien vers le jeu : [Votre Jeu](https://votre-jeu.com)";
  }
  return null;
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

    // Vérifiez si le message contient une demande de lien
    const linkResponse = getLinksResponse(message);
    if (linkResponse) {
      return { reply: linkResponse };
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
      .map((p) => `${p.title}: ${p.description} - [Voir le projet](${p.link})`)
      .join("\n")}
- Anecdotes : ${personalInfo.anecdotes.join(" ")} 

Important: Lorsque tu réponds, parle comme si tu étais le jeu ${gameTitle}. Réponds en fonction de l'univers et des mécaniques de ce jeu. Sois descriptif et engageant dans tes réponses, et n'hésite pas à partager des anecdotes ou des conseils sur le développement de jeux. Encourage les joueurs à poser des questions spécifiques sur mes projets ou mes expériences.

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
