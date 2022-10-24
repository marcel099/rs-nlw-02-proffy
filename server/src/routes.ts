import express from 'express';
import multer from 'multer';

import { uploadConfig } from '@config/upload';

import { AuthenticationController } from '@controllers/AuthenticationController';
import ClassesControler from '@controllers/ClassesController';
import ConnectionsControler from '@controllers/ConnectionsController';
import { UsersController } from '@controllers/UsersController';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';

const routes = express.Router();

const uploadAvatar = multer(uploadConfig);

const classesControler = new ClassesControler();
const connectionsControler = new ConnectionsControler();
const usersControler = new UsersController();
const authenticationController = new AuthenticationController();

// eslint-disable-next-line prettier/prettier
routes.get(
  '/classes',
  classesControler.list
);
routes.get(
  '/classes/me',
  ensureAuthenticated,
  classesControler.userClassSchedules
);

routes.get('/connections', connectionsControler.index);
routes.post('/connections', connectionsControler.create);

routes.get('/users/me', ensureAuthenticated, usersControler.me);
routes.post('/users', usersControler.create);
// eslint-disable-next-line prettier/prettier
routes.put(
  '/users/profile',
  ensureAuthenticated,
  usersControler.updateProfile
);
routes.patch(
  '/users/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  usersControler.updateAvatar
);

routes.post('/sessions', authenticationController.session);

export default routes;
