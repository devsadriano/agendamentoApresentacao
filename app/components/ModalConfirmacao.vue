<template>
  <BaseModal
    v-model="modalVisible"
    title="Confirmar Exclusão"
    confirm-text="Deletar"
    cancel-text="Cancelar"
    confirm-variant="error"
    :loading="loading"
    @confirm="handleConfirm"
    @close="handleClose"
  >
    <div class="flex items-center space-x-3">
      <!-- Ícone de aviso -->
      <div class="flex-shrink-0">
        <ExclamationTriangleIcon class="h-8 w-8 text-red-500" />
      </div>
      
      <!-- Mensagem -->
      <div>
        <p class="text-sm text-gray-600">
          {{ message }}
        </p>
        <p class="text-xs text-gray-500 mt-1">
          Esta ação não pode ser desfeita.
        </p>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

interface Props {
  modelValue: boolean
  message?: string
}

const props = withDefaults(defineProps<Props>(), {
  message: 'Tem certeza que deseja deletar este item?'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
  close: []
}>()

// Estados
const loading = ref(false)

// Computed
const modalVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Métodos
const handleConfirm = () => {
  emit('confirm')
}

const handleClose = () => {
  emit('close')
}

// Setter para loading (para uso externo)
const setLoading = (value: boolean) => {
  loading.value = value
}

// Expor métodos para componente pai
defineExpose({
  setLoading
})
</script>