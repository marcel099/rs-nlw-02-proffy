import express from 'express';

import UsersController from './controllers/UsersController';
import LoginController from './controllers/LoginController';
import authMiddleware from './middlewares/auth';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const usersController = new UsersController;
const loginController = new LoginController;
const classesController = new ClassesController;
const connectionsController = new ConnectionsController;

routes.post('/register', usersController.create.bind(usersController))    // Isso é necessário para que a classe tenha visibilidade dentro do método
routes.post('/login', loginController.create)
routes.put('/forgot-password', usersController.forgotPassword)
routes.put('/reset-password', usersController.resetPassword.bind(usersController))

routes.use(authMiddleware)

// routes.get('/users', usersController.index)         // apenas para consulta interna

routes.get('/classes', classesController.index)
routes.post('/classes', classesController.create)

routes.get('/connections', connectionsController.index)
routes.post('/connections', connectionsController.create)


export default routes;

