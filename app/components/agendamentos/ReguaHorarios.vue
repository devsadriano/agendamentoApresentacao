<template>
  <div class="w-20 mr-1" style="background-color: #FAFAFA;">
    <!-- Lista de horários -->
    <div>
      <div 
        v-for="hora in horarios" 
        :key="hora"
        class="h-24 flex items-center justify-center text-sm text-gray-500 border-b border-gray-200"
      >
        {{ hora }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Lista de horários das 8h às 22h
const horarios = computed(() => {
  const horas = []
  for (let i = 8; i <= 22; i++) {
    horas.push(`${i.toString().padStart(2, '0')}:00`)
  }
  return horas
})
</script>