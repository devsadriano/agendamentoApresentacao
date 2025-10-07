<template>
  <div class="bg-white flex">
    <!-- Header dos dias da semana -->
    <div class="flex flex-1">
      <DiaSemanaComponent 
        v-for="(dia, index) in diasSemana" 
        :key="dia.data.toISOString()"
        :dia="dia"
        :is-ultimo="index === diasSemana.length - 1"
        :class="{ 'ml-16': index === 0 }"
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