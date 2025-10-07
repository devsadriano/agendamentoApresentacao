<template>
  <div class="w-20 bg-white border-r border-gray-200">
    <!-- Lista de horários -->
    <div class="py-2">
      <div 
        v-for="hora in horarios" 
        :key="hora"
        class="h-16 flex items-start justify-end pr-2 text-sm text-gray-500 border-b border-gray-100"
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