<template>
  <aside class="w-64 bg-white shadow-lg h-screen flex flex-col fixed left-0 top-0 z-10">
    <!-- Header -->
    <div class="bg-blue-600 text-white p-4">
      <h2 class="text-xl font-bold">Agendamento</h2>
      <p class="text-blue-100 text-sm">Sistema de Gestão</p>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 p-4 space-y-2">
      <!-- 1. Dashboard - redireciona para página index -->
      <NuxtLink 
        to="/" 
        class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors group"
        :class="{ 'bg-blue-50 text-blue-600 border-r-2 border-blue-600': $route.path === '/' }"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v1H8V5z"/>
        </svg>
        <span class="font-medium">Dashboard</span>
      </NuxtLink>

      <!-- 2. Especialidades - ainda não redireciona para nada -->
      <button 
        class="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors group text-left"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
        </svg>
        <span class="font-medium">Especialidades</span>
      </button>

      <!-- 3. Agendamentos -->
      <NuxtLink 
        to="/agendamentos" 
        class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors group"
        :class="{ 'bg-blue-50 text-blue-600 border-r-2 border-blue-600': $route.path === '/agendamentos' }"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v16a2 2 0 002 2z"/>
        </svg>
        <span class="font-medium">Agendamentos</span>
      </NuxtLink>

      <!-- 4. Clientes -->
      <NuxtLink 
        to="/clientes" 
        class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors group"
        :class="{ 'bg-blue-50 text-blue-600 border-r-2 border-blue-600': $route.path === '/clientes' }"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
        <span class="font-medium">Clientes</span>
      </NuxtLink>

      <!-- 5. Profissionais -->
      <NuxtLink 
        to="/profissionais" 
        class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors group"
        :class="{ 'bg-blue-50 text-blue-600 border-r-2 border-blue-600': $route.path === '/profissionais' }"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
        <span class="font-medium">Profissionais</span>
      </NuxtLink>
    </nav>

    <!-- Footer -->
    <div class="p-4 border-t border-gray-200 bg-gray-50">
      <ClientOnly>
        <div v-if="currentUser" class="flex items-center space-x-3 mb-3">
          <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {{ currentUser.email?.charAt(0).toUpperCase() }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-700 truncate">{{ currentUser.email }}</p>
            <p class="text-xs text-gray-500 truncate">Usuário logado</p>
          </div>
        </div>
        
        <button 
          @click="handleLogout"
          :disabled="isLoading"
          class="w-full bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          <span>{{ isLoading ? 'Saindo...' : 'Sair' }}</span>
        </button>
        
        <template #fallback>
          <div class="text-center text-sm text-gray-500">Carregando...</div>
        </template>
      </ClientOnly>
    </div>
  </aside>
</template>

<script setup lang="ts">
// Import explícito do composable conforme Nuxt 4 guidelines
import { useAuth } from '~/composables/useAuth'

// Composable de autenticação
const { logout, isLoading, currentUser } = useAuth()

// Função para fazer logout
const handleLogout = async () => {
  await logout()
}
</script>