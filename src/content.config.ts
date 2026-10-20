import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

// Chaque collection range ses fichiers par langue : `<collection>/<lang>/<slug>.mdx`.
// L'id d'une entrée vaut donc `<lang>/<slug>` (voir src/lib/content.ts), et une
// traduction est le fichier de même nom dans l'autre dossier de langue.
const pattern = '**/*.{md,mdx}'

const posts = defineCollection({
  loader: glob({ pattern, base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
})

const notes = defineCollection({
  loader: glob({ pattern, base: './src/content/notes' }),
  schema: z.object({
    // Numéro public de la note (« #12 »), unique par langue et identique entre
    // les traductions ; l'unicité est vérifiée au build par getNotes().
    number: z.number().int().positive(),
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern, base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    // Une entrée d'exemple affiche un badge « exemple » : PRODUCT.md interdit
    // de présenter un faux projet comme réel.
    placeholder: z.boolean().default(false),
    url: z.url().optional(),
    repo: z.url().optional(),
    order: z.number().int().default(0),
  }),
})

export const collections = { posts, notes, projects }
