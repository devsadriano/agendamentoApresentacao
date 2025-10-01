<template>
  <div class="min-h-screen bg-neutral-50 flex">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Main Content -->
    <main class="flex-1 ml-64 overflow-y-auto">
      <div class="p-6">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Layout com sidebar fixa - ajustado para funcionar com o componente Sidebar
</script>