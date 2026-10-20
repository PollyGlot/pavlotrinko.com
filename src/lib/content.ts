import { type CollectionEntry, getCollection } from 'astro:content'
import { isLocale, type Locale } from '../i18n/locales'

type Localized = 'posts' | 'notes' | 'projects'

// `fr/hello-world` -> { lang: 'fr', slug: 'hello-world' }. Un fichier hors d'un
// dossier de langue casse le build plutôt que de produire une page orpheline.
export function splitId(id: string): { lang: Locale; slug: string } {
  const [lang, ...rest] = id.split('/')
  if (!lang || !isLocale(lang) || rest.length === 0) {
    throw new Error(
      `Content entry "${id}" must live in a language folder (fr/ or en/).`,
    )
  }
  return { lang, slug: rest.join('/') }
}

export function entryLang(entry: { id: string }): Locale {
  return splitId(entry.id).lang
}

export function entrySlug(entry: { id: string }): string {
  return splitId(entry.id).slug
}

// Les brouillons restent visibles en dev, jamais au build.
function published(entry: { data: { draft?: boolean } }): boolean {
  return import.meta.env.DEV || !entry.data.draft
}

async function localized<C extends Localized>(
  collection: C,
  lang: Locale,
): Promise<CollectionEntry<C>[]> {
  const all = await getCollection(collection)
  return all.filter((entry) => entryLang(entry) === lang)
}

export async function getPosts(lang: Locale) {
  const posts = (await localized('posts', lang)).filter(published)
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

export async function getNotes(lang: Locale) {
  const notes = (await localized('notes', lang)).filter(published)
  const seen = new Map<number, string>()
  for (const note of notes) {
    const other = seen.get(note.data.number)
    if (other) {
      throw new Error(
        `Notes "${other}" and "${note.id}" share number ${note.data.number}.`,
      )
    }
    seen.set(note.data.number, note.id)
  }
  return notes.sort((a, b) => b.data.number - a.data.number)
}

export async function getProjects(lang: Locale) {
  const projects = await localized('projects', lang)
  return projects.sort((a, b) => a.data.order - b.data.order)
}

// Les langues dans lesquelles existe une entrée de même slug : le sélecteur de
// langue pointe vers la traduction quand elle existe, sinon vers l'accueil.
export async function translationsOf(
  collection: 'posts' | 'notes',
  slug: string,
): Promise<Locale[]> {
  const all = await getCollection(collection)
  return all
    .filter((entry) => entrySlug(entry) === slug && published(entry))
    .map(entryLang)
}
