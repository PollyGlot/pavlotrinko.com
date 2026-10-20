// Source unique des langues : astro.config.ts, les routes et les collections la lisent.
export const locales = ['fr', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'fr'

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export const localeNames: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
}

// Pour Intl (dates) et og:locale.
export const localeTags: Record<Locale, string> = {
  fr: 'fr_FR',
  en: 'en_US',
}
