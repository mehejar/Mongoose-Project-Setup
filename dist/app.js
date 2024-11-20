"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAController = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const student_route_1 = require("./app/modules/student/student.route");
const app = (0, express_1.default)();
// const port = 3000
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Application routes
app.use('/api/v1/students', student_route_1.studentRoute);
const getAController = (req, res) => {
    res.send('Hello World!');
};
exports.getAController = getAController;
app.get('/', exports.getAController);
exports.default = app;
