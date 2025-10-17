<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Card Principal -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Esqueci a Senha</h1>
          <p class="text-gray-600">Digite seu email e enviaremos um link para resetar sua senha</p>
        </div>

        <!-- Formulário -->
        <form class="space-y-6">
          <!-- Campo Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <BaseInput
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              required
            />
            <p class="text-xs text-gray-500 mt-1">
              Enviaremos um link de recuperação para este email
            </p>
          </div>

          <!-- Botão de Envio -->
          <div>
            <BaseButton
              variant="primary"
              size="lg"
              class="w-full"
              type="submit"
            >
              Enviar Email de Recuperação
            </BaseButton>
          </div>
        </form>

        <!-- Divisor -->
        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">ou</span>
          </div>
        </div>

        <!-- Links de Ação -->
        <div class="space-y-3">
          <!-- Link para Login -->
          <NuxtLink
            to="/login"
            class="block w-full text-center py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            Voltar para Login
          </NuxtLink>

          <!-- Link para Criar Conta -->
          <div class="text-center">
            <span class="text-gray-600">Não tem uma conta? </span>
            <NuxtLink
              to="/login"
              class="text-blue-600 hover:text-blue-700 font-medium"
            >
              Criar uma agora
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Mensagem Informativa -->
      <div class="mt-6 text-center text-sm text-gray-600">
        <p>💡 Verifique também sua pasta de spam</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Página de recuperação de senha - UI apenas
// Nenhuma lógica implementada ainda
</script>