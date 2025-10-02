<template>
  <!-- Overlay -->
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 overflow-y-auto"
    @click="handleOverlayClick"
  >
    <!-- Background overlay -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
    
    <!-- Modal container -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div
        class="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:max-w-lg"
        @click.stop
      >
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900">
              {{ title }}
            </h3>
            <button
              type="button"
              class="text-gray-400 hover:text-gray-600 transition-colors"
              @click="close"
            >
              <XMarkIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <!-- Content -->
        <div class="px-6 py-4">
          <slot />
        </div>
        
        <!-- Footer -->
        <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div class="flex justify-end space-x-3">
            <BaseButton
              variant="secondary"
              size="sm"
              @click="close"
            >
              {{ cancelText }}
            </BaseButton>
            <BaseButton
              variant="primary"
              size="sm"
              :loading="loading"
              :disabled="disabled"
              @click="confirm"
            >
              {{ confirmText }}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'

interface Props {
  modelValue: boolean
  title: string
  confirmText?: string
  cancelText?: string
  loading?: boolean
  disabled?: boolean
  closeOnOverlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: 'Confirmar',
  cancelText: 'Cancelar',
  loading: false,
  disabled: false,
  closeOnOverlay: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
  close: []
}>()

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const confirm = () => {
  emit('confirm')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    close()
  }
}

// Fechar com ESC
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.modelValue) {
      close()
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>