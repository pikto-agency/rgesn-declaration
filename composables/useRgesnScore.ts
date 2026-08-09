import { referentiel, POIDS, type Thematique } from '~/data/rgesn'

// Formule du référentiel : somme des poids des critères conformes divisée par
// la somme des poids des critères applicables, multipliée par 100. Un critère
// non applicable sort du numérateur comme du dénominateur.
//
// 'non-evalue' n'est pas un statut du référentiel : c'est l'état par défaut de
// ce gabarit, avant que vous ayez rempli une déclaration. Il est traité comme
// 'non-conforme' dans le calcul : il pèse dans le dénominateur (le critère est
// applicable, on ne sait juste pas encore s'il est tenu) mais jamais dans le
// numérateur. Un critère qu'on n'a pas encore examiné ne doit jamais gonfler
// le score.
function peser(t: Thematique) {
  let obtenu = 0
  let applicable = 0
  for (const c of t.criteres) {
    if (c.statut === 'non-applicable') continue
    applicable += POIDS[c.priorite]
    if (c.statut === 'conforme') obtenu += POIDS[c.priorite]
  }
  return { obtenu, applicable }
}

export function useRgesnScore() {
  const parThematique = computed(() =>
    referentiel.map((t) => {
      const { obtenu, applicable } = peser(t)
      return {
        numero: t.numero,
        titre: t.titre,
        obtenu,
        applicable,
        pourcentage: applicable ? Math.round((obtenu / applicable) * 100) : 0,
      }
    }),
  )

  const totalObtenu = computed(() =>
    parThematique.value.reduce((s, t) => s + t.obtenu, 0))

  const totalApplicable = computed(() =>
    parThematique.value.reduce((s, t) => s + t.applicable, 0))

  const scoreGlobal = computed(() =>
    totalApplicable.value
      ? Math.round((totalObtenu.value / totalApplicable.value) * 100)
      : 0)

  const nbCriteres = computed(() =>
    referentiel.reduce((n, t) => n + t.criteres.length, 0))

  const nbApplicables = computed(() =>
    referentiel.reduce(
      (n, t) => n + t.criteres.filter(c => c.statut !== 'non-applicable').length,
      0,
    ))

  const nbNonApplicables = computed(() => nbCriteres.value - nbApplicables.value)

  // Aucun de ces nombres n'est écrit en dur dans une page : ils viennent tous
  // du fichier de données, comme le score.
  return {
    scoreGlobal,
    parThematique,
    totalObtenu,
    totalApplicable,
    nbCriteres,
    nbApplicables,
    nbNonApplicables,
  }
}
