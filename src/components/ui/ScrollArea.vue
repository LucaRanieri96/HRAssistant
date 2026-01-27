<script setup lang="ts">
defineOptions({ inheritAttrs: false })
</script>

<template>
  <div class="kiosk-scrollbar min-h-0 overflow-y-auto" v-bind="$attrs">
    <slot />
  </div>
</template>
