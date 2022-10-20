import express from 'express';

import { AuthenticationController } from '@controllers/AuthenticationController';
import ClassesControler from '@controllers/ClassesController';
import ConnectionsControler from '@controllers/ConnectionsController';
import { UsersController } from '@controllers/UsersController';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';

const routes = express.Router();

const classesControler = new ClassesControler();
const connectionsControler = new ConnectionsControler();
const usersControler = new UsersController();
const authenticationController = new AuthenticationController();

routes.get('/classes', classesControler.index);

routes.get('/connections', connectionsControler.index);
routes.post('/connections', connectionsControler.create);

routes.get('/users/me', ensureAuthenticated, usersControler.me);
routes.post('/users', usersControler.create);
routes.put('/users/profile', ensureAuthenticated, usersControler.updateProfile);

routes.post('/sessions', authenticationController.session);

export default routes;
