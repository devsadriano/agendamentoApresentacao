<template>
  <div 
    class="relative cursor-pointer group min-w-[320px] max-w-[380px]"
    @click="abrirModalSelecao"
    title="Clique para trocar de advogado"
  >
    <!-- Card com gradiente e sombra - mais compacto -->
  <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-4 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
      
      <!-- Efeito de brilho no hover -->
      <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <!-- Ícone decorativo no canto - menor -->
      <div class="absolute -right-2 -top-2 w-16 h-16 bg-amber-400/10 rounded-full blur-xl"></div>
      
      <!-- Skeleton Loading -->
      <div v-if="loading" class="relative z-10 space-y-2 animate-pulse">
        <div class="h-6 bg-slate-600/50 rounded w-3/4 mx-auto"></div>
        <div class="h-4 bg-slate-600/30 rounded w-1/2 mx-auto"></div>
        <div class="flex items-center justify-center gap-2 mt-2">
          <div class="h-3 w-3 bg-amber-400/50 rounded-full"></div>
          <div class="h-3 bg-slate-600/30 rounded w-24"></div>
        </div>
      </div>
      
      <!-- Profissional carregado -->
      <div v-else-if="profissionalAtivo" class="relative z-10 flex items-center gap-3">
        <!-- Ícone de usuário - menor e à esquerda -->
        <div class="flex-shrink-0">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-slate-900">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
        </div>
        
        <!-- Informações do advogado -->
        <div class="flex-1 min-w-0">
          <!-- Nome do advogado -->
          <h3 class="text-lg font-bold text-white tracking-wide truncate">
            {{ profissionalAtivo.nome_profissional }}
          </h3>
          
          <!-- Especialidade com badge - mais compacta -->
          <div class="inline-flex items-center gap-1.5 mt-1 px-2.5 py-1 bg-slate-700/50 rounded-full border border-amber-400/20">
            <div class="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></div>
            <p class="text-xs font-medium text-amber-100 truncate">
              {{ profissionalAtivo.especialidade_profissional }}
            </p>
          </div>
          
          <!-- Indicador de ação - mais discreto -->
          <div class="flex items-center gap-1.5 mt-2 text-amber-400 opacity-70 group-hover:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
            <span class="text-xs font-medium uppercase tracking-wide">Trocar</span>
          </div>
        </div>
      </div>
      
      <!-- Sem profissional -->
      <div v-else class="relative z-10 flex items-center gap-3 py-2">
        <div class="w-12 h-12 flex-shrink-0 rounded-full bg-slate-700/50 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-slate-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-white font-medium text-sm">Nenhum advogado</p>
          <p class="text-xs text-amber-400 uppercase tracking-wide mt-1">
            Clique para selecionar
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProfissionalAtivo } from '../../composables/useProfissionalAtivo'

// Emits
const emit = defineEmits<{
  'abrir-selecao': []
}>()

// Usar o composable compartilhado do profissional ativo
const { profissionalAtivo, loading, error } = useProfissionalAtivo()

// Métodos
const abrirModalSelecao = () => {
  emit('abrir-selecao')
}
</script>