<template>
  <BaseModal
    v-model="showModal"
    title="Novo Agendamento"
    confirm-text="Salvar"
    cancel-text="Cancelar"
    :loading="loading"
    @confirm="salvarAgendamento"
    @close="fecharModal"
  >
    <div class="space-y-6">
      <!-- Profissional (somente leitura) -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Profissional
        </label>
        <div class="flex items-center p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-sm font-medium text-blue-600">
                  {{ profissionalAtivo?.nome_profissional?.charAt(0).toUpperCase() }}
                </span>
              </div>
            </div>
            <div>
              <div class="text-sm font-medium text-gray-900">
                {{ profissionalAtivo?.nome_profissional }}
              </div>
              <div class="text-xs text-gray-500">
                {{ profissionalAtivo?.especialidade_profissional }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cliente -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Cliente <span class="text-red-500">*</span>
        </label>
        <select 
          v-model="form.clienteId"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="">Selecione um cliente</option>
          <option value="1">João Silva</option>
          <option value="2">Maria Santos</option>
          <option value="3">Pedro Oliveira</option>
        </select>
        <p class="mt-1 text-xs text-gray-500">
          Não encontrou o cliente? 
          <button type="button" class="text-blue-600 hover:text-blue-800 underline">
            Cadastrar novo cliente
          </button>
        </p>
      </div>

      <!-- Título -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Título <span class="text-red-500">*</span>
        </label>
        <BaseInput
          v-model="form.titulo"
          placeholder="Ex: Consulta de rotina"
          required
        />
      </div>

      <!-- Descrição -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Descrição
        </label>
        <textarea
          v-model="form.descricao"
          placeholder="Detalhes do agendamento (opcional)"
          rows="3"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        ></textarea>
      </div>

      <!-- Data -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Data <span class="text-red-500">*</span>
        </label>
        <select 
          v-model="form.data"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          @change="onDataChange"
        >
          <option value="">Selecione uma data</option>
          <option 
            v-for="dia in diasSemana" 
            :key="dia.data.toISOString()"
            :value="dia.data.toISOString().split('T')[0]"
          >
            {{ formatarDataCompleta(dia.data) }}
          </option>
        </select>
      </div>

      <!-- Horários (habilitados apenas quando data está selecionada) -->
      <div class="grid grid-cols-2 gap-4">
        <!-- Hora Início -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Hora Início <span class="text-red-500">*</span>
          </label>
          <select 
            v-model="form.horaInicio"
            :disabled="!form.data"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            required
            @change="onHoraInicioChange"
          >
            <option value="">Selecione</option>
            <option 
              v-for="hora in horariosDisponiveis" 
              :key="hora"
              :value="hora"
            >
              {{ hora }}
            </option>
          </select>
        </div>

        <!-- Hora Fim -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Hora Fim <span class="text-red-500">*</span>
          </label>
          <select 
            v-model="form.horaFim"
            :disabled="!form.horaInicio"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            required
          >
            <option value="">Selecione</option>
            <option 
              v-for="hora in horariosFimDisponiveis" 
              :key="hora"
              :value="hora"
            >
              {{ hora }}
            </option>
          </select>
        </div>
      </div>

      <!-- Aviso quando horários estão desabilitados -->
      <div v-if="!form.data" class="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-blue-700">
              Selecione uma data para habilitar os campos de horário
            </p>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '../BaseModal.vue'
import BaseInput from '../BaseInput.vue'
import type { Profissional, DiaSemana } from '../../../shared/types/database'

interface Props {
  modelValue: boolean
  profissionalAtivo: Profissional | null
  diasSemana: DiaSemana[]
}

interface FormData {
  clienteId: string
  titulo: string
  descricao: string
  data: string
  horaInicio: string
  horaFim: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'salvar': [data: FormData]
}>()

// Estado do modal
const showModal = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const loading = ref(false)

// Formulário
const form = ref<FormData>({
  clienteId: '',
  titulo: '',
  descricao: '',
  data: '',
  horaInicio: '',
  horaFim: ''
})

// Horários disponíveis (8h às 22h, de 30 em 30 minutos)
const horariosDisponiveis = computed(() => {
  const horarios = []
  for (let hora = 8; hora <= 22; hora++) {
    horarios.push(`${hora.toString().padStart(2, '0')}:00`)
    if (hora < 22) { // Não adicionar :30 para 22h
      horarios.push(`${hora.toString().padStart(2, '0')}:30`)
    }
  }
  return horarios
})

// Horários de fim disponíveis (baseado na hora de início)
const horariosFimDisponiveis = computed(() => {
  if (!form.value.horaInicio) return []
  
  const [horaInicio, minutoInicio] = form.value.horaInicio.split(':').map(Number)
  const minutosInicio = horaInicio * 60 + minutoInicio
  
  return horariosDisponiveis.value.filter(horario => {
    const [hora, minuto] = horario.split(':').map(Number)
    const minutosFim = hora * 60 + minuto
    return minutosFim > minutosInicio // Hora fim deve ser maior que hora início
  })
})

// Funções
const formatarDataCompleta = (data: Date): string => {
  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  const diaSemana = diasSemana[data.getDay()]
  const dataFormatada = data.toLocaleDateString('pt-BR')
  return `${diaSemana}, ${dataFormatada}`
}

const onDataChange = () => {
  // Limpar horários quando data mudar
  form.value.horaInicio = ''
  form.value.horaFim = ''
}

const onHoraInicioChange = () => {
  // Limpar hora fim quando hora início mudar
  form.value.horaFim = ''
}

const salvarAgendamento = () => {
  // TODO: Validações
  emit('salvar', form.value)
}

const fecharModal = () => {
  // Resetar formulário
  form.value = {
    clienteId: '',
    titulo: '',
    descricao: '',
    data: '',
    horaInicio: '',
    horaFim: ''
  }
}
</script>