import { env } from './config/env'
import { prisma } from './db/prisma'
import { app } from './app'

async function startServer() {
  await prisma.$connect()

  const server = app.listen(env.PORT, () => {
    console.log(`SimPulse backend listening on port ${env.PORT}`)
  })

  const shutdown = async () => {
    console.log('Shutting down SimPulse backend...')
    server.close(async () => {
      await prisma.$disconnect()
      process.exit(0)
    })
  }

  process.on('SIGINT', () => {
    void shutdown()
  })
  process.on('SIGTERM', () => {
    void shutdown()
  })
}

startServer().catch(async (error) => {
  console.error('Failed to start server', error)
  await prisma.$disconnect()
  process.exit(1)
})
