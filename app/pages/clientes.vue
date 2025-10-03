<template>
  <NuxtLayout>
    <!-- Header com título -->
    <div class="px-6 py-4">
      <h1 class="text-2xl font-bold text-gray-800">Clientes</h1>
    </div>
    
    <!-- Área de conteúdo -->
    <div class="p-6">
      <!-- Header com botão adicionar -->
      <div class="mb-6 flex justify-between items-center">
        <div>
          <p class="text-gray-600">Gerencie os clientes do sistema</p>
        </div>
        <BaseButton
          variant="primary"
          size="md"
          @click="abrirModal"
        >
          <template #icon-left>
            <PlusIcon class="h-4 w-4" />
          </template>
          Adicionar Cliente
        </BaseButton>
      </div>

      <!-- Tabela -->
      <TabelaClientes 
        :clientes="clientes"
        :loading="loading"
        :error="error"
        @editar="abrirModalEdicao"
        @deletar="confirmarDeletar"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline'
import type { Cliente } from '../../shared/types/database'

const { buscarClientes } = useProfissionais()

// Estados reativos
const clientes = ref<Cliente[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// Método para abrir o modal de criação
const abrirModal = () => {
  // TODO: Implementar abertura do modal
  console.log('Abrir modal de criação')
}

// Método para abrir o modal de edição
const abrirModalEdicao = (id: number) => {
  // TODO: Implementar abertura do modal de edição
  console.log('Abrir modal de edição para cliente:', id)
}

// Método para abrir confirmação de deletar
const confirmarDeletar = (id: number) => {
  // TODO: Implementar confirmação de deletar
  console.log('Confirmar deletar cliente:', id)
}

// Função para carregar clientes
const carregarClientes = async () => {
  loading.value = true
  error.value = null
  
  try {
    clientes.value = await buscarClientes()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('Erro ao carregar clientes:', err)
  } finally {
    loading.value = false
  }
}

// Carregar clientes ao montar a página
onMounted(async () => {
  await carregarClientes()
})
</script>