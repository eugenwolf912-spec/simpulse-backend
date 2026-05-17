import type { Request, Response } from 'express'
import { eventService } from '../services/eventService'

export async function listEvents(req: Request, res: Response) {
  const region = typeof req.query.region === 'string' ? req.query.region : undefined
  const limit = typeof req.query.limit === 'number' ? req.query.limit : undefined

  const events = await eventService.listEvents({ region, limit })
  return res.status(200).json({ success: true, data: events })
}

export async function getEventById(req: Request, res: Response) {
  const event = await eventService.getEventById(req.params.id)
  return res.status(200).json({ success: true, data: event })
}

export async function createEvent(req: Request, res: Response) {
  const event = await eventService.createEvent(req.body)
  return res.status(201).json({ success: true, data: event })
}

export async function updateEvent(req: Request, res: Response) {
  const event = await eventService.updateEvent(req.params.id, req.body)
  return res.status(200).json({ success: true, data: event })
}

export async function deleteEvent(req: Request, res: Response) {
  await eventService.deleteEvent(req.params.id)
  return res.status(200).json({ success: true, data: null })
}
