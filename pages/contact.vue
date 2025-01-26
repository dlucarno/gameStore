<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-white mb-6">Contact</h1>
    <div class="max-w-2xl mx-auto bg-gray-800/50 rounded-lg p-6">
      <form class="space-y-4">
        <div>
          <label class="block text-white mb-2">Nom</label>
          <input
            type="text"
            class="w-full bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label class="block text-white mb-2">Email</label>
          <input
            type="email"
            class="w-full bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label class="block text-white mb-2">Message</label>
          <textarea
            class="w-full bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="4"
          ></textarea>
        </div>
        <button
          class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded transition-all duration-300"
        >
          Envoyer
        </button>
      </form>
    </div>
  </div>
</template>
