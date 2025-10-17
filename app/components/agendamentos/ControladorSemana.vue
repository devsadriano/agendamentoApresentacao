<template>
  <div class="w-full">
    <!-- Container com fundo escuro #242f41 -->
  <div class="px-6 py-5 shadow-lg rounded-2xl" style="background-color: #242f41;">
      <!-- Primeira linha: Data, botões e botão Novo -->
      <div class="flex items-center gap-6">
        <!-- Lado esquerdo: Data e botões de navegação -->
        <div class="flex items-center gap-4">
          <!-- Botões de navegação -->
          <div class="flex items-center gap-2">
            <!-- Botão voltar semana -->
            <button 
              @click="voltarSemana"
              class="group p-3 rounded-xl bg-[#f8af18] hover:bg-[#ffd36a] border-2 border-[#f8af18]/60 hover:border-[#ffd36a] transition-all duration-300 shadow-md hover:shadow-lg"
              title="Semana anterior"
            >
              <ChevronLeftIcon class="h-5 w-5 text-slate-900 transition-colors" />
            </button>
            
            <!-- Período da semana com estilo melhorado -->
            <div class="px-6 py-3 bg-white/95 rounded-xl shadow-md backdrop-blur-sm">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-slate-600">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <span class="text-base font-semibold text-slate-700">
                  {{ formatarData(primeiroDia) }} - {{ formatarData(ultimoDia) }}
                </span>
              </div>
            </div>
            
            <!-- Botão avançar semana -->
            <button 
              @click="avancarSemana"
              class="group p-3 rounded-xl bg-[#f8af18] hover:bg-[#ffd36a] border-2 border-[#f8af18]/60 hover:border-[#ffd36a] transition-all duration-300 shadow-md hover:shadow-lg"
              title="Próxima semana"
            >
              <ChevronRightIcon class="h-5 w-5 text-slate-900 transition-colors" />
            </button>
          </div>
        </div>

        <!-- Centro: Profissional Ativo (ocupa espaço restante) -->
        <div class="flex-1 flex justify-center">
          <ProfissionalAtivo @abrir-selecao="emit('abrir-selecao-profissional')" />
        </div>

        <!-- Lado direito: Botão Novo -->
        <div class="flex justify-end">
          <BaseButton
            variant="primary"
            size="lg"
            @click="novoAgendamento"
          >
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </template>
            Novo Agendamento
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Segunda linha: Lista de dias (fora do azul) -->
    <div class="px-4 py-6" style="background-color: #FAFAFA;">
      <ListaDias :dias-semana="agendamentoStore.semanaAtual" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import BaseButton from '../BaseButton.vue'
import ProfissionalAtivo from './ProfissionalAtivo.vue'
import ListaDias from './ListaDias.vue'

// Definir emits
const emit = defineEmits<{
  'novoAgendamento': []
  'abrir-selecao-profissional': []
}>()

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

// Função para novo agendamento
const novoAgendamento = () => {
  emit('novoAgendamento')
}
</script>