"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listLslEvents = listLslEvents;
const eventService_1 = require("../services/eventService");
const formatBoardTime_1 = require("../utils/formatBoardTime");
async function listLslEvents(req, res) {
    const region = String(req.query.region);
    const limit = typeof req.query.limit === 'number' ? req.query.limit : 100;
    const events = await eventService_1.eventService.listEvents({ region, limit });
    const payload = events.map((event) => `${event.title}|${(0, formatBoardTime_1.formatBoardTime)(event.startTime)}`).join('\n');
    return res.status(200).type('text/plain').send(payload);
}
