<template>
  <div class="flex flex-col items-center p-3 flex-1 relative">
    <!-- Linha divisória vertical (não encosta nas bordas) -->
    <div 
      v-if="!isUltimo" 
      class="absolute right-0 top-2 bottom-2 w-px bg-gray-200"
    ></div>
    
    <!-- Dia da semana por extenso (ex: DOM, SEG) -->
    <div class="text-xs font-medium text-gray-500 uppercase mb-1">
      {{ diaSemanaAbrev }}
    </div>
    
    <!-- Número do dia -->
    <div class="text-2xl font-semibold text-gray-800">
      {{ dia.diaNumero }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DiaSemana } from '../../../shared/types/database'

// Props
interface Props {
  dia: DiaSemana
  isUltimo?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isUltimo: false
})

// Computed para abreviação do dia da semana
const diaSemanaAbrev = computed(() => {
  const abreviacoes: Record<string, string> = {
    'Domingo': 'DOM',
    'Segunda': 'SEG',
    'Terça': 'TER',
    'Quarta': 'QUA',
    'Quinta': 'QUI',
    'Sexta': 'SEX',
    'Sábado': 'SAB'
  }
  
  return abreviacoes[props.dia.diaSemana] || props.dia.diaSemana.substring(0, 3).toUpperCase()
})
</script>