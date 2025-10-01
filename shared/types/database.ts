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

// Tipos para as actions do store
export interface UserActions {
  fetchProfile(): Promise<void>
  updateProfile(data: Partial<UserProfile>): Promise<void>
  clearProfile(): void
}