"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlModel = void 0;
const nanoid_1 = require("nanoid");
const mongoose_1 = __importDefault(require("mongoose"));
const shortUrlSchema = new mongoose_1.default.Schema({
    fullUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        default: () => (0, nanoid_1.nanoid)(10),
    },
    clicks: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
exports.urlModel = mongoose_1.default.model("ShortUrl", shortUrlSchema);
