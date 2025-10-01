<template>
  <NuxtLayout>
    <!-- Header da Dashboard -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p class="text-gray-600 mt-1">Bem-vindo ao sistema de agendamento</p>
        </div>
        
        <!-- Informações do usuário -->
        <ClientOnly>
          <div class="bg-white rounded-lg shadow-sm border p-4">
            <div v-if="currentUser" class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                {{ currentUser.email?.charAt(0).toUpperCase() }}
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">{{ currentUser.email }}</p>
                <p class="text-xs text-gray-500">Usuário logado</p>
              </div>
              <button
                @click="handleLogout"
                :disabled="isLoading"
                class="bg-red-500 hover:bg-red-600 disabled:opacity-50 px-3 py-1 rounded text-sm font-medium text-white transition-colors"
              >
                {{ isLoading ? 'Saindo...' : 'Sair' }}
              </button>
            </div>
            <div v-else>
              <p class="text-sm text-gray-500">Não autenticado</p>
            </div>
          </div>
          <template #fallback>
            <div class="bg-white rounded-lg shadow-sm border p-4">
              <p class="text-sm text-gray-500">Carregando...</p>
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>

    <!-- Cards de estatísticas -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v16a2 2 0 002 2z"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Agendamentos Hoje</p>
            <p class="text-2xl font-semibold text-gray-900">12</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Clientes Ativos</p>
            <p class="text-2xl font-semibold text-gray-900">248</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Serviços</p>
            <p class="text-2xl font-semibold text-gray-900">8</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Receita Mensal</p>
            <p class="text-2xl font-semibold text-gray-900">R$ 12.450</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Conteúdo para demonstrar scroll -->
    <div class="space-y-6">
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Próximos Agendamentos</h2>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p class="font-medium text-gray-900">João Silva</p>
              <p class="text-sm text-gray-600">Corte de Cabelo - 14:00</p>
            </div>
            <span class="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Confirmado</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p class="font-medium text-gray-900">Maria Santos</p>
              <p class="text-sm text-gray-600">Manicure - 15:30</p>
            </div>
            <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">Pendente</span>
          </div>
        </div>
      </div>

      <!-- Mais conteúdo para demonstrar scroll -->
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
          <div class="space-y-2">
            <button class="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div class="flex items-center space-x-3">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                <span class="font-medium">Novo Agendamento</span>
              </div>
            </button>
            <button class="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div class="flex items-center space-x-3">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <span class="font-medium">Cadastrar Cliente</span>
              </div>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Estatísticas</h3>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span>Ocupação da semana</span>
                <span>75%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full" style="width: 75%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span>Meta mensal</span>
                <span>45%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-600 h-2 rounded-full" style="width: 45%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Conteúdo adicional para demonstrar scroll -->
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Teste de Scroll</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="h-40 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
            <span class="text-blue-800 font-medium">Conteúdo 1</span>
          </div>
          <div class="h-40 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
            <span class="text-green-800 font-medium">Conteúdo 2</span>
          </div>
          <div class="h-40 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
            <span class="text-purple-800 font-medium">Conteúdo 3</span>
          </div>
        </div>
        <p class="mt-4 text-gray-600">
          Este conteúdo demonstra como o layout funciona com sidebar fixa à esquerda e área principal rolável. 
          O sidebar permanece fixo enquanto o conteúdo principal pode ser rolado normalmente.
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
// Imports explícitos conforme Nuxt 4 guidelines
import { useAuth } from '~/composables/useAuth'

// Composable de autenticação
const { logout, isLoading, currentUser } = useAuth()

// Configuração da página
useHead({
  title: 'Dashboard - Sistema de Agendamento',
  meta: [
    { name: 'description', content: 'Dashboard do sistema de agendamento' }
  ]
})

// Função para fazer logout
const handleLogout = async () => {
  await logout()
}

// Lifecycle hooks
onMounted(() => {
  console.log('Página Dashboard carregada')
  console.log('Usuário atual:', currentUser.value?.email)
})
</script>