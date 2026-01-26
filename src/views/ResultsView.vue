<template>
  <div class="relative w-full h-screen overflow-hidden">

    <!-- Logo in top right -->
    <div class="absolute top-8 right-16 z-10">
      <Logo size="medium" />
    </div>

    <!-- Particle celebration effect -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div v-for="i in 20" :key="i" class="particle absolute w-2 h-2 bg-secondary-400 rounded-full" :style="{
        left: `${Math.random() * 100}%`,
        top: '-10%',
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${3 + Math.random() * 2}s`,
      }" />
    </div>

    <!-- Content -->
    <div class="relative h-full flex flex-col px-16 pt-20 pb-48 overflow-y-auto pr-6
                scrollbar-thin scrollbar-thumb-secondary-400/50 scrollbar-track-white/5">
      <!-- Header -->
      <Transition appear @before-enter="onBeforeEnter" @enter="onEnter">
        <div class="mb-12">
          <h1 class="text-[72px] font-bold text-white tracking-tight mb-4">
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
              <div class="relative bg-white/5 backdrop-blur-sm border-2 border-secondary-400 bg-white/10 rounded-3xl overflow-visible
                         shadow-[0_0_60px_rgba(255,210,77,0.4),0_0_100px_rgba(255,210,77,0.2)]
                         transition-all duration-500">
                <!-- Animated border glow -->
                <div class="absolute inset-0 rounded-3xl pointer-events-none">
                  <div class="glow-border absolute inset-0 rounded-3xl" />
                </div>

                <div class="relative p-10 flex items-center gap-8">
                  <!-- Trophy Badge with Position -->
                  <div class="flex-shrink-0 relative">
                    <div class="w-32 h-32 rounded-2xl bg-secondary-400 flex items-center justify-center">
                      <i class="pi pi-trophy text-[#0a1628] text-[64px]" />
                    </div>
                    <div
                      class="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-secondary-400 border-4 border-[#0a1628] flex items-center justify-center z-10 shadow-lg">
                      <span class="text-[28px] font-black text-[#0a1628]">1</span>
                    </div>
                  </div>

                  <!-- Info -->
                  <div class="flex-1">
                    <h3 class="text-[44px] font-bold text-white mb-4 leading-tight">{{ first.name }}</h3>

                    <div class="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-secondary-400 mb-6 shadow-lg">
                      <span class="text-[28px] font-bold text-[#0a1628]">SCORE</span>
                      <div class="w-1 h-10 bg-[#0a1628]/30 rounded-full"></div>
                      <span class="text-[52px] font-black text-[#0a1628] leading-none">{{ first.matchScore }}</span>
                    </div>

                    <div class="flex items-center gap-4 mb-6 flex-wrap">
                      <div class="flex items-center gap-2">
                        <i class="pi pi-briefcase text-white/40 text-[24px]" />
                        <span class="text-[24px] text-white/70">{{ first.experience }} · {{ first.skills[0] }}</span>
                      </div>
                    </div>

                    <div class="flex flex-wrap gap-3">
                      <div v-for="(skill, idx) in first.skills.slice(0, 4)" :key="idx" :class="[
                        'px-5 py-2 rounded-xl border',
                        idx < 2
                          ? 'bg-secondary-400/10 border-secondary-400/40 text-secondary-400'
                          : 'bg-white/5 border-white/10 text-white/70'
                      ]">
                        <span class="text-[20px] font-medium">{{ skill }}</span>
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
              class="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-visible h-full">
              <div class="p-8 h-full flex flex-col">
                <!-- Medal Badge with Position -->
                <div class="flex items-center gap-6 mb-6">
                  <div class="flex-shrink-0 relative">
                    <div
                      class="w-24 h-24 rounded-2xl bg-white/10 border-2 border-white/30 flex items-center justify-center">
                      <i class="pi pi-star-fill text-white/80 text-[48px]" />
                    </div>
                    <div
                      class="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-white border-4 border-[#0a1628] flex items-center justify-center z-10 shadow-lg">
                      <span class="text-[24px] font-black text-[#0a1628]">2</span>
                    </div>
                  </div>

                  <div class="flex-1 min-w-0">
                    <h3 class="text-[32px] font-bold text-white leading-tight truncate">{{ second.name }}</h3>
                  </div>
                </div>

                <!-- Score Badge - Full Width -->
                <div
                  class="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-secondary-400 mb-6 shadow-lg">
                  <span class="text-[24px] font-bold text-[#0a1628]">SCORE</span>
                  <div class="w-1 h-8 bg-[#0a1628]/30 rounded-full"></div>
                  <span class="text-[48px] font-black text-[#0a1628] leading-none">{{ second.matchScore }}</span>
                </div>

                <!-- Details -->
                <div class="flex flex-col gap-3 mb-4">
                  <div class="flex items-center gap-2">
                    <i class="pi pi-briefcase text-white/40 text-[20px]" />
                    <span class="text-[20px] text-white/70">{{ second.experience }} · {{ second.skills[0] }}</span>
                  </div>
                </div>

                <!-- Skills -->
                <div class="flex flex-wrap gap-2 mt-auto">
                  <div v-for="(skill, idx) in second.skills.slice(0, 3)" :key="idx"
                    class="px-4 py-1.5 rounded-xl border bg-white/5 border-white/10">
                    <span class="text-[18px] text-white/70">{{ skill }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 3rd Place -->
            <div v-if="third"
              class="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-visible h-full">
              <div class="p-8 h-full flex flex-col">
                <!-- Medal Badge with Position -->
                <div class="flex items-center gap-6 mb-6">
                  <div class="flex-shrink-0 relative">
                    <div
                      class="w-24 h-24 rounded-2xl bg-white/10 border-2 border-white/30 flex items-center justify-center">
                      <i class="pi pi-star text-white/80 text-[48px]" />
                    </div>
                    <div
                      class="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-white border-4 border-[#0a1628] flex items-center justify-center z-10 shadow-lg">
                      <span class="text-[24px] font-black text-[#0a1628]">3</span>
                    </div>
                  </div>

                  <div class="flex-1 min-w-0">
                    <h3 class="text-[32px] font-bold text-white leading-tight truncate">{{ third.name }}</h3>
                  </div>
                </div>

                <!-- Score Badge - Full Width -->
                <div
                  class="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-secondary-400 mb-6 shadow-lg">
                  <span class="text-[24px] font-bold text-[#0a1628]">SCORE</span>
                  <div class="w-1 h-8 bg-[#0a1628]/30 rounded-full"></div>
                  <span class="text-[48px] font-black text-[#0a1628] leading-none">{{ third.matchScore }}</span>
                </div>

                <!-- Details -->
                <div class="flex flex-col gap-3 mb-4">
                  <div class="flex items-center gap-2">
                    <i class="pi pi-briefcase text-white/40 text-[20px]" />
                    <span class="text-[20px] text-white/70">{{ third.experience }} · {{ third.skills[0] }}</span>
                  </div>
                </div>

                <!-- Skills -->
                <div class="flex flex-wrap gap-2 mt-auto">
                  <div v-for="(skill, idx) in third.skills.slice(0, 3)" :key="idx"
                    class="px-4 py-1.5 rounded-xl border bg-white/5 border-white/10">
                    <span class="text-[18px] text-white/70">{{ skill }}</span>
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
          <h2 class="text-[40px] font-bold text-white mb-6 ml-2">Altri Candidati</h2>
          <div class="space-y-6">
            <div v-for="(candidate, index) in rest" :key="candidate.id" v-memo="[candidate.id, candidate.matchScore]"
              class="relative bg-white/5 backdrop-blur-sm
                     border border-white/10 rounded-3xl p-8
                     transition-all duration-300 select-none
                     hover:border-white/20 hover:bg-white/10">
              <div class="flex items-center gap-8">
                <!-- Position Number -->
                <div class="flex-shrink-0 w-20 h-20 rounded-xl bg-white/5 border-2 border-white/20
                          flex items-center justify-center">
                  <span class="text-[32px] font-bold text-white/60">
                    {{ index + 4 }}
                  </span>
                </div>

                <!-- Candidate Info -->
                <div class="flex-1">
                  <!-- Name and Score -->
                  <div class="flex items-center justify-between mb-4">
                    <h4 class="text-[36px] font-bold text-white">
                      {{ candidate.name }}
                    </h4>
                    <div class="flex items-center gap-3">
                      <span class="text-[26px] text-white/50">Score:</span>
                      <div class="px-5 py-2 rounded-xl bg-white/5 border border-white/20">
                        <span class="text-[28px] font-bold text-white/80">
                          {{ candidate.matchScore }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Details -->
                  <div class="flex items-center gap-6 mb-4">
                    <div class="flex items-center gap-2">
                      <i class="pi pi-briefcase text-white/30 text-[20px]" />
                      <span class="text-[22px] text-white/60">{{ candidate.skills[0] }}</span>
                    </div>
                    <div class="h-5 w-px bg-white/20" />
                    <div class="flex items-center gap-2">
                      <i class="pi pi-clock text-white/30 text-[20px]" />
                      <span class="text-[22px] text-white/60">{{ candidate.experience }}</span>
                    </div>
                  </div>

                  <!-- Skills -->
                  <div class="flex flex-wrap gap-2">
                    <div v-for="(skill, idx) in candidate.skills.slice(0, 4)" :key="idx"
                      class="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10">
                      <span class="text-[20px] text-white/60">{{ skill }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Export Button -->
      <Button @click="handleBack" severity="warn" class="!w-full !h-[110px] !mt-8 !text-[42px] !font-bold !rounded-xl">
        <template #icon>
          <i class="pi pi-qrcode text-[48px] mr-4" />
        </template>
        ESPORTA RISULTATI
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Candidate } from '../types'
import Logo from '../components/Logo.vue'

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

<style scoped>
@keyframes particle-fall {
  0% {
    transform: translateY(0vh);
    opacity: 0;
    scale: 0;
  }

  50% {
    opacity: 1;
    scale: 1.5;
  }

  100% {
    transform: translateY(110vh);
    opacity: 0;
    scale: 0;
  }
}

.particle {
  animation: particle-fall linear infinite;
}

@keyframes glow-pulse {

  0%,
  100% {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }
}

.glow-border {
  background: linear-gradient(90deg, rgba(255, 210, 77, 0.3), rgba(255, 210, 77, 0.1), rgba(255, 210, 77, 0.3));
  filter: blur(20px);
  animation: glow-pulse 2s ease-in-out infinite;
}

/* Custom scrollbar */
.scrollbar-thin::-webkit-scrollbar {
  width: 8px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(255, 210, 77, 0.5);
  border-radius: 4px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 210, 77, 0.7);
}
</style>
