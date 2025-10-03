<template>
  <BaseModal
    v-model="modalVisible"
    :title="isEdicao ? 'Editar Cliente' : 'Novo Cliente'"
    :confirm-text="isEdicao ? 'Atualizar' : 'Criar'"
    :confirm-variant="isEdicao ? 'success' : 'primary'"
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
          v-model="form.nome_cliente"
          label="Nome do Cliente"
          placeholder="Digite o nome do cliente"
          required
          :error="errors.nome_cliente"
        />
      </div>

      <div>
        <BaseInput
          v-model="form.cpf"
          label="CPF"
          placeholder="Digite o CPF"
          required
          :error="errors.cpf"
        />
      </div>

      <div>
        <BaseInput
          v-model="form.email"
          label="Email"
          type="email"
          placeholder="Digite o email"
          :error="errors.email"
        />
      </div>

      <div>
        <BaseInput
          v-model="form.telefone"
          label="Telefone"
          placeholder="Digite o telefone"
          :error="errors.telefone"
        />
      </div>

      <div>
        <BaseInput
          v-model="form.endereco"
          label="Endereço"
          placeholder="Digite o endereço"
          :error="errors.endereco"
        />
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import type { Cliente } from '../../shared/types/database'

interface Props {
  modelValue: boolean
  isEdicao?: boolean
  cliente?: Cliente | null
}

const props = withDefaults(defineProps<Props>(), {
  isEdicao: false,
  cliente: null
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  success: []
}>()

// Composable para ações de clientes
const { inserirCliente } = useProfissionais()
const { showSuccess, showError } = useNotification()

// Estados reativos
const loading = ref(false)
const form = ref({
  nome_cliente: '',
  cpf: '',
  email: '',
  telefone: '',
  endereco: ''
})
const errors = ref({
  nome_cliente: '',
  cpf: '',
  email: '',
  telefone: '',
  endereco: ''
})

// Computed
const modalVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const isFormValid = computed(() => {
  return form.value.nome_cliente.trim().length > 0 && 
         form.value.cpf.trim().length > 0
})

// Métodos
const resetForm = () => {
  form.value = {
    nome_cliente: '',
    cpf: '',
    email: '',
    telefone: '',
    endereco: ''
  }
  errors.value = {
    nome_cliente: '',
    cpf: '',
    email: '',
    telefone: '',
    endereco: ''
  }
}

const validateForm = () => {
  // Reset errors
  Object.keys(errors.value).forEach(key => {
    errors.value[key as keyof typeof errors.value] = ''
  })
  
  let isValid = true
  
  // Validar nome (obrigatório)
  if (!form.value.nome_cliente.trim()) {
    errors.value.nome_cliente = 'Nome do cliente é obrigatório'
    isValid = false
  } else if (form.value.nome_cliente.trim().length < 2) {
    errors.value.nome_cliente = 'Nome deve ter pelo menos 2 caracteres'
    isValid = false
  }
  
  // Validar CPF (obrigatório)
  if (!form.value.cpf.trim()) {
    errors.value.cpf = 'CPF é obrigatório'
    isValid = false
  } else if (form.value.cpf.trim().length < 11) {
    errors.value.cpf = 'CPF deve ter pelo menos 11 caracteres'
    isValid = false
  }
  
  // Validar email (opcional, mas se preenchido deve ser válido)
  if (form.value.email.trim() && !isValidEmail(form.value.email.trim())) {
    errors.value.email = 'Email deve ter um formato válido'
    isValid = false
  }
  
  return isValid
}

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const handleConfirm = async () => {
  if (!validateForm()) {
    return
  }
  
  loading.value = true
  
  try {
    if (props.isEdicao && props.cliente) {
      // TODO: Implementar função de editar cliente
      console.log('Editar cliente ainda não implementado')
    } else {
      // Inserir novo cliente
      await inserirCliente(
        form.value.nome_cliente.trim(),
        form.value.cpf.trim(),
        form.value.endereco.trim() || null,
        form.value.email.trim() || null,
        form.value.telefone.trim() || null
      )
      
      showSuccess('Cliente criado com sucesso!')
      emit('success')
      handleClose()
    }
  } catch (error) {
    console.error('Erro ao salvar cliente:', error)
    showError('Erro ao salvar cliente. Tente novamente.')
    errors.value.nome_cliente = 'Erro ao salvar cliente. Tente novamente.'
  } finally {
    loading.value = false
  }
}

const handleClose = () => {
  resetForm()
  modalVisible.value = false
}

// Carregar dados para edição
const loadCliente = () => {
  if (!props.isEdicao || !props.cliente) {
    return
  }
  
  // Preencher formulário com dados já disponíveis
  form.value.nome_cliente = props.cliente.nome_cliente || ''
  form.value.cpf = props.cliente.cpf || ''
  form.value.email = props.cliente.email || ''
  form.value.telefone = props.cliente.telefone || ''
  form.value.endereco = props.cliente.endereco || ''
}

// Watchers
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      resetForm()
      if (props.isEdicao && props.cliente) {
        loadCliente()
      }
    }
  }
)
</script>