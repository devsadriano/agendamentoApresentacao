<template>
  <div class="border border-purple-300 border-dashed p-4 mt-4 rounded-lg">
    <div class="text-center text-purple-600 text-sm font-medium mb-2">
      Componente Lista Dias (7 dias)
    </div>
    <div class="flex justify-center space-x-4 text-xs text-purple-500">
      <span v-for="dia in diasSemana" :key="dia.data.toISOString()">
        {{ formatarDia(dia) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DiaSemana } from '../../../shared/types/database'

// Props
interface Props {
  diasSemana: DiaSemana[]
}

const props = defineProps<Props>()

// Função para formatar o dia
const formatarDia = (dia: DiaSemana): string => {
  return `${dia.diaNumero.toString().padStart(2, '0')}/${dia.data.getMonth() + 1}`
}
</script>