import type { LoginCredentials, AuthError, AuthResult } from '../../shared/types'

export const useAuth = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const { showSuccess, showError } = useNotification()
  
  // Estado de loading para operações de autenticação
  const isLoading = ref(false)
  
  /**
   * Realiza o login do usuário
   */
  const login = async (credentials: LoginCredentials): Promise<AuthResult> => {
    try {
      isLoading.value = true
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })
      
      if (error) {
        const authError: AuthError = {
          message: error.message,
          code: error.message
        }
        
        // Exibe toast de erro
        showError('Erro ao fazer login: ' + error.message)
        
        return { success: false, error: authError }
      }
      
      if (data.user) {
        // Toast de sucesso
        showSuccess('Login realizado com sucesso!')
        
        // Redireciona para a página inicial
        await navigateTo('/')
        
        return { success: true }
      }
      
      return { success: false, error: { message: 'Erro desconhecido' } }
      
    } catch (error) {
      const authError: AuthError = {
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      }
      
      showError('Erro inesperado durante o login')
      
      return { success: false, error: authError }
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * Realiza o logout do usuário
   */
  const logout = async (): Promise<AuthResult> => {
    try {
      isLoading.value = true
      
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        const authError: AuthError = {
          message: error.message,
          code: error.message
        }
        
        showError('Erro ao fazer logout: ' + error.message)
        
        return { success: false, error: authError }
      }
      
      // Toast de sucesso
      showSuccess('Logout realizado com sucesso!')
      
      // Redireciona para a página de login
      await navigateTo('/login')
      
      return { success: true }
      
    } catch (error) {
      const authError: AuthError = {
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      }
      
      showError('Erro inesperado durante o logout')
      
      return { success: false, error: authError }
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * Verifica se o usuário está autenticado
   */
  const isAuthenticated = computed(() => !!user.value)
  
  /**
   * Dados do usuário atual
   */
  const currentUser = computed(() => user.value)
  
  return {
    // Estados
    isLoading: readonly(isLoading),
    isAuthenticated,
    currentUser,
    
    // Ações
    login,
    logout,
  }
}