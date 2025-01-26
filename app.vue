<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Particules -->
    <div
      id="gaming-particles"
      class="fixed inset-0 pointer-events-none z-0"
    ></div>

    <!-- Navigation -->
    <header class="relative z-10 bg-black/70 backdrop-blur-sm">
      <div class="container mx-auto px-4 py-6">
        <h1
          class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 transition-all duration-500"
        >
          L Game Store
        </h1>
        <nav class="mt-4 space-x-6">
          <NuxtLink
            v-for="link in ['Accueil', 'Mes Jeux', 'Technologie', 'Contact']"
            :key="link"
            :to="
              link === 'Accueil'
                ? '/'
                : `/${link.toLowerCase().replace(' ', '')}`
            "
            class="text-white hover:text-purple-400 transition-colors duration-300 font-medium"
          >
            {{ link }}
          </NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Contenu principal -->
    <main class="relative z-10">
      <NuxtPage />
    </main>

    <!-- Vidéo d'arrière-plan -->
    <video
      autoplay
      loop
      muted
      playsinline
      class="fixed top-0 left-0 w-full h-full object-cover -z-10"
    >
      <source
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        type="video/mp4"
      />
    </video>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ChatBox from "./components/ChatBox.vue";

const games = [
  {
    title: "The Legend of Zelda: TOTK",
    description: "Une aventure épique dans un monde ouvert mystérieux",
    image:
      "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_auto/c_scale,w_300/v1/ncom/en_US/games/switch/t/the-legend-of-zelda-tears-of-the-kingdom-switch/hero",
  },
  {
    title: "Cyberpunk 2077",
    description: "Plongez dans le futur dystopique de Night City",
    image:
      "https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/cKZ4tKNFj9C00DKJ8JVGqRwh.png",
  },
  {
    title: "Elden Ring",
    description: "Un monde sombre de fantasy créé par FromSoftware",
    image:
      "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png",
  },
  {
    title: "God of War Ragnarök",
    description: "Continuez l'épopée nordique de Kratos et Atreus",
    image:
      "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png",
  },
  {
    title: "Final Fantasy XVI",
    description: "Une nouvelle aventure épique dans l'univers de FF",
    image:
      "https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/kh4MUIuMmHlktOHar3lVl6rY.png",
  },
  {
    title: "Horizon Forbidden West",
    description: "Explorez un monde post-apocalyptique luxuriant",
    image:
      "https://image.api.playstation.com/vulcan/ap/rnd/202107/3100/HO8vkO9pfXhwbHi5WHECQJdN.png",
  },
  {
    title: "Starfield",
    description: "Explorez l'espace dans cette épopée de Bethesda",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1716740/header.jpg",
  },
  {
    title: "Spider-Man 2",
    description: "Balancez-vous dans New York avec Peter et Miles",
    image:
      "https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/60eca3ac155cc6bbd85c6018521b6f85f6e75847456ea137.png",
  },
];

const isChatVisible = ref(false);
const selectedGame = ref("");

const openChat = (gameTitle) => {
  selectedGame.value = gameTitle;
  isChatVisible.value = true;
};

const closeChat = () => {
  isChatVisible.value = false;
};

onMounted(() => {
  const createParticles = () => {
    const container = document.getElementById("gaming-particles");
    if (!container) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      // Position aléatoire
      particle.style.left = Math.random() * 100 + "vw";
      particle.style.top = Math.random() * 100 + "vh";

      // Taille aléatoire
      const size = Math.random() * 3 + 1;
      particle.style.width = size + "px";
      particle.style.height = size + "px";

      // Animation aléatoire
      particle.style.animation = `float ${
        Math.random() * 10 + 5
      }s linear infinite`;

      container.appendChild(particle);
    }
  };

  // Attendre un peu que le DOM soit complètement chargé
  setTimeout(createParticles, 100);
});
</script>

<style>
/* Styles globaux */
body {
  @apply bg-gray-900 text-white;
  margin: 0;
  overflow-x: hidden;
}

/* Styles des particules */
.particle {
  position: fixed;
  background-color: rgba(139, 92, 246, 0.5); /* Purple-500 avec transparence */
  border-radius: 50%;
  pointer-events: none;
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(-100vh) translateX(50px);
    opacity: 0;
  }
}

/* Styles de navigation */
.router-link-active {
  @apply text-purple-500;
}

/* Animation du gradient */
.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
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
</style>
