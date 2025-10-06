<template>
  <NuxtLayout>
    <!-- Header com título -->
    <div class="px-6 py-4">
      <h1 class="text-2xl font-bold text-gray-800">Agendamentos</h1>
    </div>
    
    <!-- Área de conteúdo -->
    <div class="p-6">
      <div class="mb-6">
        <p class="text-gray-600">Gerencie os agendamentos do sistema</p>
      </div>

      <!-- Componente principal de gerenciamento -->
      <AgendamentoManager />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
// Import explícito do componente
import AgendamentoManager from '../components/AgendamentoManager.vue'

// Configuração da página
useHead({
  title: 'Agendamentos - Sistema de Agendamento',
  meta: [
    { name: 'description', content: 'Gerenciamento de agendamentos do sistema' }
  ]
})
</script>