"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = validateBody;
exports.validateQuery = validateQuery;
exports.validateParams = validateParams;
function formatValidationError(error) {
    return error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
    }));
}
function validateBody(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: 'Invalid request body',
                details: formatValidationError(result.error),
            });
        }
        req.body = result.data;
        return next();
    };
}
function validateQuery(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.query);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: 'Invalid query parameters',
                details: formatValidationError(result.error),
            });
        }
        req.query = result.data;
        return next();
    };
}
function validateParams(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.params);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: 'Invalid route parameters',
                details: formatValidationError(result.error),
            });
        }
        req.params = result.data;
        return next();
    };
}
