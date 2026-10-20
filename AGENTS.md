# AGENTS.md : pavlotrinko.com

Site personnel de Pavlo Trinko (signé PollyGlot, jamais « Paul ») : vitrine de
projets, articles longs et notes courtes, en français et en anglais. Astro
statique + MDX, servi par Cloudflare Workers (assets statiques, Worker
`pavlotrinko`). Produit, audience et principes : `PRODUCT.md`. Le design n'est
pas encore décidé : `src/styles/base.css` est volontairement neutre.

## Glossaire

- **Post (article)** : texte long, collection `posts`.
- **Note** : astuce courte, numérotée (`number`, affiché « #12 »), collection `notes`.
- **Project (projet)** : entrée de la vitrine, collection `projects` ;
  `placeholder: true` affiche le badge « exemple ».
- **Langue** : `fr` (par défaut) ou `en`, source unique `src/i18n/locales.ts`.
- **Traduction** : le fichier de même nom dans l'autre dossier de langue.

## Commandes

- `pnpm dev` : le site sur http://localhost:4321 (prendre un autre port avec `--port`
  si plusieurs agents tournent).
- Publier une note : un fichier `src/content/notes/<lang>/<slug>.mdx`, numéro
  suivant, puis push. Pas de CMS.
- Déployer : la CI, sur push de `main` (`wrangler deploy`). Jamais à la main
  depuis un agent ; `pnpm exec wrangler deploy --dry-run` pour vérifier la config.

## Vérifier

La porte est `pnpm check` (`scripts/check.sh`) : Biome (`biome ci`), `astro
check`, `astro build`, le moins cher d'abord, durée par étape, dernière ligne
`check: OK` ou `check: FAILED at step "<étape>"` avec la commande à relancer.
`pnpm check --fast` saute le build pendant le travail ; la porte complète passe
avant de pousser. La CI (`.github/workflows/ci.yml`) appelle la même commande.
`pnpm format` applique les correctifs sûrs de Biome. Un changement visible se
prouve sur les pages générées dans `dist/` (ou `pnpm preview`) dans les deux
langues, pas par le seul build.

## Patrons (le fichier à copier)

- **Une page présente dans les deux langues** : `src/pages/[lang]/contact.astro`
  (`getStaticPaths = localeStaticPaths`, `BaseLayout` avec un `path` sans langue).
- **Une page de contenu** : `src/pages/[lang]/posts/[slug].astro` ; `available`
  vient de `translationsOf()` pour que le sélecteur de langue et les hreflang ne
  pointent jamais vers une traduction absente.
- **Un champ de contenu** : le schéma Zod de `src/content.config.ts` ; les
  lectures passent par `src/lib/content.ts` (`getPosts`, `getNotes`,
  `getProjects`), jamais par `getCollection` nu, qui ignore langue et brouillons.
- **Un texte d'interface** : une clé dans les deux dictionnaires de
  `src/i18n/ui.ts` (une clé absente d'une langue est une erreur de type).
- **Un lien interne** : `localeUrl(lang, 'posts/')` de `src/lib/paths.ts`, jamais
  une URL écrite à la main.

## Les pièges de ce repo

- **Toutes les URL ont un préfixe de langue** (`prefixDefaultLocale: true`) :
  `/fr/...` et `/en/...` sont symétriques, une traduction se trouve en changeant
  le préfixe, et aucune URL française ne change le jour où l'on bascule la langue
  par défaut. La racine `/` redirige vers `/fr/` : 302 par `public/_redirects`,
  et meta refresh par `src/pages/index.astro` ; changer `defaultLocale` impose de
  mettre `_redirects` à jour.
- **Les slugs sont identiques entre langues** (nom de fichier en anglais) : le
  sélecteur de langue, les hreflang et le sitemap apparient les pages par slug.
- **`trailingSlash: 'always'`** : un fichier (`rss.xml`) se lie par `feedUrl()`,
  pas par `localeUrl()`, qui ajouterait un `/` final.
- **Dépôt public : runners hébergés, jamais self-hosted.** Pas d'`account_id`
  dans `wrangler.jsonc` : la CI lit les secrets `CLOUDFLARE_API_TOKEN` et
  `CLOUDFLARE_ACCOUNT_ID`.
- **Rien d'inventé** (`PRODUCT.md`) : ni témoignage, ni client, ni chiffre ; une
  entrée d'exemple porte `placeholder: true` ou un `TODO(content)`.
  `grep -rn "TODO(" src astro.config.ts wrangler.jsonc` liste ce qui reste à faire.

## Goût

Zéro JavaScript par défaut : une île seulement quand une page en a besoin.
L'écriture passe d'abord, le contact reste à un clic de chaque page (en-tête et
pied). Commentaires de code en français, sur le pourquoi.
