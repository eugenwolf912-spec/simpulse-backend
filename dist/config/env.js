"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    DATABASE_URL: zod_1.z.string().min(1, 'DATABASE_URL is required'),
    PORT: zod_1.z.coerce.number().int().positive().default(3001),
    NODE_ENV: zod_1.z.enum(['development', 'test', 'production']).default('development'),
    API_SECRET: zod_1.z.string().min(1, 'API_SECRET is required'),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    const details = parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ');
    throw new Error(`Invalid environment configuration: ${details}`);
}
exports.env = parsed.data;
