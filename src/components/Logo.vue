<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex items-center">
    <div class="flex flex-col items-end">
      <div class="text-h3 font-bold logo-text">
        Aidia
      </div>
      <div class="text-body-s font-medium mt-1 logo-text">
        Problem Solving with AI
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: 'small' | 'medium' | 'large'
}

withDefaults(defineProps<Props>(), {
  size: 'medium'
})
</script>

<style scoped>
.logo-text {
  transition: color 0.3s ease;
}
</style>
