// Identité publique : Pavlo Trinko, signé PollyGlot (jamais « Paul », voir PRODUCT.md).
export const site = {
  author: 'Pavlo Trinko',
  handle: 'PollyGlot',
  github: 'https://github.com/PollyGlot',
  // TODO(contact): adresse publique à choisir (alias dédié au site, pas l'adresse
  // personnelle). Tant qu'elle vaut null, la page contact affiche un texte d'attente.
  contactEmail: null as string | null,
  // Les réseaux, dans l'ordre d'affichage. LinkedIn sert aussi de contact tant
  // qu'il n'y a pas d'adresse publique.
  social: [
    {
      name: 'GitHub',
      handle: '@PollyGlot',
      url: 'https://github.com/PollyGlot',
    },
    { name: 'X', handle: '@PollyGlot', url: 'https://x.com/PollyGlot' },
    {
      name: 'Threads',
      handle: '@polly_glot',
      url: 'https://www.threads.net/@polly_glot',
    },
    {
      name: 'LinkedIn',
      handle: 'Pavlo Trinko',
      url: 'https://www.linkedin.com/in/pavlo-trinko-aa4826139',
    },
  ],
}
