<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Card Principal -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Recuperar Senha</h1>
          <p class="text-gray-600">Crie uma nova senha para sua conta</p>
        </div>

        <!-- Componente de Alteração de Senha -->
        <ChangePassword />

        <!-- Divisor -->
        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">ou</span>
          </div>
        </div>

        <!-- Link para Login -->
        <div class="text-center">
          <NuxtLink
            to="/login"
            class="inline-block py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            Voltar para Login
          </NuxtLink>
        </div>
      </div>

      <!-- Mensagem de Segurança -->
      <div class="mt-6 text-center text-sm text-gray-600">
        <p>🔒 Sua senha será atualizada com segurança</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChangePassword from '~/components/ChangePassword.vue'

// Página de recuperação de senha - Integra o componente ChangePassword
</script>