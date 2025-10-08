import type { Agendamento } from '../../shared/types/database'

export const useAgendamento = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Busca agendamentos por profissional
   * Filtra apenas agendamentos não cancelados (cancelado = false)
   * @param profissionalId - ID do profissional
   * @returns Lista de agendamentos do profissional
   */
  const buscarAgendamentosPorProfissional = async (profissionalId: number): Promise<Agendamento[]> => {
    loading.value = true
    error.value = null

    try {
      const supabase = useSupabaseClient()
      
      console.log('🔍 Iniciando busca para profissional ID:', profissionalId)
      
      // Debug: Testar query sem filtros primeiro
      console.log('🧪 Testando query SEM filtros...')
      const { data: todosDados, error: erroTodos } = await supabase
        .from('ag_agendamentos')
        .select('*')
      
      console.log('📊 Todos os registros na tabela:', todosDados?.length || 0)
      if (erroTodos) {
        console.error('❌ Erro ao buscar todos:', erroTodos)
      }
      
      // Debug: Testar apenas filtro por profissional
      console.log('🧪 Testando query COM filtro profissional_id...')
      const { data: dadosProfissional, error: erroProfissional } = await supabase
        .from('ag_agendamentos')
        .select('*')
        .eq('profissional_id', profissionalId)
      
      console.log('📊 Registros para profissional', profissionalId + ':', dadosProfissional?.length || 0)
      if (erroProfissional) {
        console.error('❌ Erro filtro profissional:', erroProfissional)
      }
      
      // Query final com todos os filtros
      console.log('🎯 Executando query FINAL...')
      const { data, error: fetchError } = await supabase
        .from('ag_agendamentos')
        .select('*')
        .eq('profissional_id', profissionalId)
        .eq('cancelado', false)
        .order('data', { ascending: true })
        .order('hora_inicio', { ascending: true })

      console.log('✅ Resultado final:', data?.length || 0, 'registros')
      
      if (fetchError) {
        console.error('❌ Erro na query final:', fetchError)
        throw fetchError
      }

      return data || []
    } catch (err: any) {
      error.value = err.message || 'Erro ao buscar agendamentos'
      console.error('💥 Erro geral:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    loading: readonly(loading),
    error: readonly(error),
    buscarAgendamentosPorProfissional
  }
}