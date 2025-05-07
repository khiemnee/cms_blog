import {z} from 'zod'

export const postSchema = z.object({
    title : z.string().min(5).max(255),
    content : z.string(),
})

export type PostModel = z.infer<typeof postSchema>