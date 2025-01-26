<template>
  <div
    v-if="isVisible"
    class="fixed bottom-16 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-purple-500/30 z-20 shadow-lg shadow-purple-500/10"
  >
    <div class="container mx-auto px-4 py-4">
      <div class="flex flex-col">
        <div class="overflow-y-auto max-h-64 mb-4">
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="mb-2 p-2 rounded"
            :class="
              message.startsWith('Vous:')
                ? 'bg-purple-600/20 text-white'
                : 'bg-gray-800/50 text-gray-200'
            "
          >
            {{ message }}
          </div>
        </div>
        <div class="flex gap-4 items-center">
          <input
            v-model="userInput"
            @keyup.enter="sendMessage"
            type="text"
            placeholder="Posez une question sur le jeu..."
            class="flex-1 bg-gray-800/80 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-gray-400"
          />
          <button
            @click="sendMessage"
            class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps(["isVisible", "gameTitle"]);
const emit = defineEmits(["close"]);

const messages = ref([]);
const userInput = ref("");

const sendMessage = () => {
  if (userInput.value.trim()) {
    messages.value.push(`Vous: ${userInput.value}`);
    setTimeout(() => {
      messages.value.push(
        `IA: Je peux vous parler de ${props.gameTitle}. Que souhaitez-vous savoir ?`
      );
    }, 1000);
    userInput.value = "";
  }
};

watch(
  () => props.gameTitle,
  (newTitle) => {
    if (newTitle) {
      messages.value = [];
      const gameInfo = [
        `Bienvenue ! Vous consultez les informations sur ${newTitle}.`,
        `🎮 Titre: ${newTitle}`,
        `📝 Description: Une aventure épique qui vous transportera dans un monde fantastique.`,
        `🏢 Développeur: Studio Gaming Excellence`,
        `📅 Date de sortie: 2024`,
        `💫 Note moyenne: 9.5/10`,
        `\nVous pouvez me poser des questions sur ce jeu !`,
      ];
      displayGameInfo(gameInfo);
    }
  },
  { immediate: true }
);

const displayGameInfo = (info) => {
  let index = 0;
  const interval = setInterval(() => {
    if (index < info.length) {
      messages.value.push(info[index]);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 1000);
};
</script>

<style scoped>
/* Les styles seront gérés par Tailwind */
</style>
