<template>
  <div class="flex flex-col w-full">
    <!-- Slots de agendamento alinhados com a régua -->
    <div>
      <div 
        v-for="hora in horarios" 
        :key="hora"
        class="h-16 border-b border-gray-100 p-1 flex items-center justify-center"
      >
        <div class="text-xs text-gray-400 text-center">
          Slots do dia
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  data: Date
}

const props = defineProps<Props>()

// Horários disponíveis (deve estar sincronizado com a régua)
const horarios = computed(() => {
  const horas = []
  for (let i = 8; i <= 22; i++) {
    horas.push(`${i.toString().padStart(2, '0')}:00`)
  }
  return horas
})
</script>