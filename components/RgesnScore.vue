<script setup lang="ts">
const { scoreGlobal, parThematique, totalObtenu, totalApplicable, nbApplicables } = useRgesnScore()

/** Le référentiel écrit ses poids avec une virgule, le document aussi. */
const fr = (n: number) => n.toFixed(2).replace('.', ',')
</script>

<template>
  <div class="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8">
    <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <p class="text-neutral-900 text-5xl font-bold tracking-tight">{{ scoreGlobal }} %</p>
      <p class="text-neutral-600 text-[14px]">
        soit {{ fr(totalObtenu) }} points sur {{ fr(totalApplicable) }} applicables,
        répartis sur {{ nbApplicables }} critères.
      </p>
    </div>

    <div class="mt-8 space-y-3">
      <div v-for="t in parThematique" :key="t.numero" class="flex items-center gap-3 sm:gap-4">
        <span class="text-neutral-600 text-[13px] w-32 sm:w-52 shrink-0">{{ t.numero }}. {{ t.titre }}</span>
        <div class="flex-1 h-2 rounded-full bg-neutral-200 overflow-hidden">
          <div class="h-full rounded-full bg-blue-600" :style="{ width: `${t.pourcentage}%` }" />
        </div>
        <span class="text-neutral-500 text-[12px] w-12 text-right shrink-0">{{ t.pourcentage }} %</span>
      </div>
    </div>
  </div>
</template>
