import { Router } from 'express'
import { listLslEvents } from '../controllers/lslController'
import { validateQuery } from '../middleware/requestValidation'
import { lslRateLimiter } from '../middleware/security'
import { lslQuerySchema } from '../types/schemas'
import { asyncHandler } from '../utils/asyncHandler'

const lslRoutes = Router()

lslRoutes.get('/events', lslRateLimiter, validateQuery(lslQuerySchema), asyncHandler(listLslEvents))

export { lslRoutes }
