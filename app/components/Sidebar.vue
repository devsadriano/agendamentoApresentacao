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
        <HomeIcon class="w-5 h-5" />
        <span class="font-medium">Dashboard</span>
      </NuxtLink>

      <!-- 2. Especialidades - ainda não redireciona para nada -->
      <button 
        class="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors group text-left"
      >
        <LightBulbIcon class="w-5 h-5" />
        <span class="font-medium">Especialidades</span>
      </button>

      <!-- 3. Agendamentos -->
      <NuxtLink 
        to="/agendamentos" 
        class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors group"
        :class="{ 'bg-blue-50 text-blue-600 border-r-2 border-blue-600': $route.path === '/agendamentos' }"
      >
        <CalendarIcon class="w-5 h-5" />
        <span class="font-medium">Agendamentos</span>
      </NuxtLink>

      <!-- 4. Clientes -->
      <NuxtLink 
        to="/clientes" 
        class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors group"
        :class="{ 'bg-blue-50 text-blue-600 border-r-2 border-blue-600': $route.path === '/clientes' }"
      >
        <UserIcon class="w-5 h-5" />
        <span class="font-medium">Clientes</span>
      </NuxtLink>

      <!-- 5. Profissionais -->
      <NuxtLink 
        to="/profissionais" 
        class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors group"
        :class="{ 'bg-blue-50 text-blue-600 border-r-2 border-blue-600': $route.path === '/profissionais' }"
      >
        <UsersIcon class="w-5 h-5" />
        <span class="font-medium">Profissionais</span>
      </NuxtLink>
    </nav>

    <!-- Footer -->
    <div class="p-4 border-t border-gray-200 bg-gray-50">
      <div class="dropdown-container relative">
        <button 
          @click="handleConfigClick"
          class="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors group text-left"
          :class="{ 'bg-gray-100': isDropdownOpen }"
        >
          <CogIcon class="w-5 h-5 text-gray-600" />
          <span class="font-medium text-gray-700">Configurações</span>
        </button>
        
        <!-- Dropdown Menu -->
        <DropdownMenu 
          :is-open="isDropdownOpen" 
          @close="closeDropdown"
        />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// Import explícito do composable conforme Nuxt 4 guidelines
import { useAuth } from '~/composables/useAuth'

// Imports dos ícones do Heroicons
import {
  HomeIcon,
  LightBulbIcon,
  CalendarIcon,
  UserIcon,
  UsersIcon,
  CogIcon
} from '@heroicons/vue/24/outline'

// Import do componente DropdownMenu
import DropdownMenu from './DropdownMenu.vue'

// Estado do dropdown
const isDropdownOpen = ref(false)

// Função para lidar com clique em configurações (abre/fecha dropdown)
const handleConfigClick = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

// Função para fechar dropdown
const closeDropdown = () => {
  isDropdownOpen.value = false
}

// Fechar dropdown quando clicar fora
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.dropdown-container')) {
    closeDropdown()
  }
}

// Adicionar/remover listener para clique fora
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>