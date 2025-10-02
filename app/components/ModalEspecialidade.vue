<template>
  <BaseModal
    v-model="modalVisible"
    :title="isEdicao ? 'Editar Especialidade' : 'Nova Especialidade'"
    :confirm-text="isEdicao ? 'Atualizar' : 'Criar'"
    cancel-text="Cancelar"
    :loading="loading"
    :disabled="!isFormValid"
    @confirm="handleConfirm"
    @close="handleClose"
  >
    <!-- Formulário -->
    <form @submit.prevent="handleConfirm" class="space-y-4">
      <div>
        <BaseInput
          v-model="form.nome"
          label="Nome da Especialidade"
          placeholder="Digite o nome da especialidade"
          required
          :error="errors.nome"
        />
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import type { Especialidade } from '../../shared/types/database'

interface Props {
  modelValue: boolean
  isEdicao?: boolean
  especialidadeId?: number | null
}

const props = withDefaults(defineProps<Props>(), {
  isEdicao: false,
  especialidadeId: null
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  success: []
}>()

// Composable para ações de especialidades
const { inserirEspecialidade } = useProfissionais()

// Estados reativos
const loading = ref(false)
const form = ref({
  nome: ''
})
const errors = ref({
  nome: ''
})

// Computed
const modalVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const isFormValid = computed(() => {
  return form.value.nome.trim().length > 0
})

// Métodos
const resetForm = () => {
  form.value = {
    nome: ''
  }
  errors.value = {
    nome: ''
  }
}

const validateForm = () => {
  errors.value.nome = ''
  
  if (!form.value.nome.trim()) {
    errors.value.nome = 'Nome da especialidade é obrigatório'
    return false
  }
  
  if (form.value.nome.trim().length < 2) {
    errors.value.nome = 'Nome deve ter pelo menos 2 caracteres'
    return false
  }
  
  return true
}

const handleConfirm = async () => {
  if (!validateForm()) {
    return
  }
  
  loading.value = true
  
  try {
    if (props.isEdicao) {
      // TODO: Implementar edição
      console.log('Editando especialidade:', {
        id: props.especialidadeId,
        nome: form.value.nome.trim()
      })
    } else {
      // Inserir nova especialidade
      const response = await inserirEspecialidade(form.value.nome.trim())
      
      if (response.success) {
        console.log('Especialidade criada:', response.message)
        emit('success')
        handleClose()
      } else {
        errors.value.nome = response.message
      }
    }
  } catch (error) {
    console.error('Erro ao salvar especialidade:', error)
    errors.value.nome = 'Erro ao salvar especialidade. Tente novamente.'
  } finally {
    loading.value = false
  }
}

const handleClose = () => {
  resetForm()
  modalVisible.value = false
}

// Carregar dados para edição
const loadEspecialidade = async () => {
  if (!props.isEdicao || !props.especialidadeId) {
    return
  }
  
  loading.value = true
  
  try {
    // TODO: Implementar busca da especialidade por ID
    console.log('Carregando especialidade ID:', props.especialidadeId)
    
    // Simular carregamento
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Dados simulados - substituir pela busca real
    form.value.nome = 'Especialidade de exemplo'
  } catch (error) {
    console.error('Erro ao carregar especialidade:', error)
  } finally {
    loading.value = false
  }
}

// Watchers
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      resetForm()
      if (props.isEdicao && props.especialidadeId) {
        loadEspecialidade()
      }
    }
  }
)
</script>