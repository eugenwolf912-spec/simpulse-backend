"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventService = exports.EventService = void 0;
const prisma_1 = require("../db/prisma");
const regionService_1 = require("./regionService");
const AppError_1 = require("../utils/AppError");
class EventService {
    normalizeRegionForRead(region) {
        const normalized = (region || '').trim();
        return normalized || 'Unknown';
    }
    normalizeEventPayload(event) {
        return {
            ...event,
            region: this.normalizeRegionForRead(event.region),
        };
    }
    async listEvents(options = {}) {
        const limit = options.limit ?? 100;
        const region = options.region?.trim();
        const events = await prisma_1.prisma.event.findMany({
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
        });
        return events.map((event) => this.normalizeEventPayload(event));
    }
    async getEventById(id) {
        const event = await prisma_1.prisma.event.findUnique({ where: { id } });
        if (!event) {
            throw new AppError_1.AppError('Event not found', 404);
        }
        return this.normalizeEventPayload(event);
    }
    async createEvent(input) {
        const region = regionService_1.regionService.normalizeForStorage(input.region);
        if (input.endTime <= input.startTime) {
            throw new AppError_1.AppError('endTime must be after startTime', 400);
        }
        const created = await prisma_1.prisma.event.create({
            data: {
                title: input.title.trim(),
                description: input.description?.trim() || '',
                region,
                slurl: input.slurl.trim(),
                startTime: input.startTime,
                endTime: input.endTime,
                tags: input.tags?.trim() || '',
            },
        });
        return this.normalizeEventPayload(created);
    }
    async updateEvent(id, input) {
        const existing = await prisma_1.prisma.event.findUnique({ where: { id } });
        if (!existing) {
            throw new AppError_1.AppError('Event not found', 404);
        }
        const nextStart = input.startTime ?? existing.startTime;
        const nextEnd = input.endTime ?? existing.endTime;
        if (nextEnd <= nextStart) {
            throw new AppError_1.AppError('endTime must be after startTime', 400);
        }
        const updated = await prisma_1.prisma.event.update({
            where: { id },
            data: {
                title: input.title?.trim(),
                description: input.description?.trim(),
                region: input.region ? regionService_1.regionService.normalizeForStorage(input.region) : undefined,
                slurl: input.slurl?.trim(),
                startTime: input.startTime,
                endTime: input.endTime,
                tags: input.tags?.trim(),
            },
        });
        return this.normalizeEventPayload(updated);
    }
    async deleteEvent(id) {
        try {
            await prisma_1.prisma.event.delete({ where: { id } });
        }
        catch {
            throw new AppError_1.AppError('Event not found', 404);
        }
    }
}
exports.EventService = EventService;
exports.eventService = new EventService();
