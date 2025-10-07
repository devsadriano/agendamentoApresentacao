<template>
  <div 
    class="absolute left-1 right-1 bg-blue-100 rounded-md p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    :style="positionStyle"
  >
    <!-- Horário -->
    <div class="text-xs font-medium text-blue-700 mb-1">
      {{ horarioFormatado }}
    </div>
    
    <!-- Título -->
    <div class="text-sm font-semibold text-blue-900 mb-1 leading-tight">
      {{ agendamento.titulo }}
    </div>
    
    <!-- Descrição -->
    <div class="text-xs text-blue-600 truncate">
      {{ agendamento.descricao }}
    </div>
  </div>
</template>

<script setup lang="ts">
// Interface temporária para os dados de teste
interface AgendamentoTeste {
  id: string
  dataInicio: Date
  dataFim: Date
  titulo: string
  descricao: string
}

interface Props {
  agendamento: AgendamentoTeste
}

const props = defineProps<Props>()

// Constantes para cálculos
const HORA_INICIO = 8 // 8h
const HORA_FIM = 22 // 22h
const ALTURA_POR_HORA = 96 // 96px (h-24 = 6rem = 96px)

// Computed para formatar o horário
const horarioFormatado = computed(() => {
  const inicio = props.agendamento.dataInicio.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  })
  const fim = props.agendamento.dataFim.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  })
  return `${inicio} - ${fim}`
})

// Computed para calcular posição e tamanho
const positionStyle = computed(() => {
  const inicio = props.agendamento.dataInicio
  const fim = props.agendamento.dataFim
  
  // Calcular horas e minutos desde 8h
  const horaInicioFloat = inicio.getHours() + inicio.getMinutes() / 60
  const horaFimFloat = fim.getHours() + fim.getMinutes() / 60
  
  // Calcular posição top (desde 8h)
  const topPx = (horaInicioFloat - HORA_INICIO) * ALTURA_POR_HORA
  
  // Calcular altura baseada na duração
  const duracaoHoras = horaFimFloat - horaInicioFloat
  const alturaPx = duracaoHoras * ALTURA_POR_HORA
  
  return {
    top: `${topPx}px`,
    height: `${alturaPx - 2}px`, // -2px para não encostar nas bordas
    zIndex: 10
  }
})
</script>