<template>
  <div class="text-center">
    <div v-if="loading" class="text-gray-500">
      Carregando...
    </div>
    <div v-else-if="profissionalAtivo" class="space-y-1">
      <h3 class="text-xl font-semibold text-gray-800 uppercase">
        {{ profissionalAtivo.nome_profissional }}
      </h3>
      <p class="text-base text-gray-600">
        {{ profissionalAtivo.especialidade_profissional }}
      </p>
    </div>
    <div v-else class="text-gray-500">
      Profissional não encontrado
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Profissional } from '../../../shared/types/database'

// Stores e composables
const userStore = useUserStore()
const { buscarProfissionais } = useProfissionais()

// Estados reativos
const profissionais = ref<Profissional[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Computed para encontrar o profissional ativo
const profissionalAtivo = computed(() => {
  if (profissionais.value.length === 0) return null

  // Se o usuário está logado, buscar pelo profile_id
  if (userStore.userProfile?.id) {
    const profissionalLogado = profissionais.value.find(
      prof => prof.profile_id === userStore.userProfile?.id
    )
    
    if (profissionalLogado) {
      return profissionalLogado
    }
  }

  // Se não encontrou ou não está logado, retorna o primeiro da lista
  return profissionais.value[0] || null
})

// Função para carregar profissionais
const carregarProfissionais = async () => {
  loading.value = true
  error.value = null

  try {
    profissionais.value = await buscarProfissionais()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erro ao carregar profissionais'
    console.error('Erro ao carregar profissionais:', err)
  } finally {
    loading.value = false
  }
}

// Carregar profissionais ao montar o componente
onMounted(async () => {
  await carregarProfissionais()
})
</script>