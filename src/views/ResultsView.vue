<template>
  <ScreenLayout content-class="flex-1 flex flex-col">
    <template #header>
      <PageTitle :title="$t('results.title')" />
    </template>

    <ScrollArea class="flex-1 space-y-6 pr-6 pb-8">
      <!-- Top 3 Podium -->
      <Transition appear @before-enter="onBeforeEnter" @enter="(el) => onEnter(el, 0.2)">
        <div class="space-y-6">
          <!-- Winner - Full Width -->
          <Transition appear @before-enter="onWinnerBeforeEnter" @enter="onWinnerEnter">
            <div v-if="first">
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
            <div v-if="second"
              class="relative bg-surface-0 border border-surface-200 rounded-3xl overflow-hidden h-full">
              <div class="p-8 h-full flex flex-col">
                <!-- Medal Badge with Position -->
                <div class="flex items-center gap-6 mb-6">
                  <div class="flex-shrink-0 relative">
                    <div
                      class="w-24 h-24 rounded-2xl bg-surface-100 border-2 border-surface-200 flex items-center justify-center">
                      <i class="pi pi-star-fill opacity-80 text-icon-l" />
                    </div>
                    <div
                      class="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-white border-4 border-surface-300 flex items-center justify-center z-10">
                      <span class="text-label-m font-black">2</span>
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

            <!-- 3rd Place -->
            <div v-if="third"
              class="relative bg-surface-0 border border-surface-200 rounded-3xl overflow-hidden h-full">
              <div class="p-8 h-full flex flex-col">
                <!-- Medal Badge with Position -->
                <div class="flex items-center gap-6 mb-6">
                  <div class="flex-shrink-0 relative">
                    <div
                      class="w-24 h-24 rounded-2xl bg-surface-100 border-2 border-surface-200 flex items-center justify-center">
                      <i class="pi pi-star opacity-80 text-icon-l" />
                    </div>
                    <div
                      class="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-white border-4 border-surface-300 flex items-center justify-center z-10">
                      <span class="text-label-m font-black">3</span>
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
          </div>
        </div>
      </Transition>

      <!-- Other Candidates -->
      <Transition v-if="rest.length > 0" appear @before-enter="onBeforeEnter" @enter="(el) => onEnter(el, 0.4)">
        <div>
          <h2 class="text-title-xl font-bold mb-6 ml-2">{{ $t('results.otherCandidates') }}</h2>
          <div class="space-y-6">
            <div v-for="(candidate, index) in rest" :key="candidate.id" v-memo="[candidate.id, candidate.matchScore]"
              class="relative bg-surface-0
                     border border-surface-200 rounded-3xl p-8
                     transition-all duration-300 select-none">
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
          </div>
        </div>
      </Transition>
    </ScrollArea>

    <template #bottom-nav>
      <BottomNav current-screen="podium" @navigate="handleNavigate" @home="handleBack" />
    </template>
  </ScreenLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { Candidate } from '../types'
import type { Screen } from '@/components/BottomNav.vue'
import ScreenLayout from '@/components/layout/ScreenLayout.vue'
import BottomNav from '@/components/BottomNav.vue'
import PageTitle from '@/components/ui/PageTitle.vue'
import ScrollArea from '@/components/ui/ScrollArea.vue'

const router = useRouter()
const { t } = useI18n()

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
    name: t('results.mockData.marcoBianchi.name'),
    matchScore: 95,
    experience: t('results.mockData.marcoBianchi.experience'),
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    education: t('results.mockData.marcoBianchi.education')
  },
  {
    id: '2',
    name: t('results.mockData.saraRossi.name'),
    matchScore: 92,
    experience: t('results.mockData.saraRossi.experience'),
    skills: ['Vue.js', 'Python', 'Docker', 'PostgreSQL'],
    education: t('results.mockData.saraRossi.education')
  },
  {
    id: '3',
    name: t('results.mockData.lucaVerdi.name'),
    matchScore: 88,
    experience: t('results.mockData.lucaVerdi.experience'),
    skills: ['Angular', 'Java', 'Spring Boot', 'MongoDB'],
    education: t('results.mockData.lucaVerdi.education')
  },
  {
    id: '4',
    name: t('results.mockData.giuliaNeri.name'),
    matchScore: 85,
    experience: t('results.mockData.giuliaNeri.experience'),
    skills: ['React Native', 'Flutter', 'Firebase', 'GraphQL'],
    education: t('results.mockData.giuliaNeri.education')
  },
  {
    id: '5',
    name: t('results.mockData.andreaFerrari.name'),
    matchScore: 82,
    experience: t('results.mockData.andreaFerrari.experience'),
    skills: ['Next.js', 'Tailwind CSS', 'Prisma', 'Vercel'],
    education: t('results.mockData.andreaFerrari.education')
  },
  {
    id: '6',
    name: t('results.mockData.chiaraRusso.name'),
    matchScore: 78,
    experience: t('results.mockData.chiaraRusso.experience'),
    skills: ['Svelte', 'Go', 'Kubernetes', 'Redis'],
    education: t('results.mockData.chiaraRusso.education')
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
