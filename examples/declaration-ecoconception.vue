<script setup lang="ts">
import { referentiel, declaration, budget, mesures } from '~/data/rgesn'

useSeoMeta({
  title: "Déclaration d'écoconception",
  description: "Évaluation de pikto.agency au référentiel général de l'écoconception des services numériques (RGESN 2024) : score d'avancement, critères et plan d'action.",
})

const { scoreGlobal, parThematique, nbCriteres, nbNonApplicables } = useRgesnScore()

/** Séparateur décimal français, comme dans les poids du référentiel. */
const fr = (n: number | string) => String(n).replace('.', ',')

const dateMesures = new Date(mesures.date).toLocaleDateString('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const dateEvaluation = new Date(declaration.dateEvaluation).toLocaleDateString('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const identite = [
  { cle: 'Service évalué', valeur: declaration.service },
  { cle: 'Périmètre', valeur: declaration.perimetre },
  { cle: "Entité qui procède à l'évaluation", valeur: `${declaration.entite}, en auto-évaluation` },
  { cle: 'Référents en écoconception', valeur: declaration.referents.join(' et ') },
  { cle: "Date de l'évaluation", valeur: dateEvaluation },
  { cle: 'Cadence de revue', valeur: `${declaration.cadenceRevue.charAt(0).toUpperCase()}${declaration.cadenceRevue.slice(1)}, la prochaine en ${declaration.premiereRevue}` },
  { cle: 'Échantillon évalué', valeur: declaration.echantillons.join(' ; ') },
]

const objectifs = [
  "Concevoir des services numériques plus durables permettant d'allonger la durée de vie des terminaux.",
  "Promouvoir une démarche de sobriété face aux stratégies de captation de l'attention.",
  'Diminuer les ressources mobilisées sur le cycle de vie du service numérique.',
  "Accroître le niveau de transparence sur l'empreinte environnementale du service.",
]

// Ce qui est prévu pour chaque critère non conforme. La liste des critères,
// elle, est lue depuis le référentiel : le plan d'action ne peut pas oublier
// un critère ni en citer un qui serait redevenu conforme.
// Critères d'achat publiés, ce que le critère 2.8 engage. Ils sont ici et non
// dans rgesn.ts parce qu'ils ne décrivent pas un critère du référentiel : ils
// sont la preuve que le critère 2.8 demande.
const criteresFournisseurs = [
  "Le service est hébergé dans l'Union européenne, pour la protection des données comme pour la longueur du trajet réseau.",
  "Le fournisseur publie une démarche de réduction de ses impacts environnementaux, ou à défaut des données sur sa consommation.",
  "À fonction équivalente, l'option la plus légère en transfert et en calcul est retenue.",
  "Aucun service qui dépose des traceurs publicitaires ou monétise les données des visiteurs n'est retenu.",
  "Le service peut être quitté sans perte de données, ou auto-hébergé.",
]

const suites: Record<string, string> = {
  '1.8': "Aucune publication du code source n'est prévue. La méthode d'évaluation et cette déclaration restent publiques.",
  '2.9': "Le retrait de Nuxt UI a été tenté et annulé : sans lui, Tailwind ne produit plus aucune classe utilitaire et la mise en page disparaît. La compilation Tailwind sera rebranchée sans cette bibliothèque, puis le module retiré, en 2026.",
  '4.15': "Un indicateur du poids de la page consultée et de son empreinte estimée est à l'étude pour une prochaine version du site.",
  '7.2': "Les journaux du serveur ont reçu une rotation automatique le 9 août 2026. Une durée de conservation reste à fixer pour les statistiques d'audience, puis à appliquer automatiquement.",
}

// Garde-fou : un critère qui bascule en non conforme sans entrée ci-dessus
// doit se voir, pas disparaître en silence d'un document dont l'objet est la
// complétude.
const suite = (id: string) => suites[id] ?? "Aucune suite n'est encore arrêtée pour ce critère."

const nonConformes = computed(() =>
  referentiel.flatMap(t => t.criteres.filter(c => c.statut === 'non-conforme')),
)

const titrePage = "Déclaration d'écoconception."
const chapeau = `Évaluation du site pikto.agency au référentiel général de l'écoconception des services numériques, version 2024. Établie le ${dateEvaluation}, revue tous les ans.`
const crumbs = [{ name: 'Accueil', to: '/' }, { name: "Déclaration d'écoconception" }]

const scoreParThematique = computed(() =>
  Object.fromEntries(parThematique.value.map(t => [t.numero, t])),
)
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Écoconception"
      :title="titrePage"
      :lead="chapeau"
      :crumbs="crumbs"
    />

    <section class="relative pb-28">
      <div class="max-w-3xl mx-auto px-6 lg:px-8 space-y-14 text-body text-[15px] leading-relaxed">

        <div>
          <p>
            Pikto s'inscrit dans une démarche d'écoconception visant à réduire les impacts
            environnementaux de ses services numériques. Cette déclaration a été rédigée dans le
            cadre de la mise en œuvre du référentiel général de l'écoconception des services
            numériques, version 2024, publié par l'Arcep et l'Arcom avec l'ADEME, la DINUM, la CNIL
            et l'Inria.
          </p>
          <p class="mt-4">Ce référentiel poursuit quatre objectifs :</p>
          <ol class="mt-3 space-y-2 list-decimal marker:text-pikto marker:font-semibold pl-5">
            <li v-for="(o, i) in objectifs" :key="i" class="pl-1">{{ o }}</li>
          </ol>
        </div>

        <div>
          <h2 class="text-heading text-xl font-bold mb-4">Identité de la déclaration</h2>
          <dl class="rounded-2xl border border-subtle bg-surface divide-y divide-subtle">
            <div v-for="l in identite" :key="l.cle" class="grid sm:grid-cols-3 gap-1 sm:gap-4 px-5 py-3.5">
              <dt class="text-heading text-[13.5px] font-semibold">{{ l.cle }}</dt>
              <dd class="sm:col-span-2 text-[14px]">{{ l.valeur }}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 class="text-heading text-xl font-bold mb-4">Score d'avancement</h2>
          <p class="mb-6">
            Le score est celui du référentiel : on additionne le poids des critères conformes, on
            divise par le poids de tous les critères applicables, et on multiplie par cent. Un
            critère prioritaire pèse 1,5, un critère recommandé 1,25, un critère modéré 1. Un critère
            non applicable sort du calcul, au numérateur comme au dénominateur. Le score affiché
            ci-dessous est calculé à partir des {{ nbCriteres }} critères listés plus bas, il ne
            peut donc pas s'en écarter.
          </p>

          <RgesnScore />

          <p class="mt-6">
            Ce score se lit au regard du nombre de critères applicables. Un site vitrine statique,
            sans compte utilisateur, sans vidéo, sans formulaire et sans modèle d'apprentissage,
            laisse {{ nbNonApplicables }} critères hors du calcul sur {{ nbCriteres }} : il est
            structurellement bien placé sur ce référentiel. Le score mesure l'avancement de la
            démarche, pas l'empreinte environnementale du service.
          </p>
        </div>

        <div>
          <h2 class="text-heading text-xl font-bold mb-4">Ce que nous mesurons</h2>

          <h3 class="text-heading text-[15px] font-semibold mt-6 mb-2">Budget de performance</h3>
          <p>
            Pikto s'astreint à {{ budget.poidsKo }} ko transférés et {{ budget.requetes }} requêtes
            par page. Le nombre d'éléments du DOM ne fait pas partie du budget : nous le relevons et
            le publions, sans plafond. Le relevé ci-dessous date du {{ dateMesures }}, cache vide,
            sur le site de production ; le poids est compressé en Brotli et compte le script de
            mesure d'audience.
          </p>
          <div class="mt-4 rounded-2xl border border-subtle bg-surface divide-y divide-subtle overflow-x-auto">
            <div class="grid grid-cols-[1fr_5rem_5rem_5rem] gap-3 px-5 py-3 text-[13px] font-semibold text-heading min-w-[30rem]">
              <span>Page</span>
              <span class="text-right">Poids</span>
              <span class="text-right">Requêtes</span>
              <span class="text-right">Éléments</span>
            </div>
            <div
              v-for="p in mesures.pages"
              :key="p.route"
              class="grid grid-cols-[1fr_5rem_5rem_5rem] gap-3 px-5 py-3 text-[13.5px] min-w-[30rem]"
            >
              <span class="text-heading">{{ p.route }}</span>
              <span class="text-right">{{ fr(p.poidsKo) }} ko</span>
              <span class="text-right">{{ p.requetes }}</span>
              <span class="text-right">{{ p.elements }}</span>
            </div>
          </div>

          <h3 class="text-heading text-[15px] font-semibold mt-6 mb-2">Empreinte de l'hébergement</h3>
          <p>
            Le site est hébergé par Pikto à Villeurbanne, sur une machine de bureau du commerce :
            carte mère ASUS PRIME B550M-K, processeur AMD Ryzen 7 5800X, 32 Go de mémoire, SSD NVMe
            de 1 To, en service depuis 2023. Cette machine fait tourner environ 28 services. Le
            conteneur du site occupe 75,88 Mio de mémoire, soit 0,25 % de la machine ; sa charge
            processeur n'est pas mesurable à cette échelle.
          </p>
          <div class="mt-4 rounded-2xl border border-subtle bg-surface divide-y divide-subtle">
            <div class="grid grid-cols-3 gap-4 px-5 py-3 text-[13px] font-semibold text-heading">
              <span />
              <span>Machine entière</span>
              <span>Part de pikto.agency</span>
            </div>
            <div class="grid grid-cols-3 gap-4 px-5 py-3 text-[14px]">
              <span class="text-heading font-semibold">Énergie</span>
              <span>environ 1 270 kWh/an</span>
              <span>environ 3,1 kWh/an</span>
            </div>
            <div class="grid grid-cols-3 gap-4 px-5 py-3 text-[14px]">
              <span class="text-heading font-semibold">Carbone</span>
              <span>environ 66 kg CO₂e/an</span>
              <span>environ 0,16 kg CO₂e/an</span>
            </div>
          </div>
          <p class="mt-4">
            Ces chiffres sont une estimation. La puissance de la machine est estimée à 145 W à la
            prise, dont 56 W mesurés au processeur par le compteur RAPL ; le facteur d'émission
            retenu est de 52 g CO₂e/kWh pour l'électricité française, base ADEME. La part du site est
            allouée au prorata de la mémoire qu'il occupe, faute de mesure de sa charge processeur :
            c'est une méthode simplifiée.
          </p>
          <p class="mt-4">
            Le site n'est pas la raison pour laquelle cette machine fonctionne. Ce qui réduit son
            impact d'hébergement est la mutualisation, pas le réemploi : le matériel est du matériel
            de bureau grand public de 2023, toujours en service.
          </p>
        </div>

        <div>
          <h2 class="text-heading text-xl font-bold mb-4">Choix des fournisseurs</h2>
          <p class="mb-5">
            Les critères ci-dessous sont appliqués depuis août 2026 à toute nouvelle sélection de
            fournisseur ou de service tiers. Ils seront portés dans les contrats à leur
            renouvellement. Les contrats en cours, signés avant cette date, ne les portent pas
            encore.
          </p>
          <ul class="rounded-2xl border border-subtle bg-surface divide-y divide-subtle">
            <li v-for="c in criteresFournisseurs" :key="c" class="px-5 py-4 text-[14px] leading-relaxed">
              {{ c }}
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-heading text-xl font-bold mb-4">Plan d'action</h2>
          <p class="mb-5">
            {{ nonConformes.length }}
            {{ nonConformes.length > 1 ? 'critères applicables ne sont pas satisfaits' : "critère applicable n'est pas satisfait" }}
            à ce jour, avec ce qui est prévu pour chacun.
          </p>
          <div class="rounded-2xl border border-subtle bg-surface divide-y divide-subtle">
            <div v-for="c in nonConformes" :key="c.id" class="px-5 py-4">
              <p class="text-heading text-[14px] font-semibold">{{ c.id }} {{ c.libelle }}</p>
              <p class="text-[13.5px] mt-2">{{ c.justification }}</p>
              <p class="text-[13.5px] mt-2 text-body/80">{{ suite(c.id) }}</p>
            </div>
          </div>
          <p class="mt-5">
            L'objectif que se fixe Pikto est d'atteindre {{ declaration.objectif.score }} % au présent
            référentiel d'ici {{ declaration.objectif.echeance }}. Le score actuel est de
            {{ scoreGlobal }} %.
          </p>
        </div>

        <div>
          <h2 class="text-heading text-xl font-bold mb-2">Les {{ nbCriteres }} critères</h2>
          <p class="mb-8">
            Chaque critère est repris avec le libellé du référentiel, sans reformulation, suivi de
            notre évaluation. Pour un critère non applicable, la raison remplace la justification.
          </p>

          <div class="space-y-12">
            <section v-for="t in referentiel" :key="t.numero">
              <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pb-2 border-b-2 border-subtle">
                <h3 class="text-heading text-[17px] font-bold">{{ t.numero }}. {{ t.titre }}</h3>
                <p class="text-body/70 text-[13px]">
                  {{ fr(scoreParThematique[t.numero]?.obtenu.toFixed(2) ?? '') }} /
                  {{ fr(scoreParThematique[t.numero]?.applicable.toFixed(2) ?? '') }} points
                  applicables, soit {{ scoreParThematique[t.numero]?.pourcentage }} %
                </p>
              </div>
              <RgesnCriterion v-for="c in t.criteres" :key="c.id" :critere="c" />
            </section>
          </div>
        </div>

        <div>
          <h2 class="text-heading text-xl font-bold mb-3">Signaler une erreur</h2>
          <p>
            Si un élément de cette déclaration vous paraît inexact ou invérifiable, écrivez-nous à
            <a :href="`mailto:${declaration.contact}`" class="text-pikto hover:underline underline-offset-2">{{ declaration.contact }}</a>.
            Nous corrigeons ce qui doit l'être et la correction apparaît à la revue suivante.
          </p>
        </div>

      </div>
    </section>
  </div>
</template>
