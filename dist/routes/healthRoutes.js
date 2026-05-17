"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRoutes = void 0;
const express_1 = require("express");
const healthController_1 = require("../controllers/healthController");
const healthRoutes = (0, express_1.Router)();
exports.healthRoutes = healthRoutes;
healthRoutes.get('/', healthController_1.getHealth);
