import type { Locale } from './locales'

// Toutes les chaînes d'interface. Une clé manquante dans une langue est une
// erreur de type : `satisfies` impose les mêmes clés aux deux dictionnaires.
const fr = {
  'site.title': 'Pavlo Trinko',
  'site.description':
    'Pavlo Trinko (PollyGlot), Product AI Builder : des produits construits en pilotant des agents IA.',
  'nav.home': 'Accueil',
  'nav.posts': 'Articles',
  'nav.notes': 'Notes',
  'nav.projects': 'Projets',
  'nav.contact': 'Contact',
  'nav.language': 'Langue',
  'nav.main': 'Navigation principale',
  'nav.social': 'Réseaux',
  // La phrase d'accueil et sa rature : « J'écris le code » corrigé en « les règles ».
  'home.headlineStart': "J'écris",
  'home.headlineOld': 'le code',
  'home.headlineNew': 'les règles',
  'home.headlineEnd': '.',
  'home.headlineSecond': 'Les agents écrivent le code.',
  'home.intro':
    'Je construis des produits, surtout des apps mobiles et desktop, en pilotant des agents IA. Ici : mes projets, mes articles et mes notes de méthode.',
  'home.latestPosts': 'Derniers articles',
  'home.latestNotes': 'Dernières notes',
  'posts.title': 'Articles',
  'posts.empty': 'Aucun article pour le moment.',
  'notes.title': 'Notes',
  'notes.empty': 'Aucune note pour le moment.',
  'projects.title': 'Projets',
  'projects.placeholder': 'Exemple, pas un vrai projet',
  'contact.title': 'Contact',
  'contact.cta': 'Un projet, une mission, une question ? Écrivez-moi.',
  'contact.social': 'Ou retrouvez-moi ici :',
  'contact.pending': 'Adresse de contact à venir.',
  'footer.contact': 'Me contacter',
  'footer.rss': 'Flux RSS',
  'post.updated': 'Mis à jour le',
  'notFound.title': 'Page introuvable',
  'notFound.back': "Retour à l'accueil",
} as const

const en = {
  'site.title': 'Pavlo Trinko',
  'site.description':
    'Pavlo Trinko (PollyGlot), Product AI Builder: products built by steering AI agents.',
  'nav.home': 'Home',
  'nav.posts': 'Posts',
  'nav.notes': 'Notes',
  'nav.projects': 'Projects',
  'nav.contact': 'Contact',
  'nav.language': 'Language',
  'nav.main': 'Main navigation',
  'nav.social': 'Social',
  'home.headlineStart': 'I write',
  'home.headlineOld': 'the code',
  'home.headlineNew': 'the rules',
  'home.headlineEnd': '.',
  'home.headlineSecond': 'The agents write the code.',
  'home.intro':
    'I build products, mostly mobile and desktop apps, by steering AI agents. Here: my projects, my posts and my notes on the method.',
  'home.latestPosts': 'Latest posts',
  'home.latestNotes': 'Latest notes',
  'posts.title': 'Posts',
  'posts.empty': 'No posts yet.',
  'notes.title': 'Notes',
  'notes.empty': 'No notes yet.',
  'projects.title': 'Projects',
  'projects.placeholder': 'Placeholder, not a real project',
  'contact.title': 'Contact',
  'contact.cta': 'A project, a mission, a question? Write to me.',
  'contact.social': 'Or find me here:',
  'contact.pending': 'Contact address coming soon.',
  'footer.contact': 'Get in touch',
  'footer.rss': 'RSS feed',
  'post.updated': 'Updated on',
  'notFound.title': 'Page not found',
  'notFound.back': 'Back to the home page',
} as const satisfies Record<keyof typeof fr, string>

const ui = { fr, en } satisfies Record<Locale, Record<keyof typeof fr, string>>

export type UiKey = keyof typeof fr

export function useTranslations(lang: Locale) {
  return (key: UiKey): string => ui[lang][key]
}
