import type { Especialidade } from '../../shared/types/database'

export const useProfissionais = () => {
  const supabase = useSupabaseClient()

  // Buscar especialidades
  const buscarEspecialidades = async (): Promise<Especialidade[]> => {
    try {
      const { data, error } = await supabase
        .from('ag_especialidades')
        .select('id, nome_espec')
        .order('nome_espec')

      if (error) {
        console.error('Erro ao buscar especialidades:', error)
        throw error
      }

      // Mapear nome_espec para nome conforme o tipo
      return data?.map((item: any) => ({
        id: item.id,
        nome: item.nome_espec
      })) || []

    } catch (error) {
      console.error('Erro ao buscar especialidades:', error)
      throw error
    }
  }

  return {
    buscarEspecialidades
  }
}