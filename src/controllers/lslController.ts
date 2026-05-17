import type { Request, Response } from 'express'
import { eventService } from '../services/eventService'
import { formatBoardTime } from '../utils/formatBoardTime'

export async function listLslEvents(req: Request, res: Response) {
  const region = String(req.query.region)
  const limit = typeof req.query.limit === 'number' ? req.query.limit : 100

  const events = await eventService.listEvents({ region, limit })
  const payload = events.map((event) => `${event.title}|${formatBoardTime(event.startTime)}`).join('\n')

  return res.status(200).type('text/plain').send(payload)
}
