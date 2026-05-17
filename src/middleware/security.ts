import type { NextFunction, Request, Response } from 'express'
import rateLimit from 'express-rate-limit'
import { env } from '../config/env'

export const lslRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many LSL board requests. Try again soon.',
  },
})

export function apiKeyGuard(req: Request, res: Response, next: NextFunction) {
  const enforceApiKey = process.env.ENFORCE_API_KEY === 'true'
  if (!enforceApiKey) {
    return next()
  }

  const provided = req.header('x-api-key')
  if (!provided || provided !== env.API_SECRET) {
    return res.status(401).json({
      success: false,
      error: 'Invalid API key',
    })
  }

  return next()
}
