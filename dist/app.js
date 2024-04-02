"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.static("public"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || '*',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
// remove this middleware in production
app.use((0, morgan_1.default)("dev"));
app.use("/api/v1", index_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map