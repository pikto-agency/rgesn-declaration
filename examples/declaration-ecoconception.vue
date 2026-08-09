<script setup lang="ts">
// Exemple de page de déclaration. Adaptez le contenu à votre service : les
// valeurs ci-dessous sont des exemples, pas des mesures réelles.
//
// Le principe à conserver : aucun chiffre écrit en dur dans le gabarit. Le
// score, le nombre de critères et la liste des non conformes viennent tous de
// data/rgesn.ts. Une page qui recopie ses chiffres à la main finit par
// afficher un score qui ne correspond plus aux critères listés en dessous.
import { referentiel, declaration, budget, mesures } from '~/data/rgesn'

const { scoreGlobal, parThematique, nbCriteres, nbNonApplicables } = useRgesnScore()

/** Séparateur décimal français, comme dans les poids du référentiel. */
const fr = (n: number | string) => String(n).replace('.', ',')

const dateEvaluation = new Date(declaration.dateEvaluation).toLocaleDateString('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const objectifs = [
  "Concevoir des services numériques plus durables permettant d'allonger la durée de vie des terminaux.",
  "Promouvoir une démarche de sobriété face aux stratégies de captation de l'attention.",
  'Diminuer les ressources mobilisées sur le cycle de vie du service numérique.',
  "Accroître le niveau de transparence sur l'empreinte environnementale du service.",
]

// Ce qui est prévu pour chaque critère non conforme, indexé par identifiant.
// La liste des critères, elle, est lue depuis le référentiel : le plan
// d'action ne peut donc ni oublier un critère, ni en citer un qui serait
// redevenu conforme.
const suites: Record<string, string> = {
  // '1.8': "Ce qui est prévu pour ce critère, et à quelle échéance.",
}

// Garde-fou : un critère non conforme sans entrée ci-dessus doit se voir, pas
// disparaître en silence d'un document dont l'objet est la complétude.
const suite = (id: string) => suites[id] ?? "Aucune suite n'est encore arrêtée pour ce critère."

const nonConformes = computed(() =>
  referentiel.flatMap(t => t.criteres.filter(c => c.statut === 'non-conforme')),
)

const scoreParThematique = computed(() =>
  Object.fromEntries(parThematique.value.map(t => [t.numero, t])),
)
</script>

<template>
  <div class="max-w-3xl mx-auto px-6 py-16 space-y-14 leading-relaxed">

    <header>
      <h1 class="text-3xl font-bold tracking-tight">Déclaration d'écoconception</h1>
      <p class="mt-3 text-neutral-600">
        Évaluation du service {{ declaration.service }} au référentiel général de l'écoconception
        des services numériques, version 2024. Établie le {{ dateEvaluation }}, revue
        {{ declaration.cadenceRevue }}.
      </p>
    </header>

    <section>
      <p>
        {{ declaration.entite }} s'inscrit dans une démarche d'écoconception visant à réduire les
        impacts environnementaux de ses services numériques. Cette déclaration a été rédigée dans le
        cadre de la mise en œuvre du référentiel général de l'écoconception des services numériques,
        version 2024, publié par l'Arcep et l'Arcom avec l'ADEME, la DINUM, la CNIL et l'Inria.
      </p>
      <p class="mt-4">Ce référentiel poursuit quatre objectifs :</p>
      <ol class="mt-3 space-y-2 list-decimal pl-5">
        <li v-for="(o, i) in objectifs" :key="i">{{ o }}</li>
      </ol>
    </section>

    <section>
      <h2 class="text-xl font-bold mb-4">Ce que cette déclaration n'est pas</h2>
      <p>
        Le RGESN ne donne lieu à aucune certification ni à aucun label : aucun organisme n'audite ce
        service, et il n'existe pas de note de passage. Cette déclaration est une auto-évaluation.
        Sa valeur tient à ce qu'elle est vérifiable : chaque critère est publié avec son statut, y
        compris ceux qui ne sont pas satisfaits.
      </p>
      <p class="mt-4">
        Le score mesure l'avancement de la mise en œuvre du référentiel. Il ne mesure pas
        l'empreinte environnementale du service, et le référentiel le dit lui-même. Ne présentez
        donc jamais votre service comme « écoconçu » ou « vert » sans nommer le référentiel, donner
        le score et renvoyer vers cette page.
      </p>
    </section>

    <section>
      <h2 class="text-xl font-bold mb-4">Identité de la déclaration</h2>
      <dl class="rounded-xl border divide-y">
        <div class="grid sm:grid-cols-3 gap-1 sm:gap-4 px-5 py-3.5">
          <dt class="font-semibold text-sm">Service évalué</dt>
          <dd class="sm:col-span-2 text-sm">{{ declaration.service }}</dd>
        </div>
        <div class="grid sm:grid-cols-3 gap-1 sm:gap-4 px-5 py-3.5">
          <dt class="font-semibold text-sm">Périmètre</dt>
          <dd class="sm:col-span-2 text-sm">{{ declaration.perimetre }}</dd>
        </div>
        <div class="grid sm:grid-cols-3 gap-1 sm:gap-4 px-5 py-3.5">
          <dt class="font-semibold text-sm">Entité qui procède à l'évaluation</dt>
          <dd class="sm:col-span-2 text-sm">{{ declaration.entite }}, en auto-évaluation</dd>
        </div>
        <div class="grid sm:grid-cols-3 gap-1 sm:gap-4 px-5 py-3.5">
          <dt class="font-semibold text-sm">Référents en écoconception</dt>
          <dd class="sm:col-span-2 text-sm">{{ declaration.referents.join(' et ') }}</dd>
        </div>
        <div class="grid sm:grid-cols-3 gap-1 sm:gap-4 px-5 py-3.5">
          <dt class="font-semibold text-sm">Date de l'évaluation</dt>
          <dd class="sm:col-span-2 text-sm">{{ dateEvaluation }}</dd>
        </div>
        <div class="grid sm:grid-cols-3 gap-1 sm:gap-4 px-5 py-3.5">
          <dt class="font-semibold text-sm">Échantillon évalué</dt>
          <dd class="sm:col-span-2 text-sm">{{ declaration.echantillons.join(' ; ') }}</dd>
        </div>
      </dl>
    </section>

    <section>
      <h2 class="text-xl font-bold mb-4">Score d'avancement</h2>
      <p class="mb-6">
        Le score est celui du référentiel : on additionne le poids des critères conformes, on divise
        par le poids de tous les critères applicables, et on multiplie par cent. Un critère
        prioritaire pèse 1,5, un critère recommandé 1,25, un critère modéré 1. Un critère non
        applicable sort du calcul, au numérateur comme au dénominateur. Le score affiché est calculé
        à partir des {{ nbCriteres }} critères listés plus bas, il ne peut donc pas s'en écarter.
      </p>

      <RgesnScore />

      <p class="mt-6">
        Ce score se lit au regard du nombre de critères applicables :
        {{ nbNonApplicables }} critères sur {{ nbCriteres }} sortent du calcul pour ce service. Le
        score mesure l'avancement de la démarche, pas l'empreinte environnementale.
      </p>
    </section>

    <section>
      <h2 class="text-xl font-bold mb-4">Ce que nous mesurons</h2>
      <p>
        Budget de performance : {{ budget.poidsKo }} ko transférés et {{ budget.requetes }} requêtes
        par page. Relevé cache vide sur le site de production, poids compressé.
      </p>
      <div class="mt-4 rounded-xl border divide-y overflow-x-auto">
        <div class="grid grid-cols-[1fr_5rem_5rem_5rem] gap-3 px-5 py-3 text-sm font-semibold min-w-[30rem]">
          <span>Page</span>
          <span class="text-right">Poids</span>
          <span class="text-right">Requêtes</span>
          <span class="text-right">Éléments</span>
        </div>
        <div
          v-for="p in mesures.pages"
          :key="p.route"
          class="grid grid-cols-[1fr_5rem_5rem_5rem] gap-3 px-5 py-3 text-sm min-w-[30rem]"
        >
          <span>{{ p.route }}</span>
          <span class="text-right">{{ fr(p.poidsKo) }} ko</span>
          <span class="text-right">{{ p.requetes }}</span>
          <span class="text-right">{{ p.elements }}</span>
        </div>
      </div>

      <!-- Ajoutez ici l'empreinte de votre hébergement : puissance de la
           machine, énergie annuelle, carbone, et la méthode d'allocation si le
           serveur est mutualisé. Présentez ces chiffres comme des estimations
           tant qu'ils ne viennent pas d'une mesure directe. -->
    </section>

    <section>
      <h2 class="text-xl font-bold mb-4">Plan d'action</h2>
      <p class="mb-5">
        {{ nonConformes.length }}
        {{ nonConformes.length > 1 ? 'critères applicables ne sont pas satisfaits' : "critère applicable n'est pas satisfait" }}
        à ce jour, avec ce qui est prévu pour chacun.
      </p>
      <div class="rounded-xl border divide-y">
        <div v-for="c in nonConformes" :key="c.id" class="px-5 py-4">
          <p class="text-sm font-semibold">{{ c.id }} {{ c.libelle }}</p>
          <p class="text-sm mt-2">{{ c.justification }}</p>
          <p class="text-sm mt-2 text-neutral-600">{{ suite(c.id) }}</p>
        </div>
      </div>
      <p class="mt-5">
        L'objectif est d'atteindre {{ declaration.objectif.score }} % d'ici
        {{ declaration.objectif.echeance }}. Le score actuel est de {{ scoreGlobal }} %.
      </p>
    </section>

    <section>
      <h2 class="text-xl font-bold mb-2">Les {{ nbCriteres }} critères</h2>
      <p class="mb-8">
        Chaque critère est repris avec le libellé du référentiel, sans reformulation, suivi de
        l'évaluation. Pour un critère non applicable, la raison remplace la justification.
      </p>

      <div class="space-y-12">
        <section v-for="t in referentiel" :key="t.numero">
          <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pb-2 border-b-2">
            <h3 class="text-lg font-bold">{{ t.numero }}. {{ t.titre }}</h3>
            <p class="text-sm text-neutral-600">
              {{ fr(scoreParThematique[t.numero]?.obtenu.toFixed(2) ?? '') }} /
              {{ fr(scoreParThematique[t.numero]?.applicable.toFixed(2) ?? '') }} points
              applicables, soit {{ scoreParThematique[t.numero]?.pourcentage }} %
            </p>
          </div>
          <RgesnCriterion v-for="c in t.criteres" :key="c.id" :critere="c" />
        </section>
      </div>
    </section>

    <section>
      <h2 class="text-xl font-bold mb-3">Signaler une erreur</h2>
      <p>
        Si un élément de cette déclaration vous paraît inexact ou invérifiable, écrivez à
        <a :href="`mailto:${declaration.contact}`" class="underline">{{ declaration.contact }}</a>.
      </p>
    </section>

  </div>
</template>
