<template>
  <NuxtLayout>
    <!-- Header com título -->
    <div class="px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">Processos</h1>
          <p class="text-slate-600 mt-1">Acompanhe todos os processos em andamento</p>
        </div>
        <BaseButton
          variant="primary"
          size="md"
          @click="abrirModalNovoProcesso"
        >
          <template #icon-left>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </template>
          Novo Processo
        </BaseButton>
      </div>
    </div>
    
    <!-- Área de conteúdo -->
    <div class="p-6">
      <!-- Barra de Busca e Filtros -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
        <div class="flex items-center gap-4">
          <!-- Campo de Busca -->
          <div class="flex-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-slate-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Buscar por número, cliente, tribunal..."
              class="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
            />
          </div>

          <!-- Botão de Filtros -->
          <button class="px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-slate-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
            </svg>
            <span class="font-medium text-slate-700">Filtros</span>
          </button>
        </div>
      </div>

      <!-- Lista de Processos -->
      <div class="space-y-4">
        <!-- Processo 1 -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between">
            <div class="flex items-start gap-4 flex-1">
              <!-- Ícone -->
              <div class="p-3 rounded-xl bg-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-slate-600">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>

              <!-- Informações -->
              <div class="flex-1">
                <div class="flex items-start gap-3 mb-2">
                  <h3 class="text-lg font-bold text-slate-800">1234567-89.2024.8.26.0100</h3>
                  <span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">Alta</span>
                </div>
                <p class="text-slate-700 font-medium mb-2">Ação de Cobrança - João Silva</p>
                <div class="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <span class="flex items-center gap-1">
                    <span class="font-medium">Tribunal:</span> 1ª Vara Cível
                  </span>
                  <span class="flex items-center gap-1">
                    <span class="font-medium">Status:</span> Em Andamento
                  </span>
                  <span class="flex items-center gap-1">
                    <span class="font-medium">Última atualização:</span> 10/10/2025
                  </span>
                </div>
              </div>
            </div>

            <!-- Botão Ver Detalhes -->
            <button class="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
              Ver Detalhes
            </button>
          </div>
        </div>

        <!-- Processo 2 -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between">
            <div class="flex items-start gap-4 flex-1">
              <!-- Ícone -->
              <div class="p-3 rounded-xl bg-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-slate-600">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>

              <!-- Informações -->
              <div class="flex-1">
                <div class="flex items-start gap-3 mb-2">
                  <h3 class="text-lg font-bold text-slate-800">9876543-21.2024.8.26.0200</h3>
                  <span class="px-3 py-1 text-xs font-semibold rounded-full" style="background-color: #fff4e6; color: #f8af18;">Média</span>
                </div>
                <p class="text-slate-700 font-medium mb-2">Ação Trabalhista - Maria Santos</p>
                <div class="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <span class="flex items-center gap-1">
                    <span class="font-medium">Tribunal:</span> TRT 2ª Região
                  </span>
                  <span class="flex items-center gap-1">
                    <span class="font-medium">Status:</span> Aguardando Julgamento
                  </span>
                  <span class="flex items-center gap-1">
                    <span class="font-medium">Última atualização:</span> 08/10/2025
                  </span>
                </div>
              </div>
            </div>

            <!-- Botão Ver Detalhes -->
            <button class="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
              Ver Detalhes
            </button>
          </div>
        </div>

        <!-- Processo 3 -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between">
            <div class="flex items-start gap-4 flex-1">
              <!-- Ícone -->
              <div class="p-3 rounded-xl bg-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-slate-600">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>

              <!-- Informações -->
              <div class="flex-1">
                <div class="flex items-start gap-3 mb-2">
                  <h3 class="text-lg font-bold text-slate-800">5555555-55.2024.8.26.0300</h3>
                  <span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">Baixa</span>
                </div>
                <p class="text-slate-700 font-medium mb-2">Ação Cível - Tech Solutions Ltda</p>
                <div class="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <span class="flex items-center gap-1">
                    <span class="font-medium">Tribunal:</span> 2ª Vara Cível
                  </span>
                  <span class="flex items-center gap-1">
                    <span class="font-medium">Status:</span> Citação
                  </span>
                  <span class="flex items-center gap-1">
                    <span class="font-medium">Última atualização:</span> 05/10/2025
                  </span>
                </div>
              </div>
            </div>

            <!-- Botão Ver Detalhes -->
            <button class="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
              Ver Detalhes
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import BaseButton from '../components/BaseButton.vue'

// Função para abrir modal de novo processo
const abrirModalNovoProcesso = () => {
  // Implementar modal futuramente
  console.log('Abrir modal de novo processo')
}

// Configuração da página
useHead({
  title: 'Processos - Paulo Advogado',
  meta: [
    { name: 'description', content: 'Gerenciamento de processos jurídicos' }
  ]
})
</script>
