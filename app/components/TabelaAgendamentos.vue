<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <!-- Header da Tabela -->
    <div class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-medium text-gray-900">
        Agendamentos 
        <span v-if="agendamentos.length > 0" class="text-sm font-normal text-gray-500">
          ({{ agendamentos.length }} agendamentos)
        </span>
      </h3>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-flex items-center space-x-2 text-gray-500">
        <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Carregando agendamentos...</span>
      </div>
    </div>

    <!-- Erro -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-center mx-6 my-4">
      <div class="text-red-600">{{ error }}</div>
    </div>

    <!-- Lista de Agendamentos -->
    <div v-else-if="agendamentos.length > 0" class="divide-y divide-gray-200">
      <div
        v-for="agendamento in agendamentos"
        :key="agendamento.agendamento_id"
        class="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
      >
        <div class="flex items-center space-x-4">
          <!-- Barra colorida lateral -->
          <div 
            class="w-1 h-16 rounded-full"
            :style="{ backgroundColor: agendamento.cor || '#DBE9FE' }"
          ></div>

          <!-- Data e Horário -->
          <div class="flex-shrink-0 w-32">
            <div class="text-sm font-medium text-gray-900">
              {{ formatarDataAbreviada(agendamento.data) }}
            </div>
            <div class="text-sm text-gray-500">
              {{ formatarHorario(agendamento.hora_inicio) }} - {{ formatarHorario(agendamento.hora_fim) }}
            </div>
          </div>

          <!-- Título e Descrição -->
          <div class="flex-1 min-w-0">
            <div class="text-base font-medium text-gray-900 truncate">
              {{ agendamento.titulo || 'Sem título' }}
            </div>
            <div class="text-sm text-gray-500 truncate">
              {{ agendamento.descricao || 'Sem descrição' }}
            </div>
          </div>

          <!-- Cliente -->
          <div class="flex items-center space-x-3 w-48">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <UserIcon class="h-4 w-4 text-gray-500" />
              </div>
            </div>
            <div class="min-w-0 flex-1">
              <div class="text-sm font-medium text-gray-900 truncate">
                {{ agendamento.nome_cliente || 'Cliente não informado' }}
              </div>
              <div class="text-xs text-gray-500 truncate">
                {{ agendamento.telefone_cliente || agendamento.email_cliente || '--' }}
              </div>
            </div>
          </div>

          <!-- Profissional -->
          <div class="flex items-center space-x-3 w-48">
            <div class="flex-shrink-0">
              <div 
                class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                :style="{ backgroundColor: getCorProfissional(agendamento.nome_profissional) }"
              >
                {{ agendamento.nome_profissional?.charAt(0).toUpperCase() || 'P' }}
              </div>
            </div>
            <div class="min-w-0 flex-1">
              <div class="text-sm font-medium text-gray-900 truncate">
                {{ agendamento.nome_profissional || 'Profissional não informado' }}
              </div>
              <div class="text-xs text-gray-500 truncate">
                {{ agendamento.especialidade_profissional || '--' }}
              </div>
            </div>
          </div>

          <!-- ID e Status -->
          <div class="flex-shrink-0 w-20 text-right">
            <div class="text-sm font-medium text-gray-900">
              #{{ agendamento.agendamento_id }}
            </div>
            <div class="text-xs text-gray-400">
              {{ formatarDataCriacao(agendamento.created_at) }}
            </div>
          </div>

          <!-- Menu de ações -->
          <div class="flex-shrink-0">
            <button
              type="button"
              class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Mais opções"
            >
              <EllipsisVerticalIcon class="h-5 w-5" />
            </button>
          </div>
        </div>

        <!-- Status de cancelamento (se aplicável) -->
        <div v-if="agendamento.cancelado" class="mt-2 ml-5">
          <div class="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
            <XCircleIcon class="h-3 w-3 mr-1" />
            Cancelado em {{ formatarDataHora(agendamento.cancelado_as) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Estado vazio -->
    <div v-else class="text-center py-12">
      <CalendarIcon class="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">Nenhum agendamento encontrado</h3>
      <p class="text-gray-500">Não há agendamentos cadastrados no sistema.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CalendarIcon, ClockIcon, UserIcon, EllipsisVerticalIcon, XCircleIcon } from '@heroicons/vue/24/outline'
import type { AgendamentoCompleto } from '../../shared/types/database'

// Props
interface Props {
  agendamentos: AgendamentoCompleto[]
  loading?: boolean
  error?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: null
})

// Função para formatar data abreviada
const formatarDataAbreviada = (data: string | null): string => {
  if (!data) return 'Data não informada'
  
  try {
    const dataObj = new Date(data)
    return dataObj.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  } catch {
    return 'Data inválida'
  }
}

// Função para formatar data de criação
const formatarDataCriacao = (dataHora: string | null): string => {
  if (!dataHora) return '--'
  
  try {
    const data = new Date(dataHora)
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    })
  } catch {
    return '--'
  }
}

// Função para gerar cor do profissional baseada no nome
const getCorProfissional = (nome: string | null | undefined): string => {
  const cores = [
    '#3B82F6', // blue-500
    '#EF4444', // red-500  
    '#10B981', // emerald-500
    '#F59E0B', // amber-500
    '#8B5CF6', // violet-500
    '#06B6D4', // cyan-500
    '#EC4899', // pink-500
    '#84CC16', // lime-500
  ]
  
  // Se nome for null, undefined ou vazio, retornar cor padrão
  if (!nome) return '#6B7280'
  
  // Calcular índice baseado no nome
  const index = nome.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return cores[index % cores.length] || '#6B7280'
}

const formatarHorario = (horario: string | null): string => {
  if (!horario) return '--:--'
  
  try {
    // Se já estiver no formato HH:MM, retornar diretamente
    if (horario.match(/^\d{2}:\d{2}$/)) {
      return horario
    }
    
    // Se estiver no formato ISO com timezone, extrair apenas a hora
    if (horario.includes('T') || horario.includes('-')) {
      const data = new Date(horario)
      return data.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    
    // Caso contrário, tentar extrair HH:MM do string
    const match = horario.match(/(\d{2}):(\d{2})/)
    if (match) {
      return `${match[1]}:${match[2]}`
    }
    
    return '--:--'
  } catch {
    return '--:--'
  }
}

const formatarDataHora = (dataHora: string | null): string => {
  if (!dataHora) return 'Data não informada'
  
  try {
    const data = new Date(dataHora)
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return 'Data inválida'
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>