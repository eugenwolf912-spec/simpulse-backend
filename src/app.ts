import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { env } from './config/env'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'
import { apiKeyGuard } from './middleware/security'
import { eventRoutes } from './routes/eventRoutes'
import { healthRoutes } from './routes/healthRoutes'
import { lslRoutes } from './routes/lslRoutes'
import { postRoutes } from './routes/postRoutes'

const app = express()

app.set('trust proxy', 1)
app.use(helmet())
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
)
app.use(express.json({ limit: '1mb' }))
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'))

app.use('/health', healthRoutes)
app.use('/events', apiKeyGuard, eventRoutes)
app.use('/posts', apiKeyGuard, postRoutes)
app.use('/lsl', lslRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export { app }
