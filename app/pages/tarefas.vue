<template>
  <NuxtLayout>
    <!-- Header com título -->
    <div class="px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">Tarefas</h1>
          <p class="text-slate-600 mt-1">Organize suas tarefas com metodologia Kanban</p>
        </div>
        <BaseButton
          variant="primary"
          size="md"
          @click="abrirModalNovaTarefa"
        >
          <template #icon-left>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </template>
          Nova Tarefa
        </BaseButton>
      </div>
    </div>
    
    <!-- Área de conteúdo - Kanban Board -->
    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Coluna 1: A Fazer -->
        <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-bold text-slate-800 flex items-center gap-2">
              A Fazer
              <span class="bg-slate-200 text-slate-700 text-xs font-semibold px-2 py-1 rounded-full">2</span>
            </h2>
          </div>

          <!-- Cards de Tarefa -->
          <div class="space-y-3">
            <!-- Tarefa 1 -->
            <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div class="flex items-start justify-between mb-2">
                <h3 class="font-semibold text-slate-800 text-sm">Elaborar petição inicial</h3>
                <button class="text-slate-400 hover:text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                  </svg>
                </button>
              </div>
              <p class="text-sm text-slate-600 mb-3">João Silva</p>
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">Alta</span>
                <span class="text-xs text-slate-500">15/10/2025</span>
              </div>
            </div>

            <!-- Tarefa 2 -->
            <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div class="flex items-start justify-between mb-2">
                <h3 class="font-semibold text-slate-800 text-sm">Revisar contrato</h3>
                <button class="text-slate-400 hover:text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                  </svg>
                </button>
              </div>
              <p class="text-sm text-slate-600 mb-3">Tech Solutions</p>
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 text-xs font-semibold rounded-full" style="background-color: #fff4e6; color: #f8af18;">Média</span>
                <span class="text-xs text-slate-500">18/10/2025</span>
              </div>
            </div>
          </div>

          <!-- Botão Adicionar Tarefa -->
          <button class="w-full mt-4 py-3 text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-800 rounded-xl transition-colors flex items-center justify-center gap-2 border border-dashed border-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Adicionar tarefa
          </button>
        </div>

        <!-- Coluna 2: Em Andamento -->
        <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-bold text-slate-800 flex items-center gap-2">
              Em Andamento
              <span class="bg-slate-200 text-slate-700 text-xs font-semibold px-2 py-1 rounded-full">1</span>
            </h2>
          </div>

          <!-- Cards de Tarefa -->
          <div class="space-y-3">
            <!-- Tarefa 1 -->
            <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div class="flex items-start justify-between mb-2">
                <h3 class="font-semibold text-slate-800 text-sm">Preparar contestação</h3>
                <button class="text-slate-400 hover:text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                  </svg>
                </button>
              </div>
              <p class="text-sm text-slate-600 mb-3">Maria Santos</p>
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">Alta</span>
                <span class="text-xs text-slate-500">16/10/2025</span>
              </div>
            </div>
          </div>

          <!-- Botão Adicionar Tarefa -->
          <button class="w-full mt-4 py-3 text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-800 rounded-xl transition-colors flex items-center justify-center gap-2 border border-dashed border-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Adicionar tarefa
          </button>
        </div>

        <!-- Coluna 3: Aguardando -->
        <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-bold text-slate-800 flex items-center gap-2">
              Aguardando
              <span class="bg-slate-200 text-slate-700 text-xs font-semibold px-2 py-1 rounded-full">1</span>
            </h2>
          </div>

          <!-- Cards de Tarefa -->
          <div class="space-y-3">
            <!-- Tarefa 1 -->
            <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div class="flex items-start justify-between mb-2">
                <h3 class="font-semibold text-slate-800 text-sm">Aguardar documentos</h3>
                <button class="text-slate-400 hover:text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                  </svg>
                </button>
              </div>
              <p class="text-sm text-slate-600 mb-3">Carlos Oliveira</p>
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">Baixa</span>
                <span class="text-xs text-slate-500">20/10/2025</span>
              </div>
            </div>
          </div>

          <!-- Botão Adicionar Tarefa -->
          <button class="w-full mt-4 py-3 text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-800 rounded-xl transition-colors flex items-center justify-center gap-2 border border-dashed border-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Adicionar tarefa
          </button>
        </div>

        <!-- Coluna 4: Concluído -->
        <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-bold text-slate-800 flex items-center gap-2">
              Concluído
              <span class="bg-slate-200 text-slate-700 text-xs font-semibold px-2 py-1 rounded-full">1</span>
            </h2>
          </div>

          <!-- Cards de Tarefa -->
          <div class="space-y-3">
            <!-- Tarefa 1 -->
            <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow opacity-75">
              <div class="flex items-start justify-between mb-2">
                <h3 class="font-semibold text-slate-800 text-sm line-through">Protocolar recurso</h3>
                <button class="text-slate-400 hover:text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                  </svg>
                </button>
              </div>
              <p class="text-sm text-slate-600 mb-3">Ana Costa</p>
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 text-xs font-semibold rounded-full" style="background-color: #fff4e6; color: #f8af18;">Média</span>
                <span class="text-xs text-slate-500">12/10/2025</span>
              </div>
            </div>
          </div>

          <!-- Botão Adicionar Tarefa -->
          <button class="w-full mt-4 py-3 text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-800 rounded-xl transition-colors flex items-center justify-center gap-2 border border-dashed border-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Adicionar tarefa
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import BaseButton from '../components/BaseButton.vue'

// Função para abrir modal de nova tarefa
const abrirModalNovaTarefa = () => {
  // Implementar modal futuramente
  console.log('Abrir modal de nova tarefa')
}

// Configuração da página
useHead({
  title: 'Tarefas - Paulo Advogado',
  meta: [
    { name: 'description', content: 'Gerenciamento de tarefas com metodologia Kanban' }
  ]
})
</script>
