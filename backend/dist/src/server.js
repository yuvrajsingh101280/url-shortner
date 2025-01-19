"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("../database/db"));
const shortUrl_1 = __importDefault(require("../routes/shortUrl"));
// dotenv config
dotenv_1.default.config();
// middleware
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
// routes
app.use("/api/", shortUrl_1.default);
// databse connection
(0, db_1.default)();
// port
const port = process.env.PORT;
app.get("/", (req, res) => {
    res.send("Hello world");
});
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
