<template>
  <NuxtLayout>
    <div class="p-6">
      <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      <!-- Teste do Pinia - Nome do usuário -->
      <ClientOnly>
        <div class="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h2 class="text-lg font-semibold text-blue-800 mb-2">Informações do Usuário (Pinia)</h2>
          <div v-if="userStore.isLoading" class="text-blue-600">
            Carregando perfil...
          </div>
          <div v-else-if="userStore.hasError" class="text-red-600">
            Erro: {{ userStore.error }}
          </div>
          <div v-else-if="userStore.userName" class="text-blue-700">
            <strong>Nome:</strong> {{ userStore.userName }}
          </div>
          <div v-else class="text-gray-600">
            Perfil não encontrado ou usuário sem nome cadastrado
          </div>
        </div>
        <template #fallback>
          <div class="mt-4 p-4 bg-gray-100 rounded-lg">
            <p class="text-gray-600">Carregando dados do usuário...</p>
          </div>
        </template>
      </ClientOnly>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
// Import do store do usuário
const userStore = useUserStore()

// Configuração da página
useHead({
  title: 'Dashboard - Sistema de Agendamento',
  meta: [
    { name: 'description', content: 'Dashboard do sistema de agendamento' }
  ]
})
</script>