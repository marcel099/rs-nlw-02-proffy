import express from 'express';

import UsersController from './controllers/UsersController';
import LoginController from './controllers/LoginController';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const usersController = new UsersController;
const loginController = new LoginController;
const classesController = new ClassesController;
const connectionsController = new ConnectionsController;

routes.get('/classes', classesController.index)
routes.post('/classes', classesController.create)

routes.get('/connections', connectionsController.index)
routes.post('/connections', connectionsController.create)

routes.get('/users', usersController.index)   // apenas para consulta interna
routes.post('/users', usersController.create)

routes.post('/login', loginController.create)

export default routes;

