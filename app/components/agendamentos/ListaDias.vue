<template>
  <div class="bg-white flex mb-4">
    <!-- Espaço para compensar a largura da régua -->
    <div class="w-20"></div>
    
    <!-- Header dos dias da semana -->
    <div class="flex flex-1">
      <DiaSemanaComponent 
        v-for="(dia, index) in diasSemana" 
        :key="dia.data.toISOString()"
        :dia="dia"
        :is-primeiro="index === 0"
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