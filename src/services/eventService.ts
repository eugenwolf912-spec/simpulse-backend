import type { Event } from '@prisma/client'
import { prisma } from '../db/prisma'
import { regionService } from './regionService'
import { AppError } from '../utils/AppError'

interface ListEventsOptions {
  region?: string
  limit?: number
}

interface CreateEventInput {
  title: string
  description?: string
  region: string
  slurl: string
  startTime: Date
  endTime: Date
  tags?: string
}

type UpdateEventInput = Partial<CreateEventInput>

export class EventService {
  private normalizeRegionForRead(region: string | null | undefined): string {
    const normalized = (region || '').trim()
    return normalized || 'Unknown'
  }

  private normalizeEventPayload<T extends Event>(event: T): T {
    return {
      ...event,
      region: this.normalizeRegionForRead(event.region),
    }
  }

  async listEvents(options: ListEventsOptions = {}): Promise<Event[]> {
    const limit = options.limit ?? 100
    const region = options.region?.trim()

    const events = await prisma.event.findMany({
      where: region
        ? {
            region: {
              equals: region,
            },
          }
        : undefined,
      orderBy: {
        startTime: 'asc',
      },
      take: limit,
    })

    return events.map((event) => this.normalizeEventPayload(event))
  }

  async getEventById(id: string): Promise<Event> {
    const event = await prisma.event.findUnique({ where: { id } })
    if (!event) {
      throw new AppError('Event not found', 404)
    }

    return this.normalizeEventPayload(event)
  }

  async createEvent(input: CreateEventInput): Promise<Event> {
    const region = regionService.normalizeForStorage(input.region)

    if (input.endTime <= input.startTime) {
      throw new AppError('endTime must be after startTime', 400)
    }

    const created = await prisma.event.create({
      data: {
        title: input.title.trim(),
        description: input.description?.trim() || '',
        region,
        slurl: input.slurl.trim(),
        startTime: input.startTime,
        endTime: input.endTime,
        tags: input.tags?.trim() || '',
      },
    })

    return this.normalizeEventPayload(created)
  }

  async updateEvent(id: string, input: UpdateEventInput): Promise<Event> {
    const existing = await prisma.event.findUnique({ where: { id } })
    if (!existing) {
      throw new AppError('Event not found', 404)
    }

    const nextStart = input.startTime ?? existing.startTime
    const nextEnd = input.endTime ?? existing.endTime

    if (nextEnd <= nextStart) {
      throw new AppError('endTime must be after startTime', 400)
    }

    const updated = await prisma.event.update({
      where: { id },
      data: {
        title: input.title?.trim(),
        description: input.description?.trim(),
        region: input.region ? regionService.normalizeForStorage(input.region) : undefined,
        slurl: input.slurl?.trim(),
        startTime: input.startTime,
        endTime: input.endTime,
        tags: input.tags?.trim(),
      },
    })

    return this.normalizeEventPayload(updated)
  }

  async deleteEvent(id: string): Promise<void> {
    try {
      await prisma.event.delete({ where: { id } })
    } catch {
      throw new AppError('Event not found', 404)
    }
  }
}

export const eventService = new EventService()
