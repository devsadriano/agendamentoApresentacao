import type { Agendamento } from '../../shared/types/database'

// Cache global de agendamentos por profissional e período
type CacheKey = string // formato: "profissional_id:YYYY-MM-DD:YYYY-MM-DD"
const cacheAgendamentos = new Map<CacheKey, Agendamento[]>()

export const useAgendamento = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Gera chave de cache baseada no profissional e período
   */
  const gerarChaveCache = (profissionalId: number, dataInicio: string, dataFim: string): CacheKey => {
    return `${profissionalId}:${dataInicio}:${dataFim}`
  }

  /**
   * Busca agendamentos por profissional em um período específico
   * Filtra apenas agendamentos não cancelados (cancelado = false)
   * Implementa cache para evitar requisições desnecessárias
   * @param profissionalId - ID do profissional
   * @param dataInicio - Data de início no formato YYYY-MM-DD
   * @param dataFim - Data de fim no formato YYYY-MM-DD
   * @returns Lista de agendamentos do profissional no período
   */
  const buscarAgendamentosPorProfissionalEPeriodo = async (
    profissionalId: number, 
    dataInicio: string, 
    dataFim: string
  ): Promise<Agendamento[]> => {
    // Verificar cache primeiro
    const chaveCache = gerarChaveCache(profissionalId, dataInicio, dataFim)
    if (cacheAgendamentos.has(chaveCache)) {
      console.log('📦 Cache hit:', chaveCache)
      return cacheAgendamentos.get(chaveCache)!
    }

    loading.value = true
    error.value = null

    try {
      const supabase = useSupabaseClient()
      
      const { data, error: fetchError } = await supabase
        .from('ag_agendamentos')
        .select('*')
        .eq('profissional_id', profissionalId)
        .eq('cancelado', false)
        .gte('data', dataInicio) // maior ou igual à data de início
        .lte('data', dataFim)    // menor ou igual à data de fim
        .order('data', { ascending: true })
        .order('hora_inicio', { ascending: true })

      if (fetchError) {
        throw fetchError
      }

      const agendamentos = data || []
      
      // Armazenar no cache
      cacheAgendamentos.set(chaveCache, agendamentos)
      console.log('💾 Cache armazenado:', chaveCache, `${agendamentos.length} agendamentos`)

      return agendamentos
    } catch (err: any) {
      error.value = err.message || 'Erro ao buscar agendamentos'
      console.error('Erro ao buscar agendamentos:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  /**
   * Função legada - mantida para compatibilidade
   * @deprecated Use buscarAgendamentosPorProfissionalEPeriodo
   */
  const buscarAgendamentosPorProfissional = async (profissionalId: number): Promise<Agendamento[]> => {
    loading.value = true
    error.value = null

    try {
      const supabase = useSupabaseClient()
      
      const { data, error: fetchError } = await supabase
        .from('ag_agendamentos')
        .select('*')
        .eq('profissional_id', profissionalId)
        .eq('cancelado', false)
        .order('data', { ascending: true })
        .order('hora_inicio', { ascending: true })

      if (fetchError) {
        throw fetchError
      }

      return data || []
    } catch (err: any) {
      error.value = err.message || 'Erro ao buscar agendamentos'
      console.error('Erro ao buscar agendamentos:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  /**
   * Limpa o cache de um profissional específico
   */
  const limparCacheProfissional = (profissionalId: number) => {
    const chavesParaRemover = Array.from(cacheAgendamentos.keys())
      .filter(chave => chave.startsWith(`${profissionalId}:`))
    
    chavesParaRemover.forEach(chave => {
      cacheAgendamentos.delete(chave)
    })
    
    console.log('🗑️ Cache limpo para profissional:', profissionalId)
  }

  /**
   * Limpa todo o cache
   */
  const limparTodoCache = () => {
    cacheAgendamentos.clear()
    console.log('🗑️ Todo cache limpo')
  }

  return {
    loading: readonly(loading),
    error: readonly(error),
    buscarAgendamentosPorProfissionalEPeriodo,
    buscarAgendamentosPorProfissional, // mantido para compatibilidade
    limparCacheProfissional,
    limparTodoCache
  }
}