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

    <!-- Modal de Edição/Criação -->
    <ModalCliente
      v-model="modalAberto"
      :is-edicao="modalEdicao"
      :cliente="clienteEdicao"
      @success="onModalSuccess"
    />
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
const modalAberto = ref(false)
const modalEdicao = ref(false)
const clienteEdicao = ref<Cliente | null>(null)

// Método para abrir o modal de criação
const abrirModal = () => {
  modalEdicao.value = false
  clienteEdicao.value = null
  modalAberto.value = true
}

// Método para abrir o modal de edição
const abrirModalEdicao = (id: number) => {
  // Buscar o cliente nos dados já carregados
  const cliente = clientes.value.find(c => c.id === id)
  if (cliente) {
    modalEdicao.value = true
    clienteEdicao.value = cliente
    modalAberto.value = true
  }
}

// Método para abrir confirmação de deletar
const confirmarDeletar = (id: number) => {
  // TODO: Implementar confirmação de deletar
  console.log('Confirmar deletar cliente:', id)
}

// Método chamado quando o modal tem sucesso
const onModalSuccess = async () => {
  // Recarregar a lista de clientes
  await carregarClientes()
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