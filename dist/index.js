"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_config_1 = require("./config/db.config");
const port = process.env.PORT ? parseInt(process.env.PORT) : 1200;
(0, db_config_1.connectToDB)()
    .then(() => {
    // sample response
    app_1.default.get("/", (req, res) => {
        res.send("<h1>Server is running...</h1>");
    });
    app_1.default.listen(port, () => {
        console.log(`Connected to DB 👍 and Port is listening on http://localhost:${port}`);
    });
})
    .catch((err) => {
    console.log("Error in connecting to database in index.ts:", err);
});
//# sourceMappingURL=index.js.map