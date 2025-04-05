<template>
  <div
    class="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900"
  >
    <!-- Particules d'arrière-plan -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="particles-container"></div>
    </div>

    <!-- Hero Section avec effet parallaxe -->
    <div class="container mx-auto px-4 py-16 relative z-10">
      <div
        class="text-center mb-16 transform transition-all duration-700 hover:scale-[1.02]"
      >
        <h1 class="text-6xl font-bold mb-6 animate-title">
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500"
          >
            L-Game Store
          </span>
        </h1>
        <p
          class="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in"
        >
          Bienvenue sur mon portfolio de jeux vidéo, où je présente mes
          reproductions de jeux développées pour perfectionner mes compétences.
        </p>
      </div>

      <!-- Featured Cards avec effet de hover amélioré -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
        <NuxtLink
          v-for="(card, index) in cards"
          :key="index"
          :to="card.route"
          class="group perspective"
        >
          <div
            class="card-3d-container transition-all duration-500 transform preserve-3d group-hover:rotate-y-12"
          >
            <div
              class="bg-gray-800/30 backdrop-blur-md rounded-xl p-8 border border-purple-500/20 shadow-xl hover:shadow-purple-500/10 transform transition-all duration-500 group-hover:translate-z-10"
            >
              <div class="flex items-center justify-center mb-6">
                <div class="relative">
                  <div
                    class="absolute inset-0 bg-purple-500/20 blur-xl rounded-full transform group-hover:scale-150 transition-transform duration-700"
                  ></div>
                  <component
                    :is="card.icon"
                    class="h-16 w-16 text-purple-400 relative z-10 transform transition-all duration-500 group-hover:scale-110 group-hover:text-purple-300"
                  />
                </div>
              </div>
              <h2 class="text-2xl font-bold text-white mb-4 text-center">
                {{ card.title }}
              </h2>
              <p class="text-gray-300 text-center leading-relaxed">
                {{ card.description }}
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Featured Game avec effet de glassmorphisme -->
      <div class="mt-16 relative group">
        <div
          class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl transform group-hover:scale-105 transition-transform duration-700"
        ></div>
        <div
          class="relative bg-gray-800/30 backdrop-blur-md rounded-xl p-8 border border-purple-500/20 overflow-hidden"
        >
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="flex-1 space-y-6">
              <h3
                class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
              >
                Jeu à la Une
              </h3>
              <p class="text-gray-300 text-lg leading-relaxed">
                Découvrez notre dernier jeu en vedette et plongez dans une
                nouvelle aventure extraordinaire.
              </p>
              <NuxtLink
                to="/mesjeux"
                class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl transition-all duration-300 group shadow-lg hover:shadow-purple-500/25"
              >
                Découvrir
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </NuxtLink>
            </div>
            <div class="flex-1">
              <div class="relative group">
                <div
                  class="absolute inset-0 bg-purple-500/20 blur-2xl transform group-hover:scale-110 transition-transform duration-700"
                ></div>
                <div
                  class="relative aspect-video bg-gray-900/50 rounded-xl border border-purple-500/30 overflow-hidden shadow-2xl"
                >
                  <div
                    class="absolute inset-0 flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-24 w-24 text-purple-400/50 transform group-hover:scale-110 transition-transform duration-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const cards = [
  {
    title: "Mes Jeux",
    description:
      'Mes jeux vidéo développés avec amour et passion. Pour mieux comprendre mon travail, vous pouvez aller sur la page "Mes Jeux".',
    route: "/mesjeux",
    icon: "GameControllerIcon",
  },
  {
    title: "Technologies",
    description:
      "Découvrez les technologies innovantes que nous utilisons pour créer des expériences de jeu uniques.",
    route: "/technologie",
    icon: "ChipIcon",
  },
  {
    title: "Contact",
    description:
      "Une question ? Contactez-nous pour en savoir plus sur nos projets et nos services.",
    route: "/contact",
    icon: "EnvelopeIcon",
  },
];
</script>

<style scoped>
.perspective {
  perspective: 2000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}

.rotate-y-12 {
  transform: rotateY(12deg);
}

.translate-z-10 {
  transform: translateZ(10px);
}

/* Animation du titre */
.animate-title {
  animation: slideDown 1s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animation du texte */
.animate-fade-in {
  animation: fadeIn 1s ease-out 0.5s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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

/* Effet de particules */
.particles-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    transparent 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
}

/* Responsive design */
@media (max-width: 768px) {
  .text-6xl {
    font-size: 3rem;
  }

  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
