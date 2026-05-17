"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lslQuerySchema = exports.createPostSchema = exports.postQuerySchema = exports.updateEventSchema = exports.createEventSchema = exports.eventParamsSchema = exports.eventQuerySchema = void 0;
const zod_1 = require("zod");
exports.eventQuerySchema = zod_1.z.object({
    region: zod_1.z.string().optional(),
    limit: zod_1.z.coerce.number().int().min(1).max(500).optional(),
});
exports.eventParamsSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
});
exports.createEventSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().optional().default(''),
    region: zod_1.z.string().min(1),
    slurl: zod_1.z.string().min(1),
    startTime: zod_1.z.coerce.date(),
    endTime: zod_1.z.coerce.date(),
    tags: zod_1.z.string().optional().default(''),
});
exports.updateEventSchema = exports.createEventSchema.partial();
exports.postQuerySchema = zod_1.z.object({
    limit: zod_1.z.coerce.number().int().min(1).max(200).optional(),
});
exports.createPostSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1),
    content: zod_1.z.string().min(1),
});
exports.lslQuerySchema = zod_1.z.object({
    region: zod_1.z.string().min(1),
    limit: zod_1.z.coerce.number().int().min(1).max(200).optional(),
});
