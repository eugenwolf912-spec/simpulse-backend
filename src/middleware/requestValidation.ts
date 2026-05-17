import type { NextFunction, Request, Response } from 'express'
import type { AnyZodObject, ZodError } from 'zod'

function formatValidationError(error: ZodError) {
  return error.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }))
}

export function validateBody(schema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request body',
        details: formatValidationError(result.error),
      })
    }

    req.body = result.data
    return next()
  }
}

export function validateQuery(schema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query)
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid query parameters',
        details: formatValidationError(result.error),
      })
    }

    req.query = result.data
    return next()
  }
}

export function validateParams(schema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params)
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid route parameters',
        details: formatValidationError(result.error),
      })
    }

    req.params = result.data
    return next()
  }
}
