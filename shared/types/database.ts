// Tipos para o perfil do usuário baseado na tabela ag_profiles
export interface UserProfile {
  id: number
  created_at: string
  user_id: string | null
  nome: string | null
  role: string | null
}

// Estado do store do usuário
export interface UserState {
  profile: UserProfile | null
  loading: boolean
  error: string | null
}

// Tipos para especialidades baseado na tabela ag_especialidades
export interface Especialidade {
  id: number
  nome: string
}

// Tipos para profissionais baseado no retorno da RPC ag_get_profissionais
export interface Profissional {
  profissional_id: number
  nome_profissional: string
  especialidade_profissional: string
}

// Tipos para perfis baseado no retorno da RPC ag_get_profiles_if_admin
export interface Perfil {
  id: number
  nome: string
}

// Tipos para as actions do store
export interface UserActions {
  fetchProfile(): Promise<void>
  updateProfile(data: Partial<UserProfile>): Promise<void>
  clearProfile(): void
}