"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = notFoundHandler;
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
const AppError_1 = require("../utils/AppError");
function notFoundHandler(req, res) {
    return res.status(404).json({
        success: false,
        error: `Route not found: ${req.method} ${req.originalUrl}`,
    });
}
function errorHandler(err, _req, res, _next) {
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: err.issues,
        });
    }
    if (err instanceof AppError_1.AppError) {
        return res.status(err.statusCode).json({
            success: false,
            error: err.message,
            details: err.details,
        });
    }
    return res.status(500).json({
        success: false,
        error: 'Internal server error',
    });
}
