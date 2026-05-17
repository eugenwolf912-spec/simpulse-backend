"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const env_1 = require("./config/env");
const errorHandler_1 = require("./middleware/errorHandler");
const security_1 = require("./middleware/security");
const eventRoutes_1 = require("./routes/eventRoutes");
const healthRoutes_1 = require("./routes/healthRoutes");
const lslRoutes_1 = require("./routes/lslRoutes");
const postRoutes_1 = require("./routes/postRoutes");
const app = (0, express_1.default)();
exports.app = app;
app.set('trust proxy', 1);
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express_1.default.json({ limit: '1mb' }));
app.use((0, morgan_1.default)(env_1.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use('/health', healthRoutes_1.healthRoutes);
app.use('/events', security_1.apiKeyGuard, eventRoutes_1.eventRoutes);
app.use('/posts', security_1.apiKeyGuard, postRoutes_1.postRoutes);
app.use('/lsl', lslRoutes_1.lslRoutes);
app.use(errorHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
