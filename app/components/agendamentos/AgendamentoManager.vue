<template>
  <div class="rounded-lg h-full flex flex-col" style="background-color: #FAFAFA;">
    <!-- Header - Agendamentos (altura automática) -->
    <div class="flex items-center">
      <!-- Card único com todos os componentes -->
      <ControladorSemana />
    </div>

    <!-- Corpo - Conteúdo Principal (ocupa todo o espaço restante) -->
    <div class="flex-1 flex">
      <!-- Lado esquerdo: Régua de horários -->
      <ReguaHorarios />
      
      <!-- Lado direito: Grid dos dias da semana -->
      <div class="flex-1 flex" style="background-color: #FAFAFA;">
        <!-- Iteração pelos 7 dias da semana -->
        <ItemAgendamento 
          v-for="dia in agendamentoStore.semanaAtual" 
          :key="dia.data.toISOString()"
          :data="dia.data"
          :agendamentos="getAgendamentosDoDia(dia.data)"
          :loading="loadingAgendamentos"
          class="flex-1"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import explícito dos componentes
import ControladorSemana from './ControladorSemana.vue'
import ReguaHorarios from './ReguaHorarios.vue'
import ItemAgendamento from './ItemAgendamento.vue'
import { useAgendamentoStore } from '../../stores/agendamento'
import { useProfissionalAtivo } from '../../composables/useProfissionalAtivo'
import { useAgendamento } from '../../composables/useAgendamento'
import type { Agendamento } from '../../../shared/types/database'

// Acessar o store de agendamentos
const agendamentoStore = useAgendamentoStore()

// Acessar o profissional ativo
const { profissionalAtivo } = useProfissionalAtivo()

// Usar o composable de agendamento
const { buscarAgendamentosPorProfissionalEPeriodo, loading: loadingAgendamentos, error } = useAgendamento()

// Estado reativo para todos os agendamentos do profissional
const todosAgendamentos = ref<Agendamento[]>([])

/**
 * Calcula as datas de início e fim da semana atual
 */
const periodoSemanaAtual = computed(() => {
  const semana = agendamentoStore.semanaAtual
  if (semana.length === 0 || !semana[0] || !semana[6]) {
    return { inicio: '', fim: '' }
  }
  
  const dataInicio = semana[0].data.toISOString().split('T')[0] // formato YYYY-MM-DD
  const dataFim = semana[6].data.toISOString().split('T')[0]   // formato YYYY-MM-DD
  
  return { inicio: dataInicio, fim: dataFim }
})

/**
 * Filtra agendamentos de uma data específica
 */
const getAgendamentosDoDia = (data: Date): Agendamento[] => {
  const diaAtual = data.toISOString().split('T')[0] // formato YYYY-MM-DD
  
  return todosAgendamentos.value.filter(agendamento => 
    agendamento.data === diaAtual
  )
}

/**
 * Busca agendamentos quando profissional ou semana mudarem
 */
const buscarAgendamentosSemana = async () => {
  if (!profissionalAtivo.value?.profissional_id) {
    todosAgendamentos.value = []
    return
  }

  const periodo = periodoSemanaAtual.value
  if (!periodo.inicio || !periodo.fim) {
    todosAgendamentos.value = []
    return
  }

  console.log('🔄 Buscando agendamentos:', {
    profissional: profissionalAtivo.value.nome_profissional,
    periodo: `${periodo.inicio} a ${periodo.fim}`
  })

  todosAgendamentos.value = await buscarAgendamentosPorProfissionalEPeriodo(
    profissionalAtivo.value.profissional_id,
    periodo.inicio,
    periodo.fim
  )

  console.log('✅ Agendamentos carregados:', todosAgendamentos.value.length)
}

/**
 * Watch para reagir a mudanças no profissional ativo
 */
watch(profissionalAtivo, buscarAgendamentosSemana, { immediate: true })

/**
 * Watch para reagir a mudanças na semana
 */
watch(periodoSemanaAtual, buscarAgendamentosSemana)

// Componente principal para gerenciar agendamentos
</script>