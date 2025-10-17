<template>
  <NuxtLayout>
    <!-- Header com título -->
    <div class="px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">Financeiro</h1>
          <p class="text-slate-600 mt-1">Controle financeiro do escritório</p>
        </div>
        <div class="flex gap-3">
          <BaseButton
            variant="secondary"
            size="md"
          >
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </template>
            Exportar
          </BaseButton>
          <BaseButton
            variant="primary"
            size="md"
            @click="abrirModalNovaTransacao"
          >
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </template>
            Nova Transação
          </BaseButton>
        </div>
      </div>
    </div>
    
    <!-- Área de conteúdo -->
    <div class="p-6">
      <!-- Cards de Resumo Financeiro -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Card: Receitas -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div class="flex items-start justify-between mb-4">
            <div>
              <p class="text-sm text-slate-600 font-medium">Receitas do Mês</p>
            </div>
            <div class="p-3 rounded-xl bg-green-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-green-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
            </div>
          </div>
          <div>
            <p class="text-3xl font-bold text-green-600 mb-1">R$ 45.800,00</p>
            <p class="text-sm text-slate-500">12 transações</p>
            <p class="text-sm text-green-600 font-medium mt-2">+18% vs mês anterior</p>
          </div>
        </div>

        <!-- Card: Despesas -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div class="flex items-start justify-between mb-4">
            <div>
              <p class="text-sm text-slate-600 font-medium">Despesas do Mês</p>
            </div>
            <div class="p-3 rounded-xl bg-red-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-red-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
              </svg>
            </div>
          </div>
          <div>
            <p class="text-3xl font-bold text-red-600 mb-1">R$ 18.200,00</p>
            <p class="text-sm text-slate-500">8 transações</p>
            <p class="text-sm text-slate-600 font-medium mt-2">Normal para o período</p>
          </div>
        </div>

        <!-- Card: Saldo -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6" style="background: linear-gradient(135deg, #242f41 0%, #3d4d66 100%);">
          <div class="flex items-start justify-between mb-4">
            <div>
              <p class="text-sm text-white/80 font-medium">Saldo Total</p>
            </div>
            <div class="p-3 rounded-xl" style="background-color: rgba(248, 175, 24, 0.2);">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6" style="color: #f8af18;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div>
            <p class="text-3xl font-bold text-white mb-1">R$ 27.600,00</p>
            <p class="text-sm text-white/70">Disponível em conta</p>
            <p class="text-sm font-medium mt-2" style="color: #f8af18;">Situação positiva</p>
          </div>
        </div>
      </div>

      <!-- Seção de Transações e Gráfico -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Transações Recentes (2 colunas) -->
        <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-bold text-slate-800">Transações Recentes</h2>
            <div class="flex gap-2">
              <button class="px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                Todas
              </button>
              <button class="px-3 py-1.5 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
                Receitas
              </button>
              <button class="px-3 py-1.5 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
                Despesas
              </button>
            </div>
          </div>

          <div class="space-y-3">
            <!-- Transação 1 - Receita -->
            <div class="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div class="flex items-center gap-4">
                <div class="p-2.5 rounded-lg bg-green-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-green-600">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-slate-800">Honorários - Processo 123456</p>
                  <p class="text-sm text-slate-600">João Silva • 15/10/2025</p>
                </div>
              </div>
              <span class="text-lg font-bold text-green-600">+ R$ 8.500,00</span>
            </div>

            <!-- Transação 2 - Receita -->
            <div class="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div class="flex items-center gap-4">
                <div class="p-2.5 rounded-lg bg-green-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-green-600">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-slate-800">Consultoria Jurídica</p>
                  <p class="text-sm text-slate-600">Tech Solutions Ltda • 14/10/2025</p>
                </div>
              </div>
              <span class="text-lg font-bold text-green-600">+ R$ 3.200,00</span>
            </div>

            <!-- Transação 3 - Despesa -->
            <div class="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div class="flex items-center gap-4">
                <div class="p-2.5 rounded-lg bg-red-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-red-600">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-slate-800">Aluguel do Escritório</p>
                  <p class="text-sm text-slate-600">Pagamento mensal • 10/10/2025</p>
                </div>
              </div>
              <span class="text-lg font-bold text-red-600">- R$ 5.000,00</span>
            </div>

            <!-- Transação 4 - Despesa -->
            <div class="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div class="flex items-center gap-4">
                <div class="p-2.5 rounded-lg bg-red-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-red-600">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-slate-800">Software Jurídico</p>
                  <p class="text-sm text-slate-600">Assinatura mensal • 08/10/2025</p>
                </div>
              </div>
              <span class="text-lg font-bold text-red-600">- R$ 890,00</span>
            </div>

            <!-- Transação 5 - Receita -->
            <div class="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div class="flex items-center gap-4">
                <div class="p-2.5 rounded-lg bg-green-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-green-600">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-slate-800">Honorários - Processo 789012</p>
                  <p class="text-sm text-slate-600">Maria Santos • 05/10/2025</p>
                </div>
              </div>
              <span class="text-lg font-bold text-green-600">+ R$ 6.800,00</span>
            </div>
          </div>

          <!-- Botão Ver Todas -->
          <button class="w-full mt-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors border border-slate-200">
            Ver todas as transações
          </button>
        </div>

        <!-- Categorias de Despesas (1 coluna) -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 class="text-lg font-bold text-slate-800 mb-6">Categorias de Despesas</h2>
          
          <div class="space-y-4">
            <!-- Categoria 1 -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-slate-700">Aluguel</span>
                <span class="text-sm font-bold text-slate-800">R$ 5.000</span>
              </div>
              <div class="w-full bg-slate-200 rounded-full h-2">
                <div class="bg-red-500 h-2 rounded-full" style="width: 45%"></div>
              </div>
              <p class="text-xs text-slate-500 mt-1">45% do total</p>
            </div>

            <!-- Categoria 2 -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-slate-700">Pessoal</span>
                <span class="text-sm font-bold text-slate-800">R$ 3.200</span>
              </div>
              <div class="w-full bg-slate-200 rounded-full h-2">
                <div class="h-2 rounded-full" style="width: 28%; background-color: #f8af18;"></div>
              </div>
              <p class="text-xs text-slate-500 mt-1">28% do total</p>
            </div>

            <!-- Categoria 3 -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-slate-700">Software</span>
                <span class="text-sm font-bold text-slate-800">R$ 1.500</span>
              </div>
              <div class="w-full bg-slate-200 rounded-full h-2">
                <div class="h-2 rounded-full" style="width: 13%; background-color: #242f41;"></div>
              </div>
              <p class="text-xs text-slate-500 mt-1">13% do total</p>
            </div>

            <!-- Categoria 4 -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-slate-700">Marketing</span>
                <span class="text-sm font-bold text-slate-800">R$ 800</span>
              </div>
              <div class="w-full bg-slate-200 rounded-full h-2">
                <div class="bg-purple-500 h-2 rounded-full" style="width: 7%"></div>
              </div>
              <p class="text-xs text-slate-500 mt-1">7% do total</p>
            </div>

            <!-- Categoria 5 -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-slate-700">Outros</span>
                <span class="text-sm font-bold text-slate-800">R$ 700</span>
              </div>
              <div class="w-full bg-slate-200 rounded-full h-2">
                <div class="bg-slate-400 h-2 rounded-full" style="width: 7%"></div>
              </div>
              <p class="text-xs text-slate-500 mt-1">7% do total</p>
            </div>
          </div>

          <!-- Total -->
          <div class="mt-6 pt-4 border-t border-slate-200">
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold text-slate-800">Total de Despesas</span>
              <span class="text-lg font-bold text-slate-800">R$ 11.200</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import BaseButton from '../components/BaseButton.vue'

// Função para abrir modal de nova transação
const abrirModalNovaTransacao = () => {
  // Implementar modal futuramente
  console.log('Abrir modal de nova transação')
}

// Configuração da página
useHead({
  title: 'Financeiro - Paulo Advogado',
  meta: [
    { name: 'description', content: 'Controle financeiro do escritório' }
  ]
})
</script>
