import type { Profissional } from '../../shared/types/database'
import { useProfissionais } from './useProfissionais'

// Estado global do profissional ativo
const profissionalAtivo = ref<Profissional | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

export const useProfissionalAtivo = () => {
  const userStore = useUserStore()
  const { buscarProfissionais } = useProfissionais()

  /**
   * Carrega e define o profissional ativo
   * Prioriza o profissional associado ao usuário logado
   */
  const carregarProfissionalAtivo = async () => {
    loading.value = true
    error.value = null

    try {
      const profissionais = await buscarProfissionais()
      
      if (profissionais.length === 0) {
        profissionalAtivo.value = null
        return
      }

      // Se o usuário está logado, buscar pelo profile_id
      if (userStore.userProfile?.id) {
        const profissionalLogado = profissionais.find(
          prof => prof.profile_id === userStore.userProfile?.id
        )
        
        if (profissionalLogado) {
          profissionalAtivo.value = profissionalLogado
          return
        }
      }

      // Se não encontrou ou não está logado, usa o primeiro da lista
      profissionalAtivo.value = profissionais[0] || null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao carregar profissional ativo'
      console.error('Erro ao carregar profissional ativo:', err)
      profissionalAtivo.value = null
    } finally {
      loading.value = false
    }
  }

  /**
   * Define manualmente um profissional como ativo
   */
  const definirProfissionalAtivo = (profissional: Profissional | null) => {
    profissionalAtivo.value = profissional
  }

  return {
    profissionalAtivo: readonly(profissionalAtivo),
    loading: readonly(loading),
    error: readonly(error),
    carregarProfissionalAtivo,
    definirProfissionalAtivo
  }
}