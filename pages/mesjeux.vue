<template>
  <div
    class="min-h-screen flex transition-all duration-500"
    :class="{ 'pr-[50vw]': selectedGame }"
  >
    <!-- Liste des jeux -->
    <div class="container mx-auto px-4 py-8 transition-all duration-500">
      <h1 class="text-3xl font-bold text-white mb-6">Mes Jeux</h1>
      <div
        class="grid gap-6"
        :class="[
          selectedGame
            ? 'grid-cols-1'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        ]"
      >
        <div
          v-for="game in games"
          :key="game.id"
          class="bg-gray-800/50 rounded-lg overflow-hidden hover:bg-gray-700/50 transition-all duration-300 transform group"
          :class="{
            'border-2 border-purple-500': selectedGame?.id === game.id,
          }"
        >
          <img
            :src="game.image"
            :alt="game.title"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h2 class="text-xl font-semibold text-white mb-2">
              {{ game.title }}
            </h2>
            <p class="text-gray-300 mb-4">{{ game.description }}</p>
            <div class="space-y-1 mb-4">
              <p
                v-for="(detail, index) in game.details"
                :key="index"
                class="text-gray-400 text-sm"
              >
                {{ detail }}
              </p>
            </div>
            <button
              @click="selectGame(game)"
              class="bg-purple-600/80 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition-all duration-300 w-full group-hover:scale-105"
            >
              En savoir plus
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat panel -->
    <div
      v-if="selectedGame"
      class="fixed top-0 right-0 w-[50vw] h-full bg-gray-900/95 transform transition-all duration-500"
      :class="selectedGame ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="h-full flex flex-col">
        <!-- En-tête du chat -->
        <div class="p-4 border-b border-purple-500/30">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-bold text-white">
              {{ selectedGame?.title }}
            </h3>
            <button @click="closeChat" class="text-gray-400 hover:text-white">
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
        <div class="flex-1 overflow-y-auto p-4" ref="chatContainer">
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="mb-3 p-2 rounded animate-fade-in"
            :class="
              message.startsWith('Vous:')
                ? 'bg-purple-600/20 text-white'
                : 'bg-gray-800/50 text-gray-200'
            "
          >
            {{ message }}
          </div>

          <!-- Indicateur de chargement -->
          <div
            v-if="isLoading"
            class="flex items-center space-x-2 p-2 bg-gray-800/50 rounded animate-pulse"
          >
            <div
              class="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
            ></div>
            <div
              class="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
              style="animation-delay: 0.2s"
            ></div>
            <div
              class="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
              style="animation-delay: 0.4s"
            ></div>
          </div>
        </div>

        <!-- Input du chat -->
        <div class="p-4 border-t border-purple-500/30">
          <div class="flex gap-2">
            <input
              v-model="userInput"
              @keyup.enter="sendMessage"
              type="text"
              placeholder="Posez une question sur le jeu..."
              class="flex-1 bg-gray-800/80 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-gray-400"
              :disabled="isLoading"
            />
            <button
              @click="sendMessage"
              class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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

const games = [
  {
    id: 1,
    title: "The Legend of Zelda: TOTK",
    description: "Une aventure épique dans un monde ouvert fantastique.",
    image:
      "https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/2x1_NSwitch_TheLegendOfZeldaTearsOfTheKingdom_Gamepage.jpg",
    details: [
      "🎮 Genre: Action-Aventure",
      "🌍 Monde ouvert",
      "⚔️ Combat dynamique",
      "🏰 Donjons complexes",
      "🎨 Direction artistique unique",
    ],
  },
  {
    id: 2,
    title: "Cyberpunk 2077",
    description: "Un RPG futuriste dans une mégalopole dystopique.",
    image:
      "https://cdn1.epicgames.com/offer/77f2b98e2cef40c8a7437518bf420e47/EGS_Cyberpunk2077_CDPROJEKTRED_S1_03_2560x1440-359b77d6529079a87e6100b49cc1417c",
    details: [
      "🎮 Genre: RPG",
      "🌆 Night City",
      "🤖 Implants cybernétiques",
      "🔫 Combat immersif",
      "📱 Hacking avancé",
    ],
  },
  {
    id: 3,
    title: "Elden Ring",
    description: "Un action-RPG dans un univers dark fantasy.",
    image:
      "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png",
    details: [
      "🎮 Genre: Action-RPG",
      "🗺️ Entre-Terre",
      "⚔️ Combat exigeant",
      "🐎 Monde ouvert à cheval",
      "🏰 Châteaux légendaires",
    ],
  },
];

const selectedGame = ref(null);
const messages = ref([]);
const userInput = ref("");
const chatContainer = ref(null);
const isLoading = ref(false);

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
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Smooth scrollbar for chat */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(139, 92, 246, 0.5) rgba(17, 24, 39, 0.5);
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(17, 24, 39, 0.5);
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(139, 92, 246, 0.5);
  border-radius: 3px;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-25%);
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
