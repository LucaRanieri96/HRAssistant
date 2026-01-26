<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Application, Graphics } from 'pixi.js'

const canvasContainer = ref<HTMLDivElement | null>(null)
let app: Application | null = null
let nodes: Node[] = []
let linesGraphics: Graphics | null = null

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  graphics: Graphics
}

const nodeCount = 150
const connectionDistance = 100
const targetFPS = 60

const worldMultiplier = 1.8

const handleResize = () => {
  if (!app || !canvasContainer.value) return

  const width = canvasContainer.value.offsetWidth
  const height = canvasContainer.value.offsetHeight

  app.renderer.resize(width, height)
  // I nodi continuano a muoversi liberamente, non vengono riposizionati
}

onMounted(async () => {
  if (!canvasContainer.value) return

  const width = canvasContainer.value.offsetWidth
  const height = canvasContainer.value.offsetHeight

  app = new Application()
  await app.init({
    width,
    height,
    backgroundColor: 0x0a1628,
    backgroundAlpha: 0,
    antialias: true,
    resolution: Math.min(window.devicePixelRatio || 1, 2),
    autoDensity: true,
    powerPreference: 'high-performance',
    eventMode: 'passive',
  })

  canvasContainer.value.appendChild(app.canvas as HTMLCanvasElement)

  const worldWidth = width * worldMultiplier
  const worldHeight = height * worldMultiplier

  for (let i = 0; i < nodeCount; i++) {
    const graphics = new Graphics()
    const node: Node = {
      x: Math.random() * worldWidth - (worldWidth - width) / 2,
      y: Math.random() * worldHeight - (worldHeight - height) / 2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1.5,
      graphics,
    }

    graphics.circle(0, 0, node.size)
    graphics.fill({ color: 0xd4d4d4, alpha: 0.8 })

    graphics.x = node.x
    graphics.y = node.y

    app.stage.addChild(graphics)
    nodes.push(node)
  }

  linesGraphics = new Graphics()
  app.stage.addChildAt(linesGraphics, 0)

  app.ticker.maxFPS = targetFPS

  app.ticker.add((ticker) => {
    if (!app || !linesGraphics) return

    const delta = ticker.deltaTime

    const screenWidth = app.screen.width
    const screenHeight = app.screen.height

    const worldWidth = screenWidth * worldMultiplier
    const worldHeight = screenHeight * worldMultiplier
    const offsetX = (worldWidth - screenWidth) / 2
    const offsetY = (worldHeight - screenHeight) / 2

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      if (!node) continue

      node.x += node.vx * delta
      node.y += node.vy * delta


      if (node.x < -offsetX) node.x = screenWidth + offsetX
      if (node.x > screenWidth + offsetX) node.x = -offsetX
      if (node.y < -offsetY) node.y = screenHeight + offsetY
      if (node.y > screenHeight + offsetY) node.y = -offsetY

      node.graphics.x = node.x
      node.graphics.y = node.y
    }

    linesGraphics.clear()
    const maxDistSq = connectionDistance * connectionDistance

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      if (!node) continue
      for (let j = i + 1; j < nodes.length; j++) {
        const otherNode = nodes[j]
        if (!otherNode) continue
        const dx = node.x - otherNode.x
        const dy = node.y - otherNode.y
        const distSq = dx * dx + dy * dy

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq)
          const alpha = (1 - dist / connectionDistance) * 0.2
          linesGraphics.moveTo(node.x, node.y)
          linesGraphics.lineTo(otherNode.x, otherNode.y)
          linesGraphics.stroke({ width: 1, color: 0x737373, alpha })
        }
      }
    }
  })

  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (app) {
    app.destroy(true, { children: true, texture: true })
  }
  nodes = []
  linesGraphics = null
})
</script>

<template>
  <div class="absolute inset-0 overflow-hidden">
    <!-- Background image -->
    <div class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
      style="background-image: url('/bg_ava.png')" />
    <!-- Canvas overlay -->
    <div ref="canvasContainer" class="absolute inset-0"></div>
  </div>
</template>

<style scoped>
:deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
