<template>
  <div class="relative w-full h-screen overflow-hidden bg-neutral-950">
    <ScreenLayout root-class="relative w-full h-full" container-class="pb-[120px]"
      content-class="relative h-full flex flex-col overflow-y-auto kiosk-scrollbar px-16 py-12">
      <!-- Header -->
      <Transition appear @before-enter="onBeforeEnter" @enter="onEnter">
        <div class="mb-12">
          <h1 class="text-display-1 font-bold text-white tracking-tight mb-4">
            CLASSIFICA AI
          </h1>
          <div class="w-32 h-2 bg-secondary-400 rounded-full" />
        </div>
      </Transition>

      <!-- Top 3 Podium -->
      <Transition appear @before-enter="onBeforeEnter" @enter="(el) => onEnter(el, 0.2)">
        <div class="mb-12">
          <!-- Winner - Full Width -->
          <Transition appear @before-enter="onWinnerBeforeEnter" @enter="onWinnerEnter">
            <div v-if="first" class="mb-6">
              <div
                class="relative bg-white/5 backdrop-blur-sm border-2 border-secondary-400 rounded-3xl overflow-hidden">
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
                    <h3 class="text-h3 font-bold text-white mb-4 leading-tight">{{ first.name }}</h3>

                    <div class="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-secondary-400 mb-6">
                      <span class="text-label-xl font-bold text-neutral-950">SCORE</span>
                      <div class="w-1 h-10 bg-neutral-950/30 rounded-full"></div>
                      <span class="text-score-huge font-black text-neutral-950 leading-none">{{ first.matchScore
                        }}</span>
                    </div>

                    <div class="flex items-center gap-4 mb-6 flex-wrap">
                      <div class="flex items-center gap-2">
                        <i class="pi pi-briefcase text-white/40 text-icon-s" />
                        <span class="text-body-xl text-white/70">{{ first.experience }} · {{ first.skills[0]
                        }}</span>
                      </div>
                    </div>

                    <div class="flex flex-wrap gap-3">
                      <div v-for="(skill, idx) in first.skills.slice(0, 4)" :key="idx" :class="[
                        'px-5 py-2 rounded-xl border',
                        idx < 2
                          ? 'bg-secondary-400/10 border-secondary-400/40 text-secondary-400'
                          : 'bg-white/5 border-white/10 text-white/70'
                          </div>
                          </div>
                          </div>
                          </div>
                          </div>
                          </div>
                          </Transition>

                          < !--2nd and 3rd - Side by Side with EQUAL HEIGHT-- >
                            <div class=" grid grid-cols-2 gap-6">
                        <!-- 2nd Place -->
                        <div v-if="second"
                          class="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden h-full">
                          <div class="p-8 h-full flex flex-col">
                            <!-- Medal Badge with Position -->
                            <div class="flex items-center gap-6 mb-6">
                              <div class="flex-shrink-0 relative">
                                <div
                                  class="w-24 h-24 rounded-2xl bg-white/10 border-2 border-white/30 flex items-center justify-center">
                                  <i class="pi pi-star-fill text-white/80 text-icon-l" />
                                </div>
                                <div
                                  class="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-white border-4 border-neutral-950 flex items-center justify-center z-10">
                                  <span class="text-label-m font-black text-neutral-950">2</span>
                                </div>
                              </div>

                              <div class="flex-1 min-w-0">
                                <h3 class="text-h5 font-bold text-white leading-tight truncate">{{ second.name }}</h3>
                              </div>
                            </div>

                            <!-- Score Badge - Full Width -->
                            <div
                              class="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-secondary-400 mb-6">
                              <span class="text-label-m font-bold text-neutral-950">SCORE</span>
                              <div class="w-1 h-8 bg-neutral-950/30 rounded-full"></div>
                              <span class="text-score-large font-black text-neutral-950 leading-none">{{
                                second.matchScore }}</span>
                            </div>

                            <!-- Details -->
                            <div class="flex flex-col gap-3 mb-4">
                              <div class="flex items-center gap-2">
                                <i class="pi pi-briefcase text-white/40 text-icon-xs" />
                                <span class="text-body-m text-white/70">{{ second.experience }} · {{ second.skills[0]
                                  }}</span>
                              </div>
                            </div>

                            <!-- Skills -->
                            <div class="flex flex-wrap gap-2 mt-auto">
                              <div v-for="(skill, idx) in second.skills.slice(0, 3)" :key="idx"
                                class="px-4 py-1.5 rounded-xl border bg-white/5 border-white/10">
                                <span class="text-body-s text-white/70">{{ skill }}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <!-- 3rd Place -->
                        <div v-if="third"
                          class="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden h-full">
                          <div class="p-8 h-full flex flex-col">
                            <!-- Medal Badge with Position -->
                            <div class="flex items-center gap-6 mb-6">
                              <div class="flex-shrink-0 relative">
                                <div
                                  class="w-24 h-24 rounded-2xl bg-white/10 border-2 border-white/30 flex items-center justify-center">
                                  <i class="pi pi-star text-white/80 text-icon-l" />
                                </div>
                                <div
                                  class="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-white border-4 border-neutral-950 flex items-center justify-center z-10">
                                  <span class="text-label-m font-black text-neutral-950">3</span>
                                </div>
                              </div>

                              <div class="flex-1 min-w-0">
                                <h3 class="text-h5 font-bold text-white leading-tight truncate">{{ third.name }}</h3>
                              </div>
                            </div>

                            <!-- Score Badge - Full Width -->
                            <div
                              class="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-secondary-400 mb-6">
                              <span class="text-label-m font-bold text-neutral-950">SCORE</span>
                              <div class="w-1 h-8 bg-neutral-950/30 rounded-full"></div>
                              <span class="text-score-large font-black text-neutral-950 leading-none">{{
                                third.matchScore }}</span>
                            </div>

                            <!-- Details -->
                            <div class="flex flex-col gap-3 mb-4">
                              <div class="flex items-center gap-2">
                                <i class="pi pi-briefcase text-white/40 text-icon-xs" />
                                <span class="text-body-m text-white/70">{{ third.experience }} · {{ third.skills[0]
                                  }}</span>
                              </div>
                            </div>

                            <!-- Skills -->
                            <div class="flex flex-wrap gap-2 mt-auto">
                              <div v-for="(skill, idx) in third.skills.slice(0, 3)" :key="idx"
                                class="px-4 py-1.5 rounded-xl border bg-white/5 border-white/10">
                                <span class="text-body-s text-white/70">{{ skill }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
          </Transition>

          <!-- Other Candidates -->
          <Transition v-if="rest.length > 0" appear @before-enter="onBeforeEnter" @enter="(el) => onEnter(el, 0.4)">
            <div class="mb-8">
              <h2 class="text-title-xl font-bold text-white mb-6 ml-2">Altri Candidati</h2>
              <div class="space-y-6">
                <div v-for="(candidate, index) in rest" :key="candidate.id"
                  v-memo="[candidate.id, candidate.matchScore]" class="relative bg-white/5 backdrop-blur-sm
                     border border-white/10 rounded-3xl p-8
                     transition-all duration-300 select-none
                     hover:border-white/20 hover:bg-white/10">
                  <div class="flex items-center gap-8">
                    <!-- Position Number -->
                    <div class="flex-shrink-0 w-20 h-20 rounded-xl bg-white/5 border-2 border-white/20
                          flex items-center justify-center">
                      <span class="text-h5 font-bold text-white/60">
                        {{ index + 4 }}
                      </span>
                    </div>

                    <!-- Candidate Info -->
                    <div class="flex-1">
                      <!-- Name and Score -->
                      <div class="flex items-center justify-between mb-4">
                        <h4 class="text-h4 font-bold text-white">
                          {{ candidate.name }}
                        </h4>
                        <div class="flex items-center gap-3">
                          <span class="text-label-l text-white/50">Score:</span>
                          <div class="px-5 py-2 rounded-xl bg-white/5 border border-white/20">
                            <span class="text-label-xl font-bold text-white/80">
                              {{ candidate.matchScore }}
                            </span>
                          </div>
                        </div>
                      </div>

                      <!-- Details -->
                      <div class="flex items-center gap-6 mb-4">
                        <div class="flex items-center gap-2">
                          <i class="pi pi-briefcase text-white/30 text-icon-xs" />
                          <span class="text-body-l text-white/60">{{ candidate.skills[0] }}</span>
                        </div>
                        <div class="h-5 w-px bg-white/20" />
                        <div class="flex items-center gap-2">
                          <i class="pi pi-clock text-white/30 text-icon-xs" />
                          <span class="text-body-l text-white/60">{{ candidate.experience }}</span>
                        </div>
                      </div>

                      <!-- Skills -->
                      <div class="flex flex-wrap gap-2">
                        <div v-for="(skill, idx) in candidate.skills.slice(0, 4)" :key="idx"
                          class="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10">
                          <span class="text-body-m text-white/60">{{ skill }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Export Button -->
          <Button @click="handleBack" class="!w-full !h-[100px] !mt-8 !text-button-xl !font-bold !rounded-xl">
            <template #icon>
              <i class="pi pi-home text-icon-l mr-4" />
            </template>
            {{ $t('results.newSearch') }}
          </Button>
    </ScreenLayout>

    <!-- Bottom Navigation -->
    <BottomNav current-screen="podium" @navigate="handleNavigate" @home="handleBack" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Candidate } from '../types'
import type { Screen } from '@/components/BottomNav.vue'
import ScreenLayout from '@/components/layout/ScreenLayout.vue'
import BottomNav from '@/components/BottomNav.vue'

const router = useRouter()

const handleBack = () => {
  router.push('/')
}

const handleNavigate = (screen: Screen) => {
  if (screen === 'settings') {
    router.push('/settings')
  } else if (screen === 'history') {
    // TODO: implement history view
  }
}

// Mock data - ordinati per matchScore
const candidates = computed<Candidate[]>(() => [
  {
    id: '1',
    name: 'Marco Bianchi',
    matchScore: 95,
    experience: '8 anni di esperienza',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    education: 'Laurea Magistrale in Informatica'
  },
  {
    id: '2',
    name: 'Sara Rossi',
    matchScore: 92,
    experience: '6 anni di esperienza',
    skills: ['Vue.js', 'Python', 'Docker', 'PostgreSQL'],
    education: 'Laurea in Ingegneria Informatica'
  },
  {
    id: '3',
    name: 'Luca Verdi',
    matchScore: 88,
    experience: '5 anni di esperienza',
    skills: ['Angular', 'Java', 'Spring Boot', 'MongoDB'],
    education: 'Laurea in Computer Science'
  },
  {
    id: '4',
    name: 'Giulia Neri',
    matchScore: 85,
    experience: '7 anni di esperienza',
    skills: ['React Native', 'Flutter', 'Firebase', 'GraphQL'],
    education: 'Laurea in Informatica'
  },
  {
    id: '5',
    name: 'Andrea Ferrari',
    matchScore: 82,
    experience: '4 anni di esperienza',
    skills: ['Next.js', 'Tailwind CSS', 'Prisma', 'Vercel'],
    education: 'Laurea Triennale in Informatica'
  },
  {
    id: '6',
    name: 'Chiara Russo',
    matchScore: 78,
    experience: '3 anni di esperienza',
    skills: ['Svelte', 'Go', 'Kubernetes', 'Redis'],
    education: 'Laurea in Ingegneria del Software'
  }
]);

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
    (el as HTMLElement).style.transition = 'opacity 0.5s ease-out';
    (el as HTMLElement).style.opacity = '1';
  }, delay * 1000);
};

const onWinnerBeforeEnter = (el: Element) => {
  (el as HTMLElement).style.opacity = '0';
  (el as HTMLElement).style.transform = 'translateY(50px)';
};

const onWinnerEnter = (el: Element) => {
  setTimeout(() => {
    (el as HTMLElement).style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    (el as HTMLElement).style.opacity = '1';
    (el as HTMLElement).style.transform = 'translateY(0)';
  }, 400);
};
</script>

<style scoped></style>
