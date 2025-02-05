<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-12">
      <h1
        class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4"
      >
        Technologies
      </h1>
      <div class="h-1 w-20 bg-purple-500 mx-auto rounded-full"></div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Frontend Technologies -->
      <div
        class="bg-gray-800/30 backdrop-blur-md rounded-xl p-6 border border-purple-500/20 transform hover:scale-105 transition-all duration-300 group"
      >
        <div class="flex items-center gap-4 mb-6">
          <div class="p-3 bg-purple-500/10 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-purple-400"
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
          <h2 class="text-2xl font-bold text-white">Frontend</h2>
        </div>
        <div class="space-y-4">
          <div class="tech-item">
            <div class="flex items-center gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg"
                alt="Vue.js"
                class="w-6 h-6"
              />
              <span class="text-lg text-gray-300">Vue.js 3</span>
            </div>
            <div class="mt-2 bg-gray-700/30 rounded-full h-2">
              <div
                class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-[90%]"
              ></div>
            </div>
          </div>

          <div class="tech-item">
            <div class="flex items-center gap-3">
              <img
                src="https://nuxt.com/assets/design-kit/logo/icon-green.png"
                alt="Nuxt"
                class="w-6 h-6"
              />
              <span class="text-lg text-gray-300">Nuxt 3</span>
            </div>
            <div class="mt-2 bg-gray-700/30 rounded-full h-2">
              <div
                class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-[85%]"
              ></div>
            </div>
          </div>

          <div class="tech-item">
            <div class="flex items-center gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
                alt="Tailwind"
                class="w-6 h-6"
              />
              <span class="text-lg text-gray-300">Tailwind CSS</span>
            </div>
            <div class="mt-2 bg-gray-700/30 rounded-full h-2">
              <div
                class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-[95%]"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Game Development -->
      <div
        class="bg-gray-800/30 backdrop-blur-md rounded-xl p-6 border border-purple-500/20 transform hover:scale-105 transition-all duration-300 group"
      >
        <div class="flex items-center gap-4 mb-6">
          <div class="p-3 bg-purple-500/10 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-white">Game Dev</h2>
        </div>
        <div class="space-y-4">
          <div class="tech-item">
            <div class="flex items-center gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Unity_2021.svg"
                alt="Unity"
                class="w-6 h-6"
              />
              <span class="text-lg text-gray-300">Unity</span>
            </div>
            <div class="mt-2 bg-gray-700/30 rounded-full h-2">
              <div
                class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-[80%]"
              ></div>
            </div>
          </div>

          <div class="tech-item">
            <div class="flex items-center gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Lua-Logo.svg"
                alt="Lua"
                class="w-6 h-6"
              />
              <span class="text-lg text-gray-300">Lua & LÖVE2D</span>
            </div>
            <div class="mt-2 bg-gray-700/30 rounded-full h-2">
              <div
                class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-[75%]"
              ></div>
            </div>
          </div>

          <div class="tech-item">
            <div class="flex items-center gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg"
                alt="Blender"
                class="w-6 h-6"
              />
              <span class="text-lg text-gray-300">Blender</span>
            </div>
            <div class="mt-2 bg-gray-700/30 rounded-full h-2">
              <div
                class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-[70%]"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- AI & Innovation -->
      <div
        class="bg-gray-800/30 backdrop-blur-md rounded-xl p-6 border border-purple-500/20 transform hover:scale-105 transition-all duration-300 group"
      >
        <div class="flex items-center gap-4 mb-6">
          <div class="p-3 bg-purple-500/10 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-white">AI & Innovation</h2>
        </div>
        <div class="space-y-4">
          <div class="tech-item">
            <div class="flex items-center gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg"
                alt="OpenAI"
                class="w-6 h-6"
              />
              <span class="text-lg text-gray-300">OpenAI Integration</span>
            </div>
            <div class="mt-2 bg-gray-700/30 rounded-full h-2">
              <div
                class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-[85%]"
              ></div>
            </div>
          </div>

          <div class="tech-item">
            <div class="flex items-center gap-3">
              <img
                src="https://www.svgrepo.com/show/375531/api.svg"
                alt="API"
                class="w-6 h-6"
              />
              <span class="text-lg text-gray-300">API Development</span>
            </div>
            <div class="mt-2 bg-gray-700/30 rounded-full h-2">
              <div
                class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-[80%]"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tech-item {
  @apply p-4 bg-gray-700/20 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300;
}

.tech-item:hover .bg-gradient-to-r {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

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
