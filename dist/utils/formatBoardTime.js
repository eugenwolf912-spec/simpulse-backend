"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatBoardTime = formatBoardTime;
function formatBoardTime(input) {
    return input.toISOString().slice(11, 16);
}
