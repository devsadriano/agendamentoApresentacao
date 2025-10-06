<template>
  <div class="rounded-lg h-full flex flex-col">
    <!-- Header - Agendamentos (altura automática) -->
    <div class="flex items-center px-6 py-4">
      <!-- Card único com todos os componentes -->
      <ControladorSemana />
    </div>

    <!-- Corpo - Conteúdo Principal (ocupa todo o espaço restante) -->
    <div class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <h3 class="text-lg font-semibold text-gray-700">Corpo - Conteúdo Principal</h3>
        <p class="text-sm text-gray-500">Ocupa todo o espaço restante</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import explícito do componente
import ControladorSemana from './ControladorSemana.vue'

// Componente principal para gerenciar agendamentos
// Por enquanto apenas estrutura básica
</script>