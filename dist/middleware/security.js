"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lslRateLimiter = void 0;
exports.apiKeyGuard = apiKeyGuard;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_1 = require("../config/env");
exports.lslRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        error: 'Too many LSL board requests. Try again soon.',
    },
});
function apiKeyGuard(req, res, next) {
    const enforceApiKey = process.env.ENFORCE_API_KEY === 'true';
    if (!enforceApiKey) {
        return next();
    }
    const provided = req.header('x-api-key');
    if (!provided || provided !== env_1.env.API_SECRET) {
        return res.status(401).json({
            success: false,
            error: 'Invalid API key',
        });
    }
    return next();
}
