import { getRelativeLocaleUrl } from 'astro:i18n'
import { type Locale, locales } from '../i18n/locales'

// Les chemins d'une page sont écrits sans la langue (`posts/hello-world/`) :
// la même chaîne sert au lien, au sélecteur de langue et aux balises hreflang.
export function localeUrl(lang: Locale, path = ''): string {
  return getRelativeLocaleUrl(lang, path)
}

export function formatDate(date: Date, lang: Locale): string {
  return new Intl.DateTimeFormat(lang, { dateStyle: 'long' }).format(date)
}

// getStaticPaths des pages qui existent dans toutes les langues.
export function localeStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }))
}

// Les fichiers (rss.xml) échappent à trailingSlash: getRelativeLocaleUrl y
// ajouterait un « / » final qui casse l'URL.
export function feedUrl(lang: Locale): string {
  return `/${lang}/rss.xml`
}
