import { Router } from 'express'
import {
  createEvent,
  deleteEvent,
  getEventById,
  listEvents,
  updateEvent,
} from '../controllers/eventController'
import { validateBody, validateParams, validateQuery } from '../middleware/requestValidation'
import {
  createEventSchema,
  eventParamsSchema,
  eventQuerySchema,
  updateEventSchema,
} from '../types/schemas'
import { asyncHandler } from '../utils/asyncHandler'

const eventRoutes = Router()

eventRoutes.get('/', validateQuery(eventQuerySchema), asyncHandler(listEvents))
eventRoutes.get('/:id', validateParams(eventParamsSchema), asyncHandler(getEventById))
eventRoutes.post('/', validateBody(createEventSchema), asyncHandler(createEvent))
eventRoutes.put(
  '/:id',
  validateParams(eventParamsSchema),
  validateBody(updateEventSchema),
  asyncHandler(updateEvent),
)
eventRoutes.delete('/:id', validateParams(eventParamsSchema), asyncHandler(deleteEvent))

export { eventRoutes }
