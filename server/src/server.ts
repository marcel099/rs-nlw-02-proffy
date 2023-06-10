import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { join } from 'path';

import { uploadConfig } from '@config/upload';
import { handleAppError } from '@errors/handleAppError';

import routes from './routes';

const app = express();

app.use(express.json());
app.use('/avatar', express.static(join(uploadConfig.tmpFolder, 'avatar')));

app.use(cors());

app.use(routes);
app.use(handleAppError);

app.listen(process.env.PORT || 3333, () => console.log('Server is running'));
