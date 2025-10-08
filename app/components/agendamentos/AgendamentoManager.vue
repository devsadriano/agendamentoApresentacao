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
const { buscarAgendamentosPorProfissional, loading: loadingAgendamentos, error } = useAgendamento()

// Estado reativo para todos os agendamentos do profissional
const todosAgendamentos = ref<Agendamento[]>([])

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
 * Busca todos os agendamentos quando o profissional ativo mudar
 */
watch(profissionalAtivo, async (novoProfissional) => {
  if (novoProfissional?.profissional_id) {
    console.log('🔄 Carregando agendamentos para profissional:', novoProfissional.nome_profissional)
    todosAgendamentos.value = await buscarAgendamentosPorProfissional(novoProfissional.profissional_id)
    console.log('✅ Agendamentos carregados:', todosAgendamentos.value.length)
  } else {
    todosAgendamentos.value = []
  }
}, { immediate: true })

// Componente principal para gerenciar agendamentos
</script>