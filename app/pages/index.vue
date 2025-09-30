<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
    <!-- Auth Section -->
    <div class="absolute top-4 right-4">
      <ClientOnly>
        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white">
          <div v-if="currentUser" class="flex items-center space-x-3">
            <div>
              <p class="text-sm font-medium">{{ currentUser.email }}</p>
              <p class="text-xs opacity-75">Usuário logado</p>
            </div>
            <button
              @click="handleLogout"
              :disabled="isLoading"
              class="bg-red-500 hover:bg-red-600 disabled:opacity-50 px-3 py-1 rounded text-sm font-medium transition-colors"
            >
              {{ isLoading ? 'Saindo...' : 'Sair' }}
            </button>
          </div>
          <div v-else>
            <p class="text-sm">Não autenticado</p>
          </div>
        </div>
        <template #fallback>
          <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white">
            <p class="text-sm">Carregando...</p>
          </div>
        </template>
      </ClientOnly>
    </div>

    <div class="container mx-auto px-4 py-16">
      <!-- Header -->
      <header class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Teste Tailwind CSS
        </h1>
        <p class="text-xl text-white/90 max-w-2xl mx-auto">
          Esta página demonstra alguns componentes e classes do Tailwind CSS funcionando no Nuxt 4
        </p>
      </header>

      <!-- Cards Section -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <!-- Card 1 -->
        <div class="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
          <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Responsivo</h3>
          <p class="text-gray-600">Design que se adapta a todos os tamanhos de tela</p>
        </div>

        <!-- Card 2 -->
        <div class="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
          <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Componentes</h3>
          <p class="text-gray-600">Elementos de UI reutilizáveis e flexíveis</p>
        </div>

        <!-- Card 3 -->
        <div class="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 md:col-span-2 lg:col-span-1">
          <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Utilitários</h3>
          <p class="text-gray-600">Classes utilitárias para estilização rápida</p>
        </div>
      </div>

      <!-- Button Section -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-white mb-6">Botões Estilizados</h2>
        <div class="flex flex-wrap justify-center gap-4">
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
            Primário
          </button>
          <button class="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold py-3 px-6 rounded-lg transition-all duration-200">
            Secundário
          </button>
          <button class="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
            Sucesso
          </button>
        </div>
      </div>

      <!-- Typography Section -->
      <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12">
        <h2 class="text-3xl font-bold text-white mb-6 text-center">Tipografia</h2>
        <div class="space-y-4 text-white">
          <p class="text-4xl font-bold">Título Principal</p>
          <p class="text-2xl font-semibold">Subtítulo</p>
          <p class="text-lg">Texto normal com tamanho médio para leitura confortável</p>
          <p class="text-sm text-white/80">Texto pequeno para informações secundárias</p>
        </div>
      </div>

      <!-- Grid Layout Test -->
      <div class="bg-white rounded-2xl p-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Layout Grid</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-red-100 border-2 border-red-300 rounded-lg p-4 text-center">
            <div class="w-full h-20 bg-red-400 rounded mb-2"></div>
            <span class="text-red-800 font-medium">Item 1</span>
          </div>
          <div class="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4 text-center">
            <div class="w-full h-20 bg-yellow-400 rounded mb-2"></div>
            <span class="text-yellow-800 font-medium">Item 2</span>
          </div>
          <div class="bg-green-100 border-2 border-green-300 rounded-lg p-4 text-center">
            <div class="w-full h-20 bg-green-400 rounded mb-2"></div>
            <span class="text-green-800 font-medium">Item 3</span>
          </div>
          <div class="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 text-center">
            <div class="w-full h-20 bg-blue-400 rounded mb-2"></div>
            <span class="text-blue-800 font-medium">Item 4</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Composable de autenticação (import explícito conforme Nuxt 4 guidelines)
const { logout, isLoading, currentUser } = useAuth()

// Configurações da página
definePageMeta({
  title: 'Teste Tailwind CSS'
})

// Use head para SEO
useHead({
  title: 'Teste Tailwind CSS - Nuxt 4',
  meta: [
    { name: 'description', content: 'Página de teste para demonstrar funcionalidades do Tailwind CSS no Nuxt 4' }
  ]
})

// Função para fazer logout
const handleLogout = async () => {
  await logout()
}
</script>