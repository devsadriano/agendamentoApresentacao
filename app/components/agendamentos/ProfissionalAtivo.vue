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
import { useProfissionalAtivo } from '../../composables/useProfissionalAtivo'

// Usar o composable compartilhado do profissional ativo
const { profissionalAtivo, loading, error, carregarProfissionalAtivo } = useProfissionalAtivo()

// Carregar profissional ativo ao montar o componente
onMounted(async () => {
  await carregarProfissionalAtivo()
})
</script>