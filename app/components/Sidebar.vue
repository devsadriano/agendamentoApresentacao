<template>
  <aside :class="[
    'bg-white shadow-lg h-screen flex flex-col fixed left-0 top-0 z-10 transition-all duration-300',
    isCollapsed ? 'w-16' : 'w-64'
  ]">
    <!-- Header -->
    <div class="bg-slate-800 text-white p-4 flex items-center justify-between">
      <div v-if="!isCollapsed" class="flex-1">
        <h2 class="text-xl font-bold">Paulo Advogado</h2>
        <p class="text-slate-300 text-sm">Sistema Jurídico</p>
      </div>      <!-- Botão de colapso -->
      <button 
        @click="toggleSidebar"
        class="p-1 rounded hover:bg-slate-700 transition-colors"
        :class="{ 'mx-auto': isCollapsed }"
      >
        <ChevronLeftIcon v-if="!isCollapsed" class="w-5 h-5" />
        <ChevronRightIcon v-else class="w-5 h-5" />
      </button>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
      <!-- SEÇÃO: PRINCIPAL -->
      <div v-if="!isCollapsed" class="px-3 pt-2 pb-2">
        <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Principal</p>
      </div>

      <!-- Dashboard -->
      <NuxtLink 
        to="/" 
        :class="[
          'flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors group',
          isCollapsed ? 'justify-center' : 'space-x-3',
          { 'bg-slate-50 text-slate-700 border-r-2 border-slate-700': $route.path === '/' }
        ]"
        :title="isCollapsed ? 'Dashboard' : ''"
      >
        <HomeIcon class="w-5 h-5 flex-shrink-0" />
        <span v-if="!isCollapsed" class="font-medium">Dashboard</span>
      </NuxtLink>

      <!-- Clientes -->
      <NuxtLink 
        to="/clientes" 
        :class="[
          'flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors group',
          isCollapsed ? 'justify-center' : 'space-x-3',
          { 'bg-slate-50 text-slate-700 border-r-2 border-slate-700': $route.path === '/clientes' }
        ]"
        :title="isCollapsed ? 'Clientes' : ''"
      >
        <UserIcon class="w-5 h-5 flex-shrink-0" />
        <span v-if="!isCollapsed" class="font-medium">Clientes</span>
      </NuxtLink>

      <!-- Processos -->
      <NuxtLink 
        to="/processos" 
        :class="[
          'flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors group',
          isCollapsed ? 'justify-center' : 'space-x-3',
          { 'bg-slate-50 text-slate-700 border-r-2 border-slate-700': $route.path === '/processos' }
        ]"
        :title="isCollapsed ? 'Processos' : ''"
      >
        <FolderIcon class="w-5 h-5 flex-shrink-0" />
        <span v-if="!isCollapsed" class="font-medium">Processos</span>
      </NuxtLink>

      <!-- Tarefas -->
      <NuxtLink 
        to="/tarefas" 
        :class="[
          'flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors group',
          isCollapsed ? 'justify-center' : 'space-x-3',
          { 'bg-slate-50 text-slate-700 border-r-2 border-slate-700': $route.path === '/tarefas' }
        ]"
        :title="isCollapsed ? 'Tarefas' : ''"
      >
        <ClipboardDocumentListIcon class="w-5 h-5 flex-shrink-0" />
        <span v-if="!isCollapsed" class="font-medium">Tarefas</span>
      </NuxtLink>

      <!-- Calendário -->
      <NuxtLink 
        to="/calendario" 
        :class="[
          'flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors group',
          isCollapsed ? 'justify-center' : 'space-x-3',
          { 'bg-slate-50 text-slate-700 border-r-2 border-slate-700': $route.path === '/calendario' }
        ]"
        :title="isCollapsed ? 'Calendário' : ''"
      >
        <CalendarIcon class="w-5 h-5 flex-shrink-0" />
        <span v-if="!isCollapsed" class="font-medium">Calendário</span>
      </NuxtLink>

      <!-- Divisor -->
      <div v-if="!isCollapsed" class="my-4 border-t border-slate-200"></div>
      <div v-else class="my-2"></div>

      <!-- SEÇÃO: GESTÃO -->
      <div v-if="!isCollapsed" class="px-3 pt-2 pb-2">
        <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gestão</p>
      </div>

      <!-- Advogados -->
      <NuxtLink 
        to="/profissionais" 
        :class="[
          'flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors group',
          isCollapsed ? 'justify-center' : 'space-x-3',
          { 'bg-slate-50 text-slate-700 border-r-2 border-slate-700': $route.path === '/profissionais' }
        ]"
        :title="isCollapsed ? 'Advogados' : ''"
      >
        <UsersIcon class="w-5 h-5 flex-shrink-0" />
        <span v-if="!isCollapsed" class="font-medium">Advogados</span>
      </NuxtLink>

      <!-- Contatos (Especialidades) -->
      <NuxtLink 
        to="/especialidades" 
        :class="[
          'flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors group',
          isCollapsed ? 'justify-center' : 'space-x-3',
          { 'bg-slate-50 text-slate-700 border-r-2 border-slate-700': $route.path === '/especialidades' }
        ]"
        :title="isCollapsed ? 'Áreas de Atuação' : ''"
      >
        <LightBulbIcon class="w-5 h-5 flex-shrink-0" />
        <span v-if="!isCollapsed" class="font-medium">Áreas de Atuação</span>
      </NuxtLink>

      <!-- Financeiro -->
      <NuxtLink 
        to="/financeiro" 
        :class="[
          'flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors group',
          isCollapsed ? 'justify-center' : 'space-x-3',
          { 'bg-slate-50 text-slate-700 border-r-2 border-slate-700': $route.path === '/financeiro' }
        ]"
        :title="isCollapsed ? 'Financeiro' : ''"
      >
        <CurrencyDollarIcon class="w-5 h-5 flex-shrink-0" />
        <span v-if="!isCollapsed" class="font-medium">Financeiro</span>
      </NuxtLink>
    </nav>

    <!-- Footer -->
    <div class="p-4 border-t border-gray-200 bg-gray-50">
      <div class="dropdown-container relative">
        <button 
          @click="handleConfigClick"
          :class="[
            'w-full flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors group text-left',
            isCollapsed ? 'justify-center' : 'space-x-3',
            { 'bg-gray-100': isDropdownOpen }
          ]"
          :title="isCollapsed ? 'Configurações' : ''"
        >
          <CogIcon class="w-5 h-5 text-gray-600 flex-shrink-0" />
          <span v-if="!isCollapsed" class="font-medium text-gray-700">Configurações</span>
        </button>
        
        <!-- Dropdown Menu - aparece sempre quando aberto -->
        <DropdownMenu 
          :is-open="isDropdownOpen" 
          @close="closeDropdown"
          :is-collapsed="isCollapsed"
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
  CalendarDaysIcon,
  UserIcon,
  UsersIcon,
  FolderIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  CogIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'

// Import do componente DropdownMenu
import DropdownMenu from './DropdownMenu.vue'

// Estado do dropdown
const isDropdownOpen = ref(false)

// Estado do colapso do sidebar
const isCollapsed = ref(false)

// Expor o estado para componentes pais
defineExpose({
  isCollapsed
})

// Função para lidar com clique em configurações (abre/fecha dropdown)
const handleConfigClick = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

// Função para toggle do colapso
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  // Não fechar o dropdown quando colapsar - permitir que funcione em ambos os estados
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