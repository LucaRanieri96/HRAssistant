<template>
  <ScreenLayout content-class="flex-1 flex flex-col">
    <template #header>
      <PageTitle :title="$t('results.title')" :show-back="true" @back="handleBack" />
    </template>

    <ScrollArea class="flex-1 space-y-6 pr-6 pb-4">
      <!-- Top 3 Podium -->
      <Transition appear @before-enter="onBeforeEnter" @enter="(el) => onEnter(el, 0.2)">
        <div class="space-y-6">
          <!-- Winner - Full Width -->
          <Transition appear @before-enter="onBeforeEnter" @enter="(el) => onEnter(el, 0)">
            <div v-if="first">
              <div class="relative card-elevated border-2 border-secondary-400 rounded-3xl overflow-hidden">
                <div class="relative p-10 flex items-center gap-8">
                  <!-- Trophy Badge with Position -->
                  <div class="flex-shrink-0 relative">
                    <div class="w-32 h-32 rounded-2xl bg-secondary-400 flex items-center justify-center">
                      <i class="pi pi-trophy text-neutral-950 text-icon-xl" />
                    </div>
                    <div
                      class="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-secondary-400 border-4 border-neutral-950 flex items-center justify-center z-10">
                      <span class="text-label-xl font-black text-neutral-950">1</span>
                    </div>
                  </div>

                  <!-- Info -->
                  <div class="flex-1">
                    <h3 class="text-h3 font-bold mb-4 leading-tight">{{ first.name }}</h3>

                    <div class="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-secondary-400 mb-6">
                      <span class="text-label-xl font-bold text-neutral-950">{{ $t('results.score') }}</span>
                      <div class="w-1 h-10 bg-neutral-950/30 rounded-full"></div>
                      <span class="text-score-huge font-black text-neutral-950 leading-none">{{ first.matchScore
                      }}</span>
                    </div>

                    <div class="flex items-center gap-4 mb-6 flex-wrap">
                      <div class="flex items-center gap-2">
                        <i class="pi pi-briefcase opacity-40 text-icon-s" />
                        <span class="text-body-xl opacity-70">{{ first.experience }} · {{ first.skills[0]
                          }}</span>
                      </div>
                    </div>

                    <div class="flex flex-wrap gap-3">
                      <div v-for="(skill, idx) in first.skills.slice(0, 4)" :key="idx" :class="[
                        'px-5 py-2 rounded-xl border',
                        idx < 2
                          ? 'bg-secondary-400/10 border-secondary-400/40 text-secondary-600'
                          : 'bg-surface-50 border-surface-200 opacity-70'
                      ]">
                        <span class="text-body-m font-medium">{{ skill }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>

          <!-- 2nd and 3rd - Side by Side with EQUAL HEIGHT -->
          <div class="grid grid-cols-2 gap-6">
            <!-- 2nd Place -->
            <Transition appear @before-enter="onBeforeEnter" @enter="(el) => onEnter(el, 0.15)">
              <div v-if="second" class="relative card-elevated rounded-3xl overflow-hidden h-full">
                <div class="p-8 h-full flex flex-col">
                  <!-- Medal Badge with Position -->
                  <div class="flex items-center gap-6 mb-6">
                    <div class="flex-shrink-0 relative">
                      <div class="w-24 h-24 rounded-2xl bg-[#C0C0C0] flex items-center justify-center">
                        <i class="pi pi-star-fill text-white text-icon-l" />
                      </div>
                      <div
                        class="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-[#C0C0C0] border-4 border-white dark:border-neutral-800 flex items-center justify-center z-10">
                        <span class="text-label-m font-black text-neutral-950 dark:text-neutral-950">2</span>
                      </div>
                    </div>

                    <div class="flex-1 min-w-0">
                      <h3 class="text-h5 font-bold leading-tight truncate">{{ second.name }}</h3>
                    </div>
                  </div>

                  <!-- Score Badge - Full Width -->
                  <div class="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-secondary-400 mb-6">
                    <span class="text-label-m font-bold text-neutral-950">{{ $t('results.score') }}</span>
                    <div class="w-1 h-8 bg-neutral-950/30 rounded-full"></div>
                    <span class="text-score-large font-black text-neutral-950 leading-none">{{
                      second.matchScore }}</span>
                  </div>

                  <!-- Details -->
                  <div class="flex flex-col gap-3 mb-4">
                    <div class="flex items-center gap-2">
                      <i class="pi pi-briefcase opacity-40 text-icon-xs" />
                      <span class="text-body-m opacity-70">{{ second.experience }} · {{ second.skills[0]
                      }}</span>
                    </div>
                  </div>

                  <!-- Skills -->
                  <div class="flex flex-wrap gap-2 mt-auto">
                    <div v-for="(skill, idx) in second.skills.slice(0, 3)" :key="idx"
                      class="px-4 py-1.5 rounded-xl border bg-surface-50 border-surface-200">
                      <span class="text-body-s opacity-70">{{ skill }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>

            <!-- 3rd Place -->
            <Transition appear @before-enter="onBeforeEnter" @enter="(el) => onEnter(el, 0.25)">
              <div v-if="third" class="relative card-elevated rounded-3xl overflow-hidden h-full">
                <div class="p-8 h-full flex flex-col">
                  <!-- Medal Badge with Position -->
                  <div class="flex items-center gap-6 mb-6">
                    <div class="flex-shrink-0 relative">
                      <div class="w-24 h-24 rounded-2xl bg-[#CD7F32] flex items-center justify-center">
                        <i class="pi pi-star-fill text-white text-icon-l" />
                      </div>
                      <div
                        class="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-[#CD7F32] border-4 border-white dark:border-neutral-800 flex items-center justify-center z-10">
                        <span class="text-label-m font-black text-white">3</span>
                      </div>
                    </div>

                    <div class="flex-1 min-w-0">
                      <h3 class="text-h5 font-bold leading-tight truncate">{{ third.name }}</h3>
                    </div>
                  </div>

                  <!-- Score Badge - Full Width -->
                  <div class="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-secondary-400 mb-6">
                    <span class="text-label-m font-bold text-neutral-950">{{ $t('results.score') }}</span>
                    <div class="w-1 h-8 bg-neutral-950/30 rounded-full"></div>
                    <span class="text-score-large font-black text-neutral-950 leading-none">{{
                      third.matchScore }}</span>
                  </div>

                  <!-- Details -->
                  <div class="flex flex-col gap-3 mb-4">
                    <div class="flex items-center gap-2">
                      <i class="pi pi-briefcase opacity-40 text-icon-xs" />
                      <span class="text-body-m opacity-70">{{ third.experience }} · {{ third.skills[0]
                      }}</span>
                    </div>
                  </div>

                  <!-- Skills -->
                  <div class="flex flex-wrap gap-2 mt-auto">
                    <div v-for="(skill, idx) in third.skills.slice(0, 3)" :key="idx"
                      class="px-4 py-1.5 rounded-xl border bg-surface-50 border-surface-200">
                      <span class="text-body-s opacity-70">{{ skill }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </Transition>

      <!-- Other Candidates -->
      <div v-if="rest.length > 0">
        <h2 class="text-title-xl font-bold mb-6 ml-2">{{ $t('results.otherCandidates') }}</h2>
        <div class="space-y-6">
          <Transition v-for="(candidate, index) in rest" :key="candidate.id" appear @before-enter="onBeforeEnter"
            @enter="(el) => onEnter(el, 0.4 + index * 0.1)" v-memo="[candidate.id, candidate.matchScore]">
            <div class="relative card-elevated rounded-3xl p-8 transition-all duration-300 select-none">
              <div class="flex items-center gap-8">
                <!-- Position Number -->
                <div class="flex-shrink-0 w-20 h-20 rounded-xl bg-surface-100 border-2 border-surface-200
                          flex items-center justify-center">
                  <span class="text-h5 font-bold opacity-60">
                    {{ index + 4 }}
                  </span>
                </div>

                <!-- Candidate Info -->
                <div class="flex-1">
                  <!-- Name and Score -->
                  <div class="flex items-center justify-between mb-4">
                    <h4 class="text-h4 font-bold">
                      {{ candidate.name }}
                    </h4>
                    <div class="flex items-center gap-3">
                      <span class="text-label-l opacity-50">{{ $t('results.score') }}:</span>
                      <div class="px-5 py-2 rounded-xl bg-surface-100 border border-surface-200">
                        <span class="text-label-xl font-bold opacity-80">
                          {{ candidate.matchScore }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Details -->
                  <div class="flex items-center gap-6 mb-4">
                    <div class="flex items-center gap-2">
                      <i class="pi pi-briefcase opacity-30 text-icon-xs" />
                      <span class="text-body-l opacity-60">{{ candidate.skills[0] }}</span>
                    </div>
                    <div class="h-5 w-px bg-surface-200" />
                    <div class="flex items-center gap-2">
                      <i class="pi pi-clock opacity-30 text-icon-xs" />
                      <span class="text-body-l opacity-60">{{ candidate.experience }}</span>
                    </div>
                  </div>

                  <!-- Skills -->
                  <div class="flex flex-wrap gap-2">
                    <div v-for="(skill, idx) in candidate.skills.slice(0, 4)" :key="idx"
                      class="px-4 py-1.5 rounded-lg bg-surface-50 border border-surface-200">
                      <span class="text-body-m opacity-60">{{ skill }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </ScrollArea>

    <template #bottom-nav>
      <BottomNav :current-screen="currentScreen" @navigate="handleNavigate" @home="handleHome" />
    </template>
  </ScreenLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useNavigationStore } from '@/stores/navigation'
import type { Candidate } from '../types'
import type { Screen } from '@/components/BottomNav.vue'
import ScreenLayout from '@/components/layout/ScreenLayout.vue'
import BottomNav from '@/components/BottomNav.vue'
import PageTitle from '@/components/ui/PageTitle.vue'
import ScrollArea from '@/components/ui/ScrollArea.vue'
import resultsData from '@/data/resultsData.json'

const router = useRouter()
const { t } = useI18n()
const navigationStore = useNavigationStore()

const currentScreen = ref<Screen>('podium')

const handleBack = () => {
  navigationStore.goBack('/results')
}

const handleHome = () => {
  router.push('/')
}

const handleNavigate = (screen: Screen) => {
  currentScreen.value = screen
  if (screen === 'settings') {
    navigationStore.setPreviousRoute('/results')
    router.push('/settings')
  } else if (screen === 'history') {
    // TODO: implement history view
  }
}

const rankedCandidatesData = (history.state?.rankedCandidates as any[]) || resultsData

const candidates = computed<Candidate[]>(() =>
  rankedCandidatesData.map(candidate => ({
    id: candidate.id,
    name: t(candidate.nameKey),
    matchScore: candidate.matchScore,
    experience: t(candidate.experienceKey),
    skills: candidate.skills,
    education: t(candidate.educationKey)
  }))
);

const first = computed(() => candidates.value[0]);
const second = computed(() => candidates.value[1]);
const third = computed(() => candidates.value[2]);
const rest = computed(() => candidates.value.slice(3));

// Animation hooks
const onBeforeEnter = (el: Element) => {
  (el as HTMLElement).style.opacity = '0';
};

const onEnter = (el: Element, delay = 0) => {
  setTimeout(() => {
    (el as HTMLElement).style.transition = 'opacity 0.4s ease';
    (el as HTMLElement).style.opacity = '1';
  }, delay * 1000);
};
</script>

<style scoped></style>
