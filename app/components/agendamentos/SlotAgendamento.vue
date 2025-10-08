<template>
  <div 
    class="absolute left-1 right-1 bg-blue-100 rounded-md p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-center justify-center"
    :style="positionStyle"
    @click="abrirDetalhes"
  >
    <!-- Layout para agendamentos curtos (≤ 45min) -->
    <div v-if="isAgendamentoCurto" class="text-center">
      <!-- Apenas horário e título em linha única -->
      <div class="text-xs font-medium text-blue-700 truncate">
        {{ horarioFormatado }}
      </div>
      <div class="text-sm font-semibold text-blue-900 truncate leading-tight">
        {{ agendamento.titulo }}
      </div>
    </div>
    
    <!-- Layout para agendamentos médios (45min - 90min) -->
    <div v-else-if="isAgendamentoMedio" class="text-center">
      <!-- Horário -->
      <div class="text-xs font-medium text-blue-700 mb-1">
        {{ horarioFormatado }}
      </div>
      <!-- Título -->
      <div class="text-sm font-semibold text-blue-900 leading-tight">
        {{ agendamento.titulo }}
      </div>
    </div>
    
    <!-- Layout para agendamentos longos (> 90min) -->
    <div v-else class="text-center">
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
  </div>
</template>

<script setup lang="ts">
import type { Agendamento } from '../../../shared/types/database'

interface Props {
  agendamento: Agendamento
}

const props = defineProps<Props>()

// Constantes para cálculos - CORRIGIDAS para incluir separadores
const HORA_INICIO = 8 // 8h
const ALTURA_BLOCO = 96 // h-24 = 96px
const ALTURA_SEPARADOR = 4 // h-1 = 4px
const ALTURA_TOTAL_POR_HORA = ALTURA_BLOCO + ALTURA_SEPARADOR // 100px total

// Computed para formatar o horário
const horarioFormatado = computed(() => {
  if (!props.agendamento.hora_inicio || !props.agendamento.hora_fim) {
    return 'Horário não definido'
  }
  
  // Converter string de time para formato de exibição
  const inicio = props.agendamento.hora_inicio.substring(0, 5) // pega HH:MM
  const fim = props.agendamento.hora_fim.substring(0, 5) // pega HH:MM
  
  return `${inicio} - ${fim}`
})

// Computed para calcular duração em minutos
const duracaoMinutos = computed(() => {
  if (!props.agendamento.hora_inicio || !props.agendamento.hora_fim) {
    return 0
  }
  
  const inicioSplit = props.agendamento.hora_inicio.split(':')
  const fimSplit = props.agendamento.hora_fim.split(':')
  
  if (inicioSplit.length < 2 || fimSplit.length < 2) {
    return 0
  }
  
  const horaInicio = parseInt(inicioSplit[0] || '0')
  const minutoInicio = parseInt(inicioSplit[1] || '0')
  const horaFim = parseInt(fimSplit[0] || '0')
  const minutoFim = parseInt(fimSplit[1] || '0')
  
  const inicioMinutosTotais = horaInicio * 60 + minutoInicio
  const fimMinutosTotais = horaFim * 60 + minutoFim
  
  return fimMinutosTotais - inicioMinutosTotais
})

// Computed para classificar tamanho do agendamento
const isAgendamentoCurto = computed(() => duracaoMinutos.value <= 45)
const isAgendamentoMedio = computed(() => duracaoMinutos.value > 45 && duracaoMinutos.value <= 90)

// Função para abrir modal de detalhes
const abrirDetalhes = () => {
  // TODO: Implementar modal de detalhes
  console.log('Abrir detalhes do agendamento:', props.agendamento.titulo)
}

// Computed para calcular posição e tamanho CORRIGIDO com proporção de minutos
const positionStyle = computed(() => {
  if (!props.agendamento.hora_inicio || !props.agendamento.hora_fim) {
    return { top: '0px', height: '0px', zIndex: 10 }
  }
  
  // Extrair horas e minutos das strings de time
  const inicioSplit = props.agendamento.hora_inicio.split(':')
  const fimSplit = props.agendamento.hora_fim.split(':')
  
  if (inicioSplit.length < 2 || fimSplit.length < 2) {
    return { top: '0px', height: '0px', zIndex: 10 }
  }
  
  const horaInicio = parseInt(inicioSplit[0] || '0')
  const minutoInicio = parseInt(inicioSplit[1] || '0')
  const horaFim = parseInt(fimSplit[0] || '0')
  const minutoFim = parseInt(fimSplit[1] || '0')
  
  // Converter para minutos totais desde o início do dia
  const inicioMinutosTotais = horaInicio * 60 + minutoInicio
  const fimMinutosTotais = horaFim * 60 + minutoFim
  const duracaoMinutos = fimMinutosTotais - inicioMinutosTotais
  
  // Calcular posição top baseada em minutos desde 8h
  const minutosDesde8h = inicioMinutosTotais - (HORA_INICIO * 60)
  const horasDesde8h = minutosDesde8h / 60 // Decimal (ex: 1.5 para 1h30min)
  const topPx = horasDesde8h * ALTURA_TOTAL_POR_HORA
  
  // Calcular altura baseada na duração em minutos
  const duracaoHoras = duracaoMinutos / 60 // Decimal (ex: 0.5 para 30min)
  const alturaTotalPx = duracaoHoras * ALTURA_BLOCO // Proporcional ao bloco (96px)
  
  // Adicionar altura dos separadores que atravessa
  const horasCompletas = Math.floor(duracaoHoras)
  const separadoresAtravessados = Math.max(0, horasCompletas)
  const alturaComSeparadores = alturaTotalPx + (separadoresAtravessados * ALTURA_SEPARADOR)
  
  return {
    top: `${topPx}px`,
    height: `${alturaComSeparadores - 2}px`, // -2px para margem
    zIndex: 10
  }
})
</script>