<template>
  <div class="flex flex-col items-center space-y-2">
    <!-- Primeira linha: Período da semana -->
    <div class="text-sm font-medium text-gray-700">
      De {{ formatarData(primeiroDia) }} até {{ formatarData(ultimoDia) }}
    </div>
    
    <!-- Segunda linha: Botões de navegação -->
    <div class="flex items-center space-x-4">
      <!-- Botão voltar semana -->
      <button 
        @click="voltarSemana"
        class="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        title="Semana anterior"
      >
        <ChevronLeftIcon class="h-5 w-5 text-gray-600" />
      </button>
      
      <!-- Botão avançar semana -->
      <button 
        @click="avancarSemana"
        class="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        title="Próxima semana"
      >
        <ChevronRightIcon class="h-5 w-5 text-gray-600" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

// Acessar o store de agendamentos
const agendamentoStore = useAgendamentoStore()

// Computed para obter o primeiro e último dia da semana
const primeiroDia = computed(() => {
  const semana = agendamentoStore.semanaAtual
  return semana.length > 0 ? semana[0]?.data || new Date() : new Date()
})

const ultimoDia = computed(() => {
  const semana = agendamentoStore.semanaAtual
  return semana.length > 0 ? semana[6]?.data || new Date() : new Date()
})

// Função para formatar data no formato dd/mm
const formatarData = (data: Date): string => {
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit'
  })
}

// Funções para navegação
const voltarSemana = () => {
  agendamentoStore.voltarSemana()
}

const avancarSemana = () => {
  agendamentoStore.avancarSemana()
}
</script>