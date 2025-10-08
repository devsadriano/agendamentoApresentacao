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
        
        <!-- Dropdown pesquisável -->
        <div class="relative">
          <input
            v-model="pesquisaCliente"
            type="text"
            placeholder="Digite para pesquisar ou selecionar cliente..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            @focus="mostrarDropdownClientes = true"
            @blur="ocultarDropdownComDelay"
          />
          
          <!-- Loading indicator -->
          <div v-if="carregandoClientes" class="absolute right-3 top-3">
            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          </div>
          
          <!-- Dropdown lista de clientes -->
          <div 
            v-if="mostrarDropdownClientes && clientesFiltrados.length > 0"
            class="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            <button
              v-for="cliente in clientesFiltrados"
              :key="cliente.id"
              type="button"
              class="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 border-b border-gray-100 last:border-b-0"
              @mousedown.prevent="selecionarCliente(cliente)"
            >
              <div class="text-sm font-medium text-gray-900">{{ cliente.nome_cliente }}</div>
              <div v-if="cliente.telefone" class="text-xs text-gray-500">{{ cliente.telefone }}</div>
            </button>
          </div>
          
          <!-- Mensagem quando não há clientes -->
          <div 
            v-else-if="mostrarDropdownClientes && !carregandoClientes && clientes.length === 0"
            class="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-3"
          >
            <div class="text-sm text-gray-500 text-center">Nenhum cliente encontrado</div>
          </div>
        </div>
        
        <p class="mt-1 text-xs text-gray-500">
          Não encontrou o cliente? 
          <NuxtLink to="/clientes" class="text-blue-600 hover:text-blue-800 underline">
            Cadastrar novo cliente
          </NuxtLink>
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
import type { Profissional, DiaSemana, Cliente } from '../../../shared/types/database'

interface Props {
  modelValue: boolean
  profissionalAtivo: Profissional | null
  diasSemana: DiaSemana[]
  clientes: Cliente[]
  carregandoClientes?: boolean
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

// Estado do dropdown de clientes
const pesquisaCliente = ref('')
const mostrarDropdownClientes = ref(false)
const clienteSelecionado = ref<Cliente | null>(null)

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
  
  const horarioInicioPartes = form.value.horaInicio.split(':').map(Number)
  if (horarioInicioPartes.length !== 2) return []
  
  const [horaInicio, minutoInicio] = horarioInicioPartes
  if (horaInicio === undefined || minutoInicio === undefined) return []
  
  const minutosInicio = horaInicio * 60 + minutoInicio
  
  return horariosDisponiveis.value.filter(horario => {
    const horarioFimPartes = horario.split(':').map(Number)
    if (horarioFimPartes.length !== 2) return false
    
    const [hora, minuto] = horarioFimPartes
    if (hora === undefined || minuto === undefined) return false
    
    const minutosFim = hora * 60 + minuto
    return minutosFim > minutosInicio // Hora fim deve ser maior que hora início
  })
})

// Computed para filtrar clientes baseado na pesquisa
const clientesFiltrados = computed(() => {
  if (!pesquisaCliente.value.trim()) {
    return props.clientes.slice(0, 10) // Mostrar apenas 10 primeiros se não há pesquisa
  }
  
  const termo = pesquisaCliente.value.toLowerCase()
  return props.clientes.filter(cliente => 
    cliente.nome_cliente?.toLowerCase().includes(termo) ||
    (cliente.telefone && cliente.telefone.includes(termo))
  ).slice(0, 10) // Limitar a 10 resultados
})

// Funções para dropdown de clientes
const selecionarCliente = (cliente: Cliente) => {
  clienteSelecionado.value = cliente
  form.value.clienteId = cliente.id.toString()
  pesquisaCliente.value = cliente.nome_cliente || ''
  mostrarDropdownClientes.value = false
}

const ocultarDropdownComDelay = () => {
  // Delay para permitir clique nos itens do dropdown
  setTimeout(() => {
    mostrarDropdownClientes.value = false
  }, 200)
}

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
  
  // Resetar estado do dropdown de clientes
  pesquisaCliente.value = ''
  clienteSelecionado.value = null
  mostrarDropdownClientes.value = false
}
</script>