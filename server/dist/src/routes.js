"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ClassesController_1 = __importDefault(require("./controllers/ClassesController"));
const ConnectionsController_1 = __importDefault(require("./controllers/ConnectionsController"));
const routes = express_1.default.Router();
const classesControler = new ClassesController_1.default;
const connectionsControler = new ConnectionsController_1.default;
routes.get('/classes', classesControler.index);
routes.post('/classes', classesControler.create);
routes.get('/connections', connectionsControler.index);
routes.post('/connections', connectionsControler.create);
exports.default = routes;
