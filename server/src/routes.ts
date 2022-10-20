import express from 'express';

import ClassesControler from './controllers/ClassesController';
import ConnectionsControler from './controllers/ConnectionsController';
import { UsersController } from './controllers/UsersController';
import { AuthenticationController } from './controllers/AuthenticationController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

const routes = express.Router();

const classesControler = new ClassesControler;
const connectionsControler = new ConnectionsControler;
const usersControler = new UsersController;
const authenticationController = new AuthenticationController;

routes.get('/classes', classesControler.index)
routes.post('/classes', classesControler.create)

routes.get('/connections', connectionsControler.index)
routes.post('/connections', connectionsControler.create)

routes.get('/users/me', ensureAuthenticated, usersControler.me)
routes.post('/users', usersControler.create)

routes.post('/sessions', authenticationController.session)

routes.put('/users/profile', ensureAuthenticated, usersControler.updateProfile);

export default routes;
