<script setup lang="ts">
import type { Critere } from '~/data/rgesn'

defineProps<{ critere: Critere }>()

const libelleStatut: Record<string, string> = {
  'conforme': 'Conforme',
  'non-conforme': 'Non conforme',
  'non-applicable': 'Non applicable',
  'non-evalue': 'Non évalué',
}

// Classes Tailwind standard, sans dépendance à un thème particulier. Le
// libellé porte le sens, la couleur ne fait que le doubler : il n'est pas
// nécessaire d'introduire des teintes d'alerte (rouge/vert), un simple
// contraste de fond suffit. Voir le README pour les jetons à personnaliser.
const classeStatut: Record<string, string> = {
  'conforme': 'bg-blue-50 text-blue-700',
  'non-conforme': 'bg-neutral-900 text-white',
  'non-applicable': 'bg-neutral-100 text-neutral-500',
  'non-evalue': 'bg-neutral-100 text-neutral-500',
}
</script>

<template>
  <!-- Une seule grille par critère plutôt qu'une pile de conteneurs : le
       référentiel compte 78 critères, chaque élément de balisage en trop y
       est donc multiplié par 78 dans le poids de la page qui les liste. -->
  <div class="border-b border-neutral-200 py-4 grid grid-cols-[2.5rem_minmax(0,1fr)] sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] gap-x-4 gap-y-2 items-start">
    <span class="col-start-1 row-start-1 text-neutral-400 text-[13px] font-mono pt-0.5">{{ critere.id }}</span>
    <p class="col-start-2 row-start-1 text-neutral-900 text-[14.5px] leading-snug">{{ critere.libelle }}</p>
    <p
      class="col-start-2 row-start-2 text-[13.5px] leading-relaxed"
      :class="critere.justification ? 'text-neutral-600' : 'text-neutral-400 italic'"
    >
      {{ critere.justification || critere.motifNonApplicable }}
    </p>
    <span
      class="col-start-2 row-start-3 sm:col-start-3 sm:row-start-1 justify-self-start rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap"
      :class="classeStatut[critere.statut]"
    >
      {{ libelleStatut[critere.statut] }}
    </span>
  </div>
</template>
