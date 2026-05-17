"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./config/env");
const prisma_1 = require("./db/prisma");
const app_1 = require("./app");
async function startServer() {
    await prisma_1.prisma.$connect();
    const server = app_1.app.listen(env_1.env.PORT, () => {
        console.log(`SimPulse backend listening on port ${env_1.env.PORT}`);
    });
    const shutdown = async () => {
        console.log('Shutting down SimPulse backend...');
        server.close(async () => {
            await prisma_1.prisma.$disconnect();
            process.exit(0);
        });
    };
    process.on('SIGINT', () => {
        void shutdown();
    });
    process.on('SIGTERM', () => {
        void shutdown();
    });
}
startServer().catch(async (error) => {
    console.error('Failed to start server', error);
    await prisma_1.prisma.$disconnect();
    process.exit(1);
});
