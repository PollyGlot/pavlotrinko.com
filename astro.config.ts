import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import { defaultLocale, locales } from './src/i18n/locales'

const site = 'https://pavlotrinko.com'

export default defineConfig({
  // URL canonique : sert au sitemap, au RSS et aux balises Open Graph absolues.
  // TODO(domain): le domaine n'est pas encore acheté ; tant qu'il ne pointe pas
  // sur le Worker, ces URL absolues mènent nulle part.
  site,
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    locales: [...locales],
    defaultLocale,
    routing: {
      prefixDefaultLocale: true,
      // La redirection de / est écrite à la main (src/pages/index.astro) : celle
      // d'Astro exige quand même cette page et entre en conflit avec elle.
      redirectToDefaultLocale: false,
    },
  },
  markdown: {
    shikiConfig: {
      // Thèmes neutres par défaut, pas une direction visuelle : base.css bascule
      // sur le thème sombre via prefers-color-scheme.
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
  integrations: [
    mdx(),
    sitemap({
      // La racine n'est qu'une redirection vers /fr/ : hors sitemap.
      filter: (page) => new URL(page).pathname !== '/',
      i18n: {
        defaultLocale,
        locales: { fr: 'fr-FR', en: 'en-US' },
      },
    }),
  ],
})
