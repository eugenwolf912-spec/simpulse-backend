"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listEvents = listEvents;
exports.getEventById = getEventById;
exports.createEvent = createEvent;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;
const eventService_1 = require("../services/eventService");
async function listEvents(req, res) {
    const region = typeof req.query.region === 'string' ? req.query.region : undefined;
    const limit = typeof req.query.limit === 'number' ? req.query.limit : undefined;
    const events = await eventService_1.eventService.listEvents({ region, limit });
    return res.status(200).json({ success: true, data: events });
}
async function getEventById(req, res) {
    const event = await eventService_1.eventService.getEventById(req.params.id);
    return res.status(200).json({ success: true, data: event });
}
async function createEvent(req, res) {
    const event = await eventService_1.eventService.createEvent(req.body);
    return res.status(201).json({ success: true, data: event });
}
async function updateEvent(req, res) {
    const event = await eventService_1.eventService.updateEvent(req.params.id, req.body);
    return res.status(200).json({ success: true, data: event });
}
async function deleteEvent(req, res) {
    await eventService_1.eventService.deleteEvent(req.params.id);
    return res.status(200).json({ success: true, data: null });
}
