import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { type Locale, locales } from '../../i18n/locales'
import { useTranslations } from '../../i18n/ui'
import { entrySlug, getNotes, getPosts } from '../../lib/content'
import { localeUrl } from '../../lib/paths'

export function getStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }))
}

// Un flux par langue, articles et notes mêlés par date.
export async function GET(context: APIContext) {
  const lang = context.params.lang as Locale
  const t = useTranslations(lang)
  const posts = (await getPosts(lang)).map((p) => ({
    title: p.data.title,
    description: p.data.description,
    pubDate: p.data.date,
    link: localeUrl(lang, `posts/${entrySlug(p)}/`),
  }))
  const notes = (await getNotes(lang)).map((n) => ({
    title: `#${n.data.number} ${n.data.title}`,
    description: n.data.description,
    pubDate: n.data.date,
    link: localeUrl(lang, `notes/${entrySlug(n)}/`),
  }))
  return rss({
    title: t('site.title'),
    description: t('site.description'),
    // Lien du canal : l'accueil de la langue ; les liens d'items restent relatifs au site.
    site: new URL(localeUrl(lang), context.site).href,
    items: [...posts, ...notes].sort(
      (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf(),
    ),
    customData: `<language>${lang}</language>`,
  })
}
