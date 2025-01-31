<template>
  <div class="min-h-screen flex flex-col">
    <!-- Hero Section -->
    <div class="container mx-auto px-4 py-16">
      <div class="text-center mb-16">
        <h1
          class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-6"
        >
          Bienvenue sur L-Game Store
        </h1>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          Découvrez notre sélection de jeux vidéo et plongez dans des univers
          extraordinaires.
        </p>
      </div>

      <!-- Featured Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <!-- Card 1 -->
        <NuxtLink to="/mesjeux" class="group">
          <div
            class="bg-gray-800/50 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:bg-gray-700/50 border border-transparent hover:border-purple-500/50"
          >
            <div class="flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-white mb-4 text-center">
              Mes Jeux
            </h2>
            <p class="text-gray-300 text-center">
              Mes jeux vidéo développés avec amour et passion. Pour mieux
              comprendre mon travail, vous pouvez aller sur la page "Mes Jeux".
            </p>
          </div>
        </NuxtLink>

        <!-- Card 2 -->
        <NuxtLink to="/technologie" class="group">
          <div
            class="bg-gray-800/50 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:bg-gray-700/50 border border-transparent hover:border-purple-500/50"
          >
            <div class="flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-white mb-4 text-center">
              Technologies
            </h2>
            <p class="text-gray-300 text-center">
              Découvrez les technologies innovantes que nous utilisons.
            </p>
          </div>
        </NuxtLink>

        <!-- Card 3 -->
        <NuxtLink to="/contact" class="group">
          <div
            class="bg-gray-800/50 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:bg-gray-700/50 border border-transparent hover:border-purple-500/50"
          >
            <div class="flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-white mb-4 text-center">
              Contact
            </h2>
            <p class="text-gray-300 text-center">
              Une question ? Contactez-nous pour en savoir plus.
            </p>
          </div>
        </NuxtLink>
      </div>

      <!-- Featured Game -->
      <div
        class="mt-16 bg-gray-800/30 rounded-lg p-4 md:p-8 border border-purple-500/20 relative z-10"
      >
        <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div class="flex-1">
            <h3 class="text-3xl font-bold text-white mb-4">Jeu à la Une</h3>
            <p class="text-gray-300 mb-6">
              Découvrez notre dernier jeu en vedette et plongez dans une
              nouvelle aventure extraordinaire.
            </p>
            <NuxtLink
              to="/mesjeux"
              class="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 group"
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
          <div class="flex-1 flex justify-center">
            <div
              class="w-full max-w-md aspect-video bg-purple-900/20 rounded-lg border border-purple-500/30 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-24 w-24 text-purple-500/50"
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
</template>

<style scoped>
/* Animation de gradient */
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

.video-background {
  position: absolute; /* Positionnement absolu */
  top: 0; /* Alignement en haut */
  left: 0; /* Alignement à gauche */
  width: 100%; /* Prend toute la largeur */
  height: 100%; /* Prend toute la hauteur */
  object-fit: cover; /* Couvre l'espace sans déformer */
  z-index: -1; /* En arrière-plan */
}
</style>
