import express from 'express';

import ClassesControler from './controllers/ClassesController';
import ConnectionsControler from './controllers/ConnectionsController';

const routes = express.Router();
const classesControler = new ClassesControler;
const connectionsControler = new ConnectionsControler;

routes.get('/classes', classesControler.index)
routes.post('/classes', classesControler.create)

routes.get('/connections', connectionsControler.index)
routes.post('/connections', connectionsControler.create)

export default routes;

