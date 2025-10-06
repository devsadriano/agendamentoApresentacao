<template>
  <div class="bg-white border-b border-gray-200 rounded-lg mt-4">
    <!-- Header dos dias da semana -->
    <div class="flex">
      <DiaSemanaComponent 
        v-for="(dia, index) in diasSemana" 
        :key="dia.data.toISOString()"
        :dia="dia"
        :is-ultimo="index === diasSemana.length - 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DiaSemana } from '../../../shared/types/database'
import DiaSemanaComponent from './DiaSemana.vue'

// Props
interface Props {
  diasSemana: DiaSemana[]
}

const props = defineProps<Props>()
</script>