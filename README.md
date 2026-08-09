# rgesn-declaration

Gabarit pour publier une déclaration d'écoconception au référentiel général de l'écoconception des services numériques (RGESN, version 2024) sur un site Nuxt. Il fournit les 78 critères du référentiel prêts à être remplis, un calcul automatique du score de conformité à partir des statuts renseignés, et les composants Vue nécessaires pour afficher le tout sur une page. L'objectif est que la déclaration soit un fichier de données tenu à jour par l'équipe, et non un texte qui se désynchronise du score affiché.

## Ce que cet outil ne fait pas

Il ne calcule aucune empreinte environnementale : énergie, carbone ou eau. Les chiffres de consommation qui accompagnent une déclaration, s'il y en a, sont à mesurer et à rédiger vous-même, comme dans l'exemple fourni.

Il ne certifie rien. Le RGESN est un cadre d'auto-évaluation : aucun organisme ne délivre de certification à son titre, et cet outil ne prétend pas en délivrer une non plus. Le score qu'il calcule est un indicateur de suivi de la mise en œuvre de la démarche d'écoconception, ce que le référentiel indique lui-même explicitement. Il mesure un état d'avancement de la démarche, pas une performance environnementale du service.

## Installation et prise en main

Ce gabarit se copie dans un projet Nuxt 4, il ne s'installe pas comme une dépendance npm.

1. Copiez les dossiers `data/`, `composables/` et `components/` de ce dépôt dans le dossier `app/` de votre projet Nuxt. Vous obtenez `app/data/rgesn.ts`, `app/composables/useRgesnScore.ts`, `app/components/RgesnScore.vue` et `app/components/RgesnCriterion.vue`.
2. Ouvrez `app/data/rgesn.ts`. Les 78 critères y sont déjà présents avec leur libellé officiel et leur priorité. Chaque critère porte le statut `'non-evalue'` et une justification vide. Pour chacun, remplacez le statut par `'conforme'`, `'non-conforme'` ou `'non-applicable'`, et écrivez la justification correspondante (ou le motif de non-applicabilité dans `motifNonApplicable`).
3. Remplissez les objets `declaration`, `budget` et `mesures` en tête du fichier avec les informations de votre propre service : ce sont des exemples à remplacer, pas des valeurs par défaut à conserver.
4. Créez une page qui importe le composant `RgesnScore` et boucle sur `referentiel` pour afficher un `RgesnCriterion` par critère. Le fichier `examples/declaration-ecoconception.vue` de ce dépôt est un exemple complet, tiré de la déclaration publiée par Pikto : reprenez sa structure et adaptez les textes à votre service.
5. Lancez le site en développement et vérifiez que la page affiche le score attendu compte tenu des statuts que vous avez renseignés.

`RgesnScore.vue` et `RgesnCriterion.vue` utilisent des classes Tailwind standard (`neutral-*`, `blue-*`, `white`), sans dépendre d'un thème particulier. Pour les adapter à la charte graphique de votre site, remplacez :

- `text-neutral-900` (titres) et `text-neutral-600` (texte courant) par vos jetons de couleur de texte,
- `border-neutral-200` et `bg-neutral-100` (fonds neutres, séparateurs) par vos jetons de bordure ou de surface,
- `bg-blue-600`, `text-blue-700` et `bg-blue-50` (couleur d'accent utilisée pour la barre de score et le badge « conforme ») par la couleur de marque de votre site.

## Formule du score

Le score reprend celui défini par le référentiel RGESN. Chaque critère porte un poids selon sa priorité :

| Priorité | Poids |
|---|---|
| Prioritaire | 1,5 |
| Recommandé | 1,25 |
| Modéré | 1 |

Le score est la somme des poids des critères conformes, divisée par la somme des poids des critères applicables, multipliée par 100.

Un critère dont le statut est `'non-applicable'` sort à la fois du numérateur et du dénominateur : il ne compte ni pour ni contre le score, il n'existe simplement pas pour le calcul. Un critère `'non-evalue'`, l'état par défaut de ce gabarit avant qu'il soit rempli, est en revanche compté comme non conforme : il pèse dans le dénominateur mais jamais dans le numérateur, pour qu'une déclaration incomplète ne puisse jamais afficher un score meilleur que ce qu'elle a réellement établi.

## Avertissement sur les allégations environnementales

Ne présentez jamais un site comme « écoconçu » ou comme un « site vert » sans nommer le référentiel utilisé, donner le score obtenu et rendre la déclaration accessible publiquement.

Le cadre français et européen sanctionne les allégations environnementales génériques qui ne sont pas étayées par des éléments vérifiables. Une mention comme « éco-responsable » ou « respectueux de l'environnement », affichée sans référentiel, sans score et sans déclaration consultable, s'expose à être qualifiée d'allégation trompeuse plutôt que reconnue comme une communication transparente. Un score sans contexte, ou une démarche évoquée sans déclaration publique, est précisément le type de communication que ce cadre vise.

## Exemple en production et référentiel officiel

- La déclaration de Pikto, construite avec ce gabarit, est en ligne sur [pikto.agency/declaration-ecoconception](https://pikto.agency/declaration-ecoconception).
- Le référentiel officiel, ses fiches pratiques et les outils d'évaluation publiés par l'Arcep sont disponibles sur [arcep.fr](https://www.arcep.fr/mes-demarches-et-services/entreprises/fiches-pratiques/referentiel-general-ecoconception-services-numeriques.html).

## Contribuer

Les contributions sont bienvenues : correction d'un calcul, amélioration de l'accessibilité des composants, ajout d'un deuxième exemple de déclaration.

Les libellés des 78 critères dans `data/rgesn.ts` sont recopiés mot pour mot depuis le PDF officiel du RGESN 2024 publié par l'Arcep. Ne les reformulez pas, y compris pour corriger les deux imprécisions du document source, « limite-il » au critère 9.4 et « dont son WUE » au critère 8.4 : elles sont conservées à l'identique pour que le texte affiché corresponde exactement à celui du référentiel qu'il cite. Toute proposition de modification d'un libellé doit s'appuyer sur une nouvelle version publiée du PDF officiel, et la citer.

## Licence

MIT, voir le fichier `LICENSE`.
