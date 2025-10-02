<template>
  <NuxtLayout>
    <!-- Header com título -->
    <div class="px-6 py-4">
      <h1 class="text-2xl font-bold text-gray-800">Especialidades</h1>
    </div>
    
    <!-- Área de conteúdo -->
    <div class="p-6">
      <!-- Header com botão adicionar -->
      <div class="mb-6 flex justify-between items-center">
        <div>
          <p class="text-gray-600">Gerencie as especialidades do sistema</p>
        </div>
        <BaseButton
          variant="primary"
          size="md"
          :disabled="!isAdmin"
          @click="abrirModal"
        >
          <template #icon-left>
            <PlusIcon class="h-4 w-4" />
          </template>
          Adicionar Especialidade
        </BaseButton>
      </div>

      <!-- Tabela -->
      <TabelaEspecialidades 
        :especialidades="especialidades"
        :loading="loading"
        :error="error"
        :is-admin="isAdmin"
        @editar="abrirModalEdicao"
        @deletar="deletarEspecialidade"
      />
    </div>

    <!-- Modal -->
    <ModalEspecialidade
      v-model="modalAberto"
      :is-edicao="modalEdicao"
      :especialidade="especialidadeEdicao"
      @success="onModalSuccess"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline'
import type { Especialidade } from '../../shared/types/database'

const { buscarEspecialidades } = useProfissionais()
const userStore = useUserStore()

// Estados reativos
const especialidades = ref<Especialidade[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const modalAberto = ref(false)
const modalEdicao = ref(false)
const especialidadeEdicao = ref<Especialidade | null>(null)

// Computed para verificar se é admin
const isAdmin = computed(() => userStore.profile?.role === 'admin')

// Método para abrir o modal de criação
const abrirModal = () => {
  modalEdicao.value = false
  especialidadeEdicao.value = null
  modalAberto.value = true
}

// Método para abrir o modal de edição
const abrirModalEdicao = (id: number) => {
  // Buscar a especialidade nos dados já carregados
  const especialidade = especialidades.value.find(e => e.id === id)
  if (especialidade) {
    modalEdicao.value = true
    especialidadeEdicao.value = especialidade
    modalAberto.value = true
  }
}

// Método para deletar (placeholder)
const deletarEspecialidade = (id: number) => {
  console.log('Deletar especialidade ID:', id)
  // TODO: Implementar função de deletar
}

// Método chamado quando o modal tem sucesso
const onModalSuccess = async () => {
  // Recarregar a lista de especialidades
  await carregarEspecialidades()
}

// Função para carregar especialidades
const carregarEspecialidades = async () => {
  loading.value = true
  error.value = null
  
  try {
    especialidades.value = await buscarEspecialidades()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('Erro ao carregar especialidades:', err)
  } finally {
    loading.value = false
  }
}

// Carregar especialidades ao montar a página
onMounted(async () => {
  await carregarEspecialidades()
})
</script>