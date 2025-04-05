<template>
  <div
    class="min-h-screen overflow-x-hidden flex transition-all duration-500 bg-gradient-to-br from-gray-900 to-purple-900"
    :class="{ 'lg:pr-[50vw]': selectedGame }"
  >
    <!-- Liste des jeux avec animation d'entrée -->
    <div
      class="container mx-auto px-4 py-4 md:py-8 transition-all duration-500 flex flex-col h-full relative z-10"
    >
      <h1
        class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4 md:mb-8 relative flex-shrink-0"
      >
        Mes Jeux
        <span
          class="block h-1 w-20 bg-gradient-to-r from-purple-400 to-pink-500 mt-2 rounded-full"
        ></span>
      </h1>

      <!-- Grille de jeux avec animations -->
      <div class="games-container overflow-y-auto flex-1">
        <div
          class="grid gap-4 md:gap-6 pb-4 md:pb-8"
          :class="[
            selectedGame
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
          ]"
        >
          <div
            v-for="(game, index) in games"
            :key="game.title"
            class="game-card bg-gray-800/30 backdrop-blur-md rounded-xl overflow-hidden hover:bg-gray-700/40 transition-all duration-300 transform hover:scale-[1.02] border border-purple-500/20 shadow-lg hover:shadow-purple-500/20"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="p-6">
              <h2
                class="text-2xl font-semibold text-white mb-3 flex items-center gap-2"
              >
                <span class="text-purple-400">🎮</span>
                {{ game.title }}
              </h2>
              <p class="text-gray-300 mb-4 leading-relaxed">
                {{ game.description }}
              </p>
              <div class="space-y-2 mb-6">
                <p
                  v-for="(detail, index) in game.details"
                  :key="index"
                  class="text-gray-400 text-sm flex items-center gap-2 hover:text-purple-400 transition-colors"
                >
                  <span class="text-purple-500">{{
                    detail.split(" ")[0]
                  }}</span>
                  {{ detail.split(" ").slice(1).join(" ") }}
                </p>
              </div>
              <button
                @click="selectGame(game)"
                class="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg transition-all duration-300 w-full group-hover:scale-105 font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50"
              >
                En savoir plus
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Panel de chat amélioré -->
    <div
      v-if="selectedGame"
      class="fixed inset-0 lg:inset-auto lg:top-0 lg:right-0 w-full lg:w-[50vw] h-screen bg-gray-900/95 backdrop-blur-xl transform transition-all duration-500 border-l border-purple-500/20 z-20"
      :class="[
        selectedGame ? 'translate-x-0' : 'translate-x-full',
        'animate-slide-in',
      ]"
    >
      <div class="h-full flex flex-col">
        <!-- En-tête du chat -->
        <div
          class="p-4 md:p-6 border-b border-purple-500/30 backdrop-blur-md bg-gray-900/50"
        >
          <div class="flex justify-between items-center">
            <h3
              class="text-xl md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3"
            >
              <span class="text-purple-400 text-2xl md:text-3xl">🎮</span>
              {{ selectedGame?.title }}
            </h3>
            <button
              @click="closeChat"
              class="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-purple-500/20 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Corps du chat -->
        <div class="flex-1 overflow-y-auto p-4 md:p-6" ref="chatContainer">
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="mb-4 p-3 md:p-4 rounded-lg animate-fade-in max-w-[85%] text-sm md:text-base"
            :class="[
              message.startsWith('Vous:')
                ? 'bg-purple-600/20 text-white ml-auto'
                : 'bg-gray-800/50 text-gray-200',
            ]"
          >
            {{ message }}
          </div>
        </div>

        <!-- Input du chat -->
        <div
          class="p-4 md:p-6 border-t border-purple-500/30 backdrop-blur-md bg-gray-900/50"
        >
          <div class="flex gap-2 md:gap-3">
            <input
              v-model="userInput"
              @keyup.enter="sendMessage"
              type="text"
              placeholder="Posez une question sur le jeu..."
              class="flex-1 bg-gray-800/80 text-white rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-gray-400 border border-purple-500/20"
              :disabled="isLoading"
            />
            <button
              @click="sendMessage"
              class="bg-purple-600 hover:bg-purple-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/30"
              :disabled="isLoading"
            >
              <svg
                v-if="!isLoading"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                />
              </svg>
              <svg
                v-else
                class="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const selectedGame = ref(null);
const messages = ref([]);
const userInput = ref("");
const chatContainer = ref(null);
const isLoading = ref(false);

const games = [
  {
    title: "Jeu 8 Américains",
    description:
      'Recréation du jeu de cartes "8 Américains" en utilisant Lua et LÖVE 2D. Permet de 2 à 7 joueurs, avec une interface intuitive et un système de gestion des tours.',
    details: [
      "🎮 Genre: Jeu de cartes",
      "🃏 Règles classiques",
      "🖥️ Interface utilisateur intuitive",
    ],
  },
  {
    title: "Jeu Pong",
    description:
      "Reprise du classique Pong en 2D. Inclut un mode solo avec IA ajustable et un mode multijoueur, tout en respectant le gameplay original.",
    details: ["🎮 Genre: Arcade", "🤖 IA ajustable", "👥 Mode multijoueur"],
  },
  {
    title: "Jeu Tetris",
    description:
      "Recréation de Tetris avec des graphismes simples et colorés, un gameplay fluide, un système de score et une difficulté progressive.",
    details: [
      "🎮 Genre: Puzzle",
      "📈 Système de score",
      "🔼 Difficulté progressive",
    ],
  },
  {
    title: "Jeu Snake",
    description:
      "Recréation du classique Snake, où le joueur contrôle un serpent qui grandit en mangeant des pommes tout en évitant de se heurter aux murs ou à lui-même.",
    details: ["🎮 Genre: Arcade", "🍏 Manger des pommes", "🚧 Éviter les murs"],
  },
];

const selectGame = (game) => {
  selectedGame.value = game;
  messages.value = [];
  displayGameInfo(game);
};

const closeChat = () => {
  selectedGame.value = null;
  messages.value = [];
};

const displayGameInfo = (game) => {
  const gameInfo = [
    `Bonjour ! Je suis ${game.title} !`,
    "Je peux vous parler de mon développement, mes fonctionnalités,",
    "les plateformes sur lesquelles je suis disponible, et plus encore.",
    "\nQue souhaitez-vous savoir ?",
  ];

  let index = 0;
  const interval = setInterval(() => {
    if (index < gameInfo.length) {
      messages.value.push(gameInfo[index]);
      index++;
      scrollToBottom();
    } else {
      clearInterval(interval);
    }
  }, 1000);
};

const sendMessage = async () => {
  if (userInput.value.trim() && !isLoading.value) {
    const userMessage = userInput.value;
    messages.value.push(`Vous: ${userMessage}`);
    userInput.value = "";
    scrollToBottom();

    isLoading.value = true;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          gameId: selectedGame.value.id,
          gameTitle: selectedGame.value.title,
        }),
      });

      const data = await response.json();
      messages.value.push(`${selectedGame.value.title}: ${data.reply}`);
    } catch (error) {
      messages.value.push("Désolé, une erreur est survenue.");
      console.error("Erreur:", error);
    } finally {
      isLoading.value = false;
      scrollToBottom();
    }
  }
};

const scrollToBottom = () => {
  setTimeout(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  }, 100);
};

// Scroll to bottom when messages change
watch(() => messages.value.length, scrollToBottom);
</script>

<style scoped>
/* Animations améliorées */
.game-card {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Effet de hover amélioré pour les cartes */
.game-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px -5px rgba(139, 92, 246, 0.3);
}

/* Animation du gradient */
.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradientFlow 15s ease infinite;
}

@keyframes gradientFlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Amélioration des transitions */
.tech-item,
button,
input {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Animation des messages du chat */
.message-enter-active {
  animation: slideInBottom 0.3s ease-out;
}

@keyframes slideInBottom {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scrollbar personnalisée plus élégante */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(139, 92, 246, 0.5) rgba(17, 24, 39, 0.3);
}

.overflow-y-auto::-webkit-scrollbar {
  width: 5px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(17, 24, 39, 0.3);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(139, 92, 246, 0.5);
  border-radius: 3px;
  transition: background-color 0.3s;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgba(139, 92, 246, 0.7);
}

/* Media queries */
@media (max-width: 768px) {
  .container {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .games-container::-webkit-scrollbar {
    width: 4px;
  }

  .text-3xl {
    font-size: 1.5rem;
  }

  .p-6 {
    padding: 1rem;
  }

  .gap-6 {
    gap: 1rem;
  }
}

@media (max-width: 640px) {
  .container {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .text-2xl {
    font-size: 1.25rem;
  }

  .p-4 {
    padding: 0.75rem;
  }
}

/* Ajustements pour les appareils en mode paysage */
@media (max-height: 600px) and (orientation: landscape) {
  .h-screen {
    height: 100%;
    min-height: 100vh;
  }

  .container {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
}

/* Optimisations pour les grands écrans */
@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}
</style>
