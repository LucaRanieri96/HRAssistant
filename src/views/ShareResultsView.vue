<template>
  <div class="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-neutral-950 dark:to-neutral-900">
    <!-- Header -->
    <div class="sticky top-0 z-10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-surface-200">
      <div class="max-w-4xl mx-auto px-6 py-6">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-secondary-400 flex items-center justify-center">
            <i class="pi pi-trophy text-neutral-950" style="font-size: 1.5rem;" />
          </div>
          <div>
            <h1 class="text-h4 font-bold">{{ $t('share.title') }}</h1>
            <p class="text-body-m opacity-60">{{ $t('share.subtitle') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-4xl mx-auto px-6 py-8">
      <div v-if="results.length === 0" class="text-center py-12">
        <i class="pi pi-exclamation-circle text-6xl opacity-30 mb-4" />
        <p class="text-h5 opacity-60">{{ $t('share.noData') }}</p>
      </div>

      <div v-else class="space-y-6">
        <!-- Top 3 -->
        <div v-for="(candidate, index) in results.slice(0, 3)" :key="index"
          class="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg border border-surface-200">
          <div class="flex items-start gap-4">
            <!-- Position Badge -->
            <div :class="[
              'flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center',
              index === 0 ? 'bg-secondary-400' : index === 1 ? 'bg-[#C0C0C0]' : 'bg-[#CD7F32]'
            ]">
              <span class="text-h3 font-black" :class="index === 2 ? 'text-white' : 'text-neutral-950'">
                {{ index + 1 }}
              </span>
            </div>

            <!-- Candidate Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-4 mb-3">
                <h3 class="text-h4 font-bold">{{ candidate.name }}</h3>
                <div class="px-4 py-2 rounded-xl bg-secondary-400 flex-shrink-0">
                  <span class="text-h5 font-bold text-neutral-950">{{ candidate.matchScore }}</span>
                </div>
              </div>

              <div class="space-y-2 mb-4">
                <div class="flex items-center gap-2 text-body-l opacity-70">
                  <i class="pi pi-briefcase" />
                  <span>{{ candidate.experience }}</span>
                </div>
              </div>

              <!-- Skills -->
              <div class="flex flex-wrap gap-2">
                <div v-for="(skill, idx) in candidate.skills.slice(0, 4)" :key="idx"
                  class="px-3 py-1 rounded-lg bg-surface-100 border border-surface-200">
                  <span class="text-body-m">{{ skill }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Rest of candidates -->
        <div v-if="results.length > 3" class="pt-4">
          <h2 class="text-h4 font-bold mb-4 px-2">{{ $t('share.otherCandidates') }}</h2>
          <div class="space-y-3">
            <div v-for="(candidate, index) in results.slice(3)" :key="index + 3"
              class="bg-white dark:bg-neutral-800 rounded-xl p-5 border border-surface-200">
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-surface-100 border border-surface-200
                            flex items-center justify-center">
                  <span class="text-h5 font-bold opacity-60">{{ index + 4 }}</span>
                </div>

                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-3 mb-2">
                    <h4 class="text-h5 font-bold">{{ candidate.name }}</h4>
                    <span class="text-h6 font-bold opacity-60">{{ candidate.matchScore }}</span>
                  </div>

                  <div class="flex items-center gap-2 text-body-m opacity-60 mb-3">
                    <i class="pi pi-briefcase text-sm" />
                    <span>{{ candidate.experience }}</span>
                  </div>

                  <div class="flex flex-wrap gap-1.5">
                    <span v-for="(skill, idx) in candidate.skills.slice(0, 3)" :key="idx"
                      class="px-2.5 py-1 rounded-lg bg-surface-50 text-body-s opacity-70">
                      {{ skill }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Download Button -->
        <div class="sticky bottom-6 pt-4">
          <button @click="downloadPDF" :disabled="isGenerating" class="w-full py-4 px-6 bg-primary-500 hover:bg-primary-600 disabled:bg-surface-300
                   text-white font-bold rounded-2xl shadow-lg transition-all duration-200
                   active:scale-95 disabled:cursor-not-allowed disabled:opacity-50
                   flex items-center justify-center gap-3">
            <i v-if="!isGenerating" class="pi pi-download" style="font-size: 1.25rem;" />
            <i v-else class="pi pi-spinner animate-spin" style="font-size: 1.25rem;" />
            <span class="text-h5">
              {{ isGenerating ? $t('share.generating') : $t('share.downloadPDF') }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="max-w-4xl mx-auto px-6 py-8 text-center">
      <p class="text-body-s opacity-40">
        {{ $t('share.footer') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { decodeResults, type EncodedResult } from '@/utils/resultsEncoder'
import { jsPDF } from 'jspdf'

const route = useRoute()
const { t } = useI18n()

const results = ref<EncodedResult[]>([])
const isGenerating = ref(false)

onMounted(() => {
  const encoded = route.query.r as string
  if (encoded) {
    results.value = decodeResults(encoded)
  }
})

const downloadPDF = async () => {
  isGenerating.value = true

  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    // Configurazione
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 20
    const contentWidth = pageWidth - 2 * margin
    let yPos = margin

    // Header
    pdf.setFillColor(255, 214, 0) // secondary-400 color
    pdf.rect(0, 0, pageWidth, 40, 'F')

    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(24)
    pdf.setTextColor(31, 41, 55) // neutral-950
    pdf.text(t('share.pdfTitle'), margin, 25)

    yPos = 50

    // Sottotitolo
    pdf.setFontSize(12)
    pdf.setTextColor(100, 100, 100)
    pdf.text(t('share.pdfSubtitle'), margin, yPos)
    yPos += 15

    // Linea separatrice
    pdf.setDrawColor(200, 200, 200)
    pdf.line(margin, yPos, pageWidth - margin, yPos)
    yPos += 10

    // Candidati
    results.value.forEach((candidate, index) => {
      // Check se serve nuova pagina
      if (yPos > pageHeight - 60) {
        pdf.addPage()
        yPos = margin
      }

      // Background per top 3
      if (index < 3) {
        let bgColor: [number, number, number]
        if (index === 0) bgColor = [255, 214, 0] // gold
        else if (index === 1) bgColor = [192, 192, 192] // silver
        else bgColor = [205, 127, 50] // bronze

        pdf.setFillColor(...bgColor)
        pdf.roundedRect(margin, yPos, contentWidth, 35, 3, 3, 'F')
      }

      // Position badge
      const badgeSize = 12
      let badgeColor: [number, number, number]
      if (index === 0) badgeColor = [255, 214, 0]
      else if (index === 1) badgeColor = [192, 192, 192]
      else if (index === 2) badgeColor = [205, 127, 50]
      else badgeColor = [230, 230, 230]

      pdf.setFillColor(...badgeColor)
      pdf.circle(margin + 8, yPos + 8, badgeSize / 2, 'F')

      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(14)
      pdf.setTextColor(index < 3 ? 31 : 100, index < 3 ? 41 : 100, index < 3 ? 55 : 100)
      pdf.text(`${index + 1}`, margin + 8, yPos + 10, { align: 'center' })

      // Nome
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(16)
      pdf.setTextColor(31, 41, 55)
      pdf.text(candidate.name, margin + 20, yPos + 10)

      // Score
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(18)
      pdf.setTextColor(31, 41, 55)
      pdf.text(`${candidate.matchScore}`, pageWidth - margin - 20, yPos + 10, { align: 'right' })

      // Experience
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(10)
      pdf.setTextColor(100, 100, 100)
      pdf.text(candidate.experience, margin + 20, yPos + 18)

      // Skills
      const skills = candidate.skills.slice(0, 4).join(' • ')
      pdf.setFontSize(9)
      pdf.setTextColor(120, 120, 120)
      const splitSkills = pdf.splitTextToSize(skills, contentWidth - 20)
      pdf.text(splitSkills, margin + 20, yPos + 25)

      yPos += index < 3 ? 45 : 35
    })

    // Footer
    yPos = pageHeight - 20
    pdf.setFontSize(8)
    pdf.setTextColor(150, 150, 150)
    pdf.text(t('share.footer'), pageWidth / 2, yPos, { align: 'center' })

    // Salva PDF
    const timestamp = new Date().toISOString().split('T')[0]
    pdf.save(`candidates-report-${timestamp}.pdf`)
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert(t('share.errorGenerating'))
  } finally {
    isGenerating.value = false
  }
}
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
