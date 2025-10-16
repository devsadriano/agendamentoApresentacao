<template>
  <NuxtLayout>
    <!-- Header com título -->
    <div class="px-6 py-4">
      <h1 class="text-2xl font-bold text-gray-800">Agendamentos</h1>
    </div>
    
    <!-- Área de conteúdo -->
    <div class="p-6">
      <div class="mb-6">
        <p class="text-gray-600">Relatório completo de todos os agendamentos</p>
      </div>

      <!-- Tabela de Cards dos Agendamentos -->
      <TabelaAgendamentos 
        :agendamentos="agendamentos"
        :loading="loading"
        :error="error"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { AgendamentoCompleto } from '../../shared/types/database'

const { buscarRelatorioAgendamentos } = useAgendamento()

// Estados reativos
const agendamentos = ref<AgendamentoCompleto[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// Função para carregar agendamentos
const carregarAgendamentos = async () => {
  loading.value = true
  error.value = null
  
  try {
    agendamentos.value = await buscarRelatorioAgendamentos()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('Erro ao carregar agendamentos:', err)
  } finally {
    loading.value = false
  }
}

// Carregar agendamentos ao montar a página
onMounted(() => {
  carregarAgendamentos()
})
</script>