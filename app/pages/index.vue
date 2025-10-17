<template>
  <NuxtLayout>
    <!-- Header com título -->
    <div class="px-6 py-4">
      <h1 class="text-2xl font-bold text-slate-800">Dashboard</h1>
      <p class="text-slate-600 mt-1">Visão geral do seu escritório</p>
    </div>
    
    <!-- Área de conteúdo -->
    <div class="p-6">
      <!-- Cards de estatísticas -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Card 1: Total de Clientes -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-4">
            <div>
              <p class="text-sm text-slate-600 font-medium">Total de Clientes</p>
            </div>
            <div class="p-3 rounded-xl" style="background-color: #e8f0fe;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6" style="color: #242f41;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
          </div>
          <div>
            <p class="text-3xl font-bold text-slate-800 mb-1">142</p>
            <p class="text-sm text-slate-500">Clientes ativos</p>
            <p class="text-sm text-green-600 font-medium mt-2">+12% vs mês anterior</p>
          </div>
        </div>

        <!-- Card 2: Processos Ativos -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-4">
            <div>
              <p class="text-sm text-slate-600 font-medium">Processos Ativos</p>
            </div>
            <div class="p-3 rounded-xl" style="background-color: #e8f0fe;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6" style="color: #242f41;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
          </div>
          <div>
            <p class="text-3xl font-bold text-slate-800 mb-1">87</p>
            <p class="text-sm text-slate-500">Em andamento</p>
            <p class="text-sm text-green-600 font-medium mt-2">+8% vs mês anterior</p>
          </div>
        </div>

        <!-- Card 3: Tarefas Pendentes -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-4">
            <div>
              <p class="text-sm text-slate-600 font-medium">Tarefas Pendentes</p>
            </div>
            <div class="p-3 rounded-xl" style="background-color: #e8f0fe;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6" style="color: #242f41;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div>
            <p class="text-3xl font-bold text-slate-800 mb-1">23</p>
            <p class="text-sm text-slate-500">Requerem atenção</p>
            <p class="text-sm text-slate-600 font-medium mt-2">Para esta semana</p>
          </div>
        </div>

        <!-- Card 4: Prazos Próximos -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-4">
            <div>
              <p class="text-sm text-slate-600 font-medium">Prazos Próximos</p>
            </div>
            <div class="p-3 rounded-xl" style="background-color: #fff4e6;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6" style="color: #f8af18;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div>
            <p class="text-3xl font-bold text-slate-800 mb-1">5</p>
            <p class="text-sm text-slate-500">Nos próximos 7 dias</p>
            <p class="text-sm text-amber-600 font-medium mt-2">Atenção necessária</p>
          </div>
        </div>
      </div>

      <!-- Seção inferior com duas colunas -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Atividades Recentes -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div class="flex items-center gap-2 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-slate-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
            <h2 class="text-lg font-bold text-slate-800">Atividades Recentes</h2>
          </div>
          <div class="space-y-4">
            <!-- Atividade 1 -->
            <div class="flex gap-3 pb-4 border-b border-slate-100">
              <div class="flex-shrink-0 w-2 h-2 rounded-full mt-2" style="background-color: #242f41;"></div>
              <div class="flex-1">
                <p class="font-semibold text-slate-800 text-sm">Novo processo cadastrado</p>
                <p class="text-sm text-slate-600">Cliente: João Silva</p>
                <p class="text-xs text-slate-400 mt-1">2h atrás</p>
              </div>
            </div>

            <!-- Atividade 2 -->
            <div class="flex gap-3 pb-4 border-b border-slate-100">
              <div class="flex-shrink-0 w-2 h-2 rounded-full mt-2" style="background-color: #242f41;"></div>
              <div class="flex-1">
                <p class="font-semibold text-slate-800 text-sm">Prazo próximo: Recurso de Apelação</p>
                <p class="text-sm text-slate-600">Proc. 123456</p>
                <p class="text-xs text-slate-400 mt-1">4h atrás</p>
              </div>
            </div>

            <!-- Atividade 3 -->
            <div class="flex gap-3 pb-4 border-b border-slate-100">
              <div class="flex-shrink-0 w-2 h-2 rounded-full mt-2" style="background-color: #242f41;"></div>
              <div class="flex-1">
                <p class="font-semibold text-slate-800 text-sm">Cliente Maria Santos atualizado</p>
                <p class="text-sm text-slate-600">Dados cadastrais</p>
                <p class="text-xs text-slate-400 mt-1">5h atrás</p>
              </div>
            </div>

            <!-- Atividade 4 -->
            <div class="flex gap-3">
              <div class="flex-shrink-0 w-2 h-2 rounded-full mt-2" style="background-color: #242f41;"></div>
              <div class="flex-1">
                <p class="font-semibold text-slate-800 text-sm">Tarefa concluída: Elaborar petição inicial</p>
                <p class="text-sm text-slate-600">Processo 789012</p>
                <p class="text-xs text-slate-400 mt-1">1d atrás</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Próximos Prazos -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div class="flex items-center gap-2 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-slate-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <h2 class="text-lg font-bold text-slate-800">Próximos Prazos</h2>
          </div>
          <div class="space-y-4">
            <!-- Prazo 1 -->
            <div class="flex items-start justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div class="flex-1">
                <p class="font-semibold text-slate-800 text-sm">Contestação - Processo 123456</p>
                <p class="text-sm text-slate-600 mt-1">15/10/2025</p>
              </div>
              <span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                2 dias
              </span>
            </div>

            <!-- Prazo 2 -->
            <div class="flex items-start justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div class="flex-1">
                <p class="font-semibold text-slate-800 text-sm">Audiência - Processo 789012</p>
                <p class="text-sm text-slate-600 mt-1">18/10/2025</p>
              </div>
              <span class="px-3 py-1 text-xs font-semibold rounded-full" style="background-color: #fff4e6; color: #f8af18;">
                5 dias
              </span>
            </div>

            <!-- Prazo 3 -->
            <div class="flex items-start justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div class="flex-1">
                <p class="font-semibold text-slate-800 text-sm">Recurso - Processo 345678</p>
                <p class="text-sm text-slate-600 mt-1">22/10/2025</p>
              </div>
              <span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                9 dias
              </span>
            </div>

            <!-- Botão Ver Todos -->
            <button class="w-full mt-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors border border-slate-200">
              Ver todos os prazos
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
// Configuração da página
useHead({
  title: 'Dashboard - Paulo Advogado',
  meta: [
    { name: 'description', content: 'Dashboard do sistema jurídico' }
  ]
})
</script>