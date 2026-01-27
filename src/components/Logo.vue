<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Transition appear @before-enter="onBeforeEnter" @enter="onEnter">
    <div class="flex items-center">
      <div class="flex flex-col items-end">
        <div class="text-h3 font-bold">
          Aidia
        </div>
        <div class="text-body-s font-medium mt-1">
          Problem Solving with AI
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  size?: 'small' | 'medium' | 'large'
}

withDefaults(defineProps<Props>(), {
  size: 'medium'
})

function onBeforeEnter(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.opacity = '0'
  htmlEl.style.transform = 'translateX(20px)'
}

function onEnter(el: Element, done: () => void) {
  const htmlEl = el as HTMLElement
  void htmlEl.offsetHeight
  htmlEl.style.transition = 'all 0.6s ease 0.2s'
  htmlEl.style.opacity = '1'
  htmlEl.style.transform = 'translateX(0)'
  done()
}
</script>
