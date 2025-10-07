<template>
  <div class="flex flex-col w-full relative">
    <!-- Slots de agendamento alinhados com a régua -->
    <div class="relative">
      <!-- Grid de horários base -->
      <div 
        v-for="hora in horarios" 
        :key="hora"
        class="h-24 border-b border-gray-100"
      >
      </div>
      
      <!-- Agendamentos posicionados absolutamente -->
      <SlotAgendamento 
        v-for="agendamento in agendamentosFormatados" 
        :key="agendamento.id"
        :agendamento="agendamento"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SlotAgendamento from './SlotAgendamento.vue'

// Interface temporária para os dados de teste
interface AgendamentoTeste {
  id: string
  dataInicio: Date
  dataFim: Date
  titulo: string
  descricao: string
}

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

// DADOS DE TESTE - TODO: Substituir por dados do banco
const agendamentosTeste: AgendamentoTeste[] = [
  {
    id: '1',
    dataInicio: new Date(2025, 9, 6, 8, 0), // 06/10/2025 08:00
    dataFim: new Date(2025, 9, 6, 9, 0), // 06/10/2025 09:00
    titulo: 'Reunião Equipe',
    descricao: 'Discussão de casos clínicos e planejamento semanal'
  },
  {
    id: '2',
    dataInicio: new Date(2025, 9, 6, 9, 0), // 06/10/2025 09:00
    dataFim: new Date(2025, 9, 6, 10, 0), // 06/10/2025 10:00
    titulo: 'Consulta Dr. Silva',
    descricao: 'Consulta de rotina - paciente João'
  },
  {
    id: '3',
    dataInicio: new Date(2025, 9, 7, 8, 0), // 07/10/2025 08:00
    dataFim: new Date(2025, 9, 7, 9, 0), // 07/10/2025 09:00
    titulo: 'Reunião Equipe',
    descricao: 'Discussão de caso complexo com equipe multidisciplinar'
  },
  {
    id: '4',
    dataInicio: new Date(2025, 9, 7, 10, 0), // 07/10/2025 10:00
    dataFim: new Date(2025, 9, 7, 11, 0), // 07/10/2025 11:00
    titulo: 'Consulta Dra. Lima',
    descricao: 'Retorno - Carlos Oliveira para avaliação'
  },
  {
    id: '5',
    dataInicio: new Date(2025, 9, 7, 11, 30), // 07/10/2025 11:30
    dataFim: new Date(2025, 9, 7, 13, 0), // 07/10/2025 13:00
    titulo: 'Exame Especializado',
    descricao: 'Exame especializado - preparação e execução'
  },
  {
    id: '6',
    dataInicio: new Date(2025, 9, 8, 13, 0), // 08/10/2025 13:00
    dataFim: new Date(2025, 9, 8, 14, 0), // 08/10/2025 14:00
    titulo: 'Consulta Pediatria',
    descricao: 'Acompanhamento - criança com desenvolvimento atípico'
  },
  {
    id: '7',
    dataInicio: new Date(2025, 9, 9, 9, 30), // 09/10/2025 09:30
    dataFim: new Date(2025, 9, 9, 11, 0), // 09/10/2025 11:00
    titulo: 'Cirurgia Menor',
    descricao: 'Procedimento ambulatorial - paciente Maria'
  },
  {
    id: '8',
    dataInicio: new Date(2025, 9, 9, 15, 0), // 09/10/2025 15:00
    dataFim: new Date(2025, 9, 9, 16, 0), // 09/10/2025 16:00
    titulo: 'Consulta Especializada',
    descricao: 'Cardiologia - José Santos avaliação preventiva'
  },
  {
    id: '9',
    dataInicio: new Date(2025, 9, 6, 14, 30), // 06/10/2025 14:30
    dataFim: new Date(2025, 9, 6, 15, 30), // 06/10/2025 15:30
    titulo: 'Avaliação Nutricional',
    descricao: 'Primeira consulta - paciente novo'
  },
  {
    id: '10',
    dataInicio: new Date(2025, 9, 7, 16, 0), // 07/10/2025 16:00
    dataFim: new Date(2025, 9, 7, 17, 0), // 07/10/2025 17:00
    titulo: 'Terapia',
    descricao: 'Sessão de fisioterapia - reabilitação'
  }
]

// Computed para filtrar agendamentos do dia atual
const agendamentosFormatados = computed(() => {
  const diaAtual = props.data.toDateString()
  
  return agendamentosTeste.filter(agendamento => 
    agendamento.dataInicio.toDateString() === diaAtual
  )
})
</script>