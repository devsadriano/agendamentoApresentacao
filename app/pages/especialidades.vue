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
      />
    </div>

    <!-- Modal -->
    <ModalEspecialidade
      v-model="modalAberto"
      :is-edicao="false"
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

// Computed para verificar se é admin
const isAdmin = computed(() => userStore.profile?.role === 'admin')

// Método para abrir o modal
const abrirModal = () => {
  modalAberto.value = true
}

// Carregar especialidades ao montar a página
onMounted(async () => {
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
})
</script>