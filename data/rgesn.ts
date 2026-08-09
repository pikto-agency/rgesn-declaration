// Gabarit d'évaluation au référentiel général de l'écoconception des services
// numériques, version 2024 (Arcep, Arcom, ADEME, DINUM, CNIL, Inria).
//
// Ce fichier est destiné à devenir la seule source de vérité de votre
// déclaration. Le score n'y figure pas : il est calculé par useRgesnScore à
// partir des statuts ci-dessous, pour qu'il soit impossible d'afficher un
// score qui ne corresponde pas aux critères listés.
//
// À faire pour chaque critère :
//   1. Choisir un statut : 'conforme', 'non-conforme' ou 'non-applicable'.
//   2. Écrire la justification correspondante (ou le motif si non applicable).
// Ne touchez pas au champ `libelle` : voir la note plus bas.
//
// Revue périodique : à chaque nouvelle évaluation, ne mettez à jour que les
// statuts, les justifications et `declaration.dateEvaluation`. Le reste de la
// structure ne doit pas bouger, sans quoi useRgesnScore recalculerait un score
// qui ne correspond plus à ce qui est publié.

export type Priorite = 'prioritaire' | 'recommande' | 'modere'

// 'non-evalue' est l'état par défaut de ce gabarit : le critère n'a pas encore
// été examiné. Il ne doit plus apparaître une fois la déclaration publiée.
export type Statut = 'conforme' | 'non-conforme' | 'non-applicable' | 'non-evalue'

export interface Critere {
  id: string
  libelle: string
  priorite: Priorite
  statut: Statut
  /** Texte publié. Vide si le critère est non applicable ou non évalué. */
  justification: string
  /** Renseigné uniquement si statut vaut 'non-applicable'. */
  motifNonApplicable?: string
}

export interface Thematique {
  numero: number
  titre: string
  criteres: Critere[]
}

// Les libellés ci-dessous sont recopiés mot pour mot depuis les fiches
// pratiques du PDF officiel de l'Arcep. Ne les reformulez pas, y compris
// quand ils portent une imprécision du document source : par exemple
// « limite-il » en 9.4 et « dont son WUE » en 8.4 sont des fautes d'accord du
// PDF officiel, conservées telles quelles. La cohérence avec le référentiel
// publié prime sur l'élégance de la phrase.

export const POIDS: Record<Priorite, number> = {
  prioritaire: 1.5,
  recommande: 1.25,
  modere: 1,
}

// Exemple à remplacer par les informations de votre propre déclaration.
export const declaration = {
  service: 'exemple.fr',
  url: 'https://exemple.fr',
  perimetre: "Décrivez ici le périmètre couvert : le site évalué, et ce qui en est explicitement exclu (sites clients, outils internes, etc.).",
  entite: 'Nom de la société (forme juridique)',
  referents: ['Prénom Nom'],
  contact: 'contact@exemple.fr',
  dateEvaluation: '2026-01-01',
  cadenceRevue: 'annuelle',
  echantillons: [
    "La page d'accueil",
    '/une-autre-page, à adapter à votre site',
  ],
  objectif: { score: 90, echeance: '2028' },
  premiereRevue: 'janvier 2027',
}

// Budget de performance à publier. Il porte sur ce que demande le critère 6.1
// : le poids transféré et le nombre de requêtes par écran. Le nombre
// d'éléments du DOM n'est généralement pas plafonné, seulement relevé et
// publié tel quel dans `mesures`.
export const budget = {
  poidsKo: 250,
  requetes: 30,
}

// Exemple de relevé. À mesurer sur votre build de production, cache vide,
// poids compressé (Brotli ou gzip selon ce que sert votre hébergeur).
export const mesures = {
  date: '2026-01-01',
  pages: [
    { route: "/, la page d'accueil", poidsKo: 0, requetes: 0, elements: 0 },
  ],
}

export const referentiel: Thematique[] = [
  {
    numero: 1,
    titre: 'Stratégie',
    criteres: [
      {
        id: '1.1',
        libelle: "Le service numérique a-t-il été évalué favorablement en termes d'utilité en tenant compte de ses impacts environnementaux ?",
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '1.2',
        libelle: 'Le service numérique a-t-il défini ses cibles utilisatrices, les besoins métiers et les attentes réelles des utilisateurs-cibles ?',
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '1.3',
        libelle: 'Le service numérique a-t-il au moins un référent identifié en écoconception numérique ?',
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '1.4',
        libelle: "Le service numérique réalise-t-il régulièrement des revues pour s'assurer du respect de sa démarche d'écoconception ?",
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '1.5',
        libelle: "Le service numérique s'est-il fixé des objectifs en matière de réduction ou de limitation de ses propres impacts environnementaux ?",
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '1.6',
        libelle: 'Le service numérique collecte-t-il la donnée de façon responsable et raisonnée ?',
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '1.7',
        libelle: 'Le service numérique a-t-il recours à un niveau de chiffrement adapté à ses besoins ?',
        priorite: 'modere',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '1.8',
        libelle: "Le service numérique a-t-il mis en place des efforts d'open source ?",
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '1.9',
        libelle: 'Le service numérique a-t-il été conçu avec des technologies standard interopérables plutôt que des technologies spécifiques et fermées ?',
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '1.10',
        libelle: 'Le service numérique repose-t-il sur des API documentées et ouvertes pour interagir avec le matériel ?',
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
    ],
  },
  {
    numero: 2,
    titre: 'Spécifications',
    criteres: [
      {
        id: '2.1',
        libelle: 'Le service numérique a-t-il défini la liste des profils de matériels que les utilisateurs vont pouvoir employer pour y accéder ?',
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '2.2',
        libelle: "Le service numérique est-il utilisable sur d'anciens modèles de terminaux ?",
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '2.3',
        libelle: 'Le service numérique est-il utilisable via une connexion bas débit ou hors connexion ?',
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '2.4',
        libelle: "Le service numérique est-il utilisable sur d'anciennes versions de système d'exploitation et de navigateurs web ?",
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '2.5',
        libelle: "Le service numérique s'adapte-t-il à différents types de terminaux d'affichage ?",
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '2.6',
        libelle: 'Le service numérique a-t-il été conçu avec une revue de conception et une revue de code comprenant parmi ses objectifs la réduction des impacts environnementaux de chaque fonctionnalité ?',
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '2.7',
        libelle: 'Le service numérique a-t-il prévu une stratégie de maintenance et de décommissionnement ?',
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '2.8',
        libelle: 'Le service numérique impose-t-il à ses fournisseurs de garantir une démarche de réduction de leurs impacts environnementaux ?',
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '2.9',
        libelle: "Le service numérique a-t-il pris en compte les impacts environnementaux des composants d'interface prêts à l'emploi utilisés ?",
        priorite: 'modere',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '2.10',
        libelle: 'Le service numérique a-t-il pris en compte les impacts environnementaux des services tiers utilisés lors de leur sélection ?',
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
    ],
  },
  {
    numero: 3,
    titre: 'Architecture',
    criteres: [
      {
        id: '3.1',
        libelle: 'Le service numérique repose-t-il sur une architecture, des ressources ou des composants conçus pour réduire leurs propres impacts environnementaux ?',
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '3.2',
        libelle: 'Le service numérique fonctionne-t-il sur une architecture pouvant adapter la quantité de ressources utilisées à la consommation du service ?',
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '3.3',
        libelle: "Le service numérique est-il en mesure de supporter l'évolution technique des protocoles ?",
        priorite: 'modere',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '3.4',
        libelle: 'Le service numérique garantit-il la mise à disposition de mises à jour correctives pendant toute la durée de vie prévue des équipements et des logiciels liés au service ?',
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '3.5',
        libelle: "Le service numérique propose-t-il d'installer des mises à jour correctives indépendamment des mises à jour évolutives de façon transparente ?",
        priorite: 'modere',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '3.6',
        libelle: 'Le service numérique propose-t-il les mises à jour incrémentielles, afin de ne pas remplacer tout le code à chaque mise à jour ?',
        priorite: 'modere',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '3.7',
        libelle: 'Le service numérique optimise-t-il la sollicitation des environnements de développement, de préproduction ou de test en fonction de ses besoins ?',
        priorite: 'modere',
        statut: 'non-evalue',
        justification: '',
      },
    ],
  },
  {
    numero: 4,
    titre: 'Expérience et interface utilisateur',
    criteres: [
      {
        id: '4.1',
        libelle: 'Le service numérique comporte-t-il uniquement des animations, vidéos et sons dont la lecture automatique est désactivée ?',
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '4.2',
        libelle: 'Le service numérique affiche-t-il uniquement des contenus sans défilement infini ?',
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '4.3',
        libelle: 'Le service numérique optimise-t-il le parcours de navigation pour chaque fonctionnalité principale ?',
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '4.4',
        libelle: "Le service numérique permet-il à l'utilisateur de décider de l'activation d'un service tiers ?",
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '4.5',
        libelle: "Le service numérique utilise-t-il majoritairement des composants fonctionnels natifs du système d'exploitation, du navigateur ou du langage utilisé ?",
        priorite: 'modere',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '4.6',
        libelle: "Le service numérique utilise-t-il uniquement du contenu vidéo, audio et animé porteur d'informations ?",
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '4.7',
        libelle: "Le service numérique opte-t-il pour les choix les plus sobres entre le texte, l'image, l'audio ou la vidéo, selon les besoins utilisateurs ?",
        priorite: 'modere',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '4.8',
        libelle: 'Le service numérique limite-t-il le nombre des polices de caractères téléchargées ?',
        priorite: 'modere',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '4.9',
        libelle: 'Le service numérique limite-t-il les requêtes serveur lors de la saisie utilisateur ?',
        priorite: 'modere',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '4.10',
        libelle: "Le service numérique informe-t-il l'utilisateur du format de saisie attendu, en évitant les requêtes serveur inutiles pour la soumission d'un formulaire ?",
        priorite: 'modere',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '4.11',
        libelle: "Le service numérique informe-t-il l'utilisateur, avant le transfert, des poids et formats de fichier attendus ?",
        priorite: 'modere',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '4.12',
        libelle: "Le service numérique indique-t-il à l'utilisateur que l'utilisation d'une fonctionnalité a des impacts environnementaux importants ?",
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '4.13',
        libelle: "Le service numérique limite-t-il le recours aux notifications, tout en laissant la possibilité à l'utilisateur de les désactiver ?",
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '4.14',
        libelle: 'Le service numérique évite-t-il le recours à des procédés manipulatoires dans son interface utilisateur ?',
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '4.15',
        libelle: "Le service numérique fournit-il à l'utilisateur un moyen de contrôle sur ses usages afin de suivre et de réduire les impacts environnementaux associés ?",
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
    ],
  },
  {
    numero: 5,
    titre: 'Contenus',
    criteres: [
      {
        id: '5.1',
        libelle: 'Le service numérique utilise-t-il un format de fichier adapté au contenu et au contexte de visualisation de chaque image ?',
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '5.2',
        libelle: 'Le service numérique propose-t-il des images dont le niveau de compression est adapté au contenu et au contexte de visualisation ?',
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '5.3',
        libelle: 'Le service numérique utilise-t-il, pour chaque vidéo, une définition adaptée au contenu et au contexte de visualisation ?',
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '5.4',
        libelle: 'Le service numérique propose-t-il des vidéos dont le mode de compression est efficace et adapté au contenu et au contexte de visualisation ?',
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '5.5',
        libelle: 'Le service numérique propose-t-il un mode « écoute seule » pour ses vidéos ?',
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '5.6',
        libelle: "Le service numérique propose-t-il des contenus audios dont le mode de compression est adapté au contenu et au contexte d'écoute ?",
        priorite: 'modere',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '5.7',
        libelle: "Le service numérique utilise-t-il un format de fichier adapté au contenu et au contexte d'utilisation pour chaque document ?",
        priorite: 'modere',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '5.8',
        libelle: "Le service numérique a-t-il une stratégie d'archivage et de suppression, automatique ou manuelle, des contenus obsolètes ou périmés ?",
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
    ],
  },
  {
    numero: 6,
    titre: 'Frontend',
    criteres: [
      {
        id: '6.1',
        libelle: "Le service numérique s'astreint-il à un poids maximum et une limite de requête par écran ?",
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '6.2',
        libelle: "Le service numérique utilise-t-il des mécanismes de mise en cache pour la totalité des contenus transférés dont il a le contrôle ?",
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '6.3',
        libelle: "Le service numérique a-t-il mis en place des techniques de compression pour les ressources transférées dont il a le contrôle ?",
        priorite: 'modere',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '6.4',
        libelle: "Le service numérique affiche-t-il majoritairement des images dont les dimensions d'origine correspondent aux dimensions du contexte d'affichage ?",
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '6.5',
        libelle: 'Le service numérique évite-t-il de déclencher le chargement de ressources et de contenus inutilisés pour chaque fonctionnalité ?',
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '6.6',
        libelle: "Le service numérique restreint-il l'usage des capteurs des terminaux utilisateurs au besoin du service ?",
        priorite: 'modere',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '6.7',
        libelle: "Le service numérique héberge-t-il toutes les ressources statiques transférées dont il est l'émetteur sur un même domaine ?",
        priorite: 'modere',
        statut: 'non-evalue',
        justification: '',
      },
    ],
  },
  {
    numero: 7,
    titre: 'Backend',
    criteres: [
      {
        id: '7.1',
        libelle: 'Le service numérique a-t-il recours à un système de cache serveur pour les données les plus utilisées ?',
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '7.2',
        libelle: 'Le service numérique met-il en place des durées de conservation sur les données et documents en vue de leur suppression ou archivage passé ce délai ?',
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '7.3',
        libelle: "Le service numérique informe-t-il l'utilisateur d'un traitement en cours en arrière-plan ?",
        priorite: 'modere',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '7.4',
        libelle: "Le service numérique s'appuie-t-il sur un mécanisme de consensus qui minimise sa consommation de ressources ?",
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
    ],
  },
  {
    numero: 8,
    titre: 'Hébergement',
    criteres: [
      {
        id: '8.1',
        libelle: 'Le service numérique utilise-t-il un hébergement ayant une démarche de réduction de son empreinte environnementale ?',
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '8.2',
        libelle: 'Le service numérique utilise-t-il un hébergement qui fournit une politique de gestion durable des équipements ?',
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '8.3',
        libelle: 'Le service numérique utilise-t-il un hébergement dont le PUE (Power Usage Effectiveness) est minimisé ?',
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '8.4',
        libelle: 'Le service numérique utilise-t-il un hébergement dont son WUE (Water Usage Effectiveness) est minimisé ?',
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '8.5',
        libelle: "Le service numérique utilise-t-il un hébergement dont l'origine de consommation d'électricité est documentée et majoritairement d'origine renouvelable ?",
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '8.6',
        libelle: 'Le service numérique utilise-t-il un hébergement dont la localisation géographique est cohérente avec ses activités et qui minimise son empreinte environnementale ?',
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '8.7',
        libelle: 'Le service numérique utilise-t-il un hébergement qui traite efficacement la chaleur produite par les serveurs ?',
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '8.8',
        libelle: 'Le service numérique héberge-t-il de façon distincte les données « chaudes » et « froides » ?',
        priorite: 'modere',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '8.9',
        libelle: 'Le service numérique duplique-t-il les données uniquement lorsque cela est nécessaire ?',
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '8.10',
        libelle: "Le service numérique tient-il compte des contraintes externes pour minimiser l'impact environnemental des calculs et transferts de données asynchrones ?",
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
    ],
  },
  {
    numero: 9,
    titre: 'Algorithmie',
    criteres: [
      {
        id: '9.1',
        libelle: "Le service numérique a-t-il interrogé la nécessité d'une phase d'entraînement pour éviter un usage non justifié et déraisonné ?",
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '9.2',
        libelle: "Le service numérique utilise-t-il une phase d'apprentissage avec un niveau de complexité minimisé et proportionné à l'usage effectif du service ?",
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '9.3',
        libelle: "Le service numérique a-t-il mis en place des mécanismes visant à limiter la quantité d'entraînement nécessaire à son fonctionnement ?",
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '9.4',
        libelle: "Le service numérique limite-il la quantité de données utilisées pour la phase d'apprentissage au strict nécessaire ?",
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '9.5',
        libelle: "Le service numérique optimise-t-il l'occurrence de mise à jour et de réentraînement des modèles en fonction de ses besoins et des cibles utilisatrices ?",
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '9.6',
        libelle: "Le service numérique utilise-t-il des techniques de compression pour les modèles utilisés lors de la phase d'entraînement ?",
        priorite: 'recommande',
        statut: 'non-evalue',
        justification: '',
      },
      {
        id: '9.7',
        libelle: "Le service numérique utilise-t-il une stratégie d'inférence optimisée en termes de consommation de ressources et des cibles utilisatrices ?",
        priorite: 'prioritaire',
        statut: 'non-evalue',
        justification: '',
      },
    ],
  },
]
