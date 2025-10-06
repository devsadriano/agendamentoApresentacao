<template>
  <div class="rounded-lg h-full flex flex-col">
    <!-- Header - Agendamentos (altura fixa 100px) -->
    <div class="h-[100px] border-2 border-dashed border-cyan-500 bg-gray-50 flex items-center justify-between px-6">
      <!-- Lado esquerdo: Controlador de semana -->
      <div class="flex-shrink-0">
        <ControladorSemana />
      </div>
      
      <!-- Lado direito: Título (ou espaço reservado) -->
      <div class="text-center">
        <h2 class="text-lg font-semibold text-gray-700">Header - Agendamentos</h2>
        <p class="text-sm text-gray-500">100px fixo</p>
      </div>
    </div>

    <!-- Corpo - Conteúdo Principal (ocupa todo o espaço restante) -->
    <div class="flex-1 border-2 border-dashed border-green-500 bg-green-50 flex items-center justify-center">
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