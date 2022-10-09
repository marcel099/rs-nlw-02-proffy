import express from 'express';

import ClassesControler from './controllers/ClassesController';
import ConnectionsControler from './controllers/ConnectionsController';
import { UsersController } from './controllers/UsersController';

const routes = express.Router();

const classesControler = new ClassesControler;
const connectionsControler = new ConnectionsControler;
const usersControler = new UsersController;

routes.get('/classes', classesControler.index)
routes.post('/classes', classesControler.create)

routes.get('/connections', connectionsControler.index)
routes.post('/connections', connectionsControler.create)

routes.post('/users', usersControler.create)

export default routes;

