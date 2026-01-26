<template>
  <div class="absolute inset-0 overflow-hidden">
    <!-- Grid Pattern -->
    <svg class="absolute inset-0 w-full h-full opacity-5">
      <defs>
        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" stroke-width="0.5" class="text-primary-300" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>

    <!-- Animated Neural Network Nodes -->
    <svg class="absolute inset-0 w-full h-full">
      <defs>
        <radialGradient id="nodeGlow">
          <stop offset="0%" stop-color="#f8cb46" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#f8cb46" stop-opacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Connection Lines -->
      <line v-for="(line, index) in connectionLines" :key="`line-${index}`" :x1="`${line.x1}%`" :y1="`${line.y1}%`"
        :x2="`${line.x2}%`" :y2="`${line.y2}%`" stroke="rgba(248, 203, 70, 0.15)" stroke-width="1"
        class="animate-draw-line" :style="{ animationDelay: `${line.delay}s` }" />

      <!-- Nodes -->
      <g v-for="node in nodes" :key="node.id">
        <circle :cx="`${node.x}%`" :cy="`${node.y}%`" :r="node.size * 2" fill="url(#nodeGlow)"
          class="animate-pulse-node" :style="{ animationDelay: `${node.delay}s` }" />
        <circle :cx="`${node.x}%`" :cy="`${node.y}%`" :r="node.size" fill="#f8cb46" filter="url(#glow)"
          class="animate-fade-in" :style="{ animationDelay: `${node.delay}s` }" />
      </g>
    </svg>

    <!-- Floating Geometric Shapes -->
    <div class="absolute inset-0">
      <div v-for="(shape, i) in shapes" :key="`shape-${i}`" class="absolute animate-float" :style="{
        left: `${10 + (i % 4) * 25}%`,
        top: `${15 + Math.floor(i / 4) * 40}%`,
        animationDelay: `${i * 0.5}s`,
        animationDuration: `${8 + i * 2}s`
      }">
        <div v-if="i % 3 === 0" class="w-24 h-24 border-2 border-secondary-300/20 rotate-45" />
        <svg v-else-if="i % 3 === 1" width="96" height="96" viewBox="0 0 96 96">
          <polygon points="48,8 88,88 8,88" fill="none" stroke="rgba(248, 203, 70, 0.2)" stroke-width="2" />
        </svg>
        <div v-else class="w-20 h-20 rounded-full border-2 border-neutral-200/20" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Node {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

// Generate neural network nodes
const nodes = computed<Node[]>(() =>
  Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 3
  }))
)

const connectionLines = computed(() => {
  const lines: Array<{ x1: number; y1: number; x2: number; y2: number; delay: number }> = []
  const nodeArray = nodes.value

  nodeArray.forEach((node, i) => {
    nodeArray.slice(i + 1).forEach((otherNode) => {
      const distance = Math.sqrt(
        Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
      )
      if (distance < 20) {
        lines.push({
          x1: node.x,
          y1: node.y,
          x2: otherNode.x,
          y2: otherNode.y,
          delay: node.delay + 0.5
        })
      }
    })
  })

  return lines
})

const shapes = Array.from({ length: 8 })
</script>

<style scoped>
@keyframes draw-line {
  from {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    opacity: 0;
  }

  to {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
    opacity: 0.3;
  }
}

@keyframes pulse-node {

  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }

  50% {
    opacity: 0.3;
    transform: scale(1.2);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.1;
  }

  50% {
    transform: translateY(-30px) rotate(180deg);
    opacity: 0.3;
  }
}

.animate-draw-line {
  animation: draw-line 2s ease-in-out forwards;
}

.animate-pulse-node {
  animation: pulse-node 1.5s ease-in-out infinite;
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}
</style>
