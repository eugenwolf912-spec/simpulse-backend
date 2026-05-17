import { Router } from 'express'
import { createPost, listPosts } from '../controllers/postController'
import { validateBody, validateQuery } from '../middleware/requestValidation'
import { createPostSchema, postQuerySchema } from '../types/schemas'
import { asyncHandler } from '../utils/asyncHandler'

const postRoutes = Router()

postRoutes.get('/', validateQuery(postQuerySchema), asyncHandler(listPosts))
postRoutes.post('/', validateBody(createPostSchema), asyncHandler(createPost))

export { postRoutes }
