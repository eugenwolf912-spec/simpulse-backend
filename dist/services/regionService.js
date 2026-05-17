"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regionService = exports.RegionService = void 0;
const AppError_1 = require("../utils/AppError");
class RegionService {
    normalizeForStorage(region) {
        const normalized = region.trim();
        if (!normalized) {
            throw new AppError_1.AppError('Region is required and must match Second Life region name exactly', 400);
        }
        return normalized;
    }
}
exports.RegionService = RegionService;
exports.regionService = new RegionService();
