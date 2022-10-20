import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import { uploadConfig } from '@config/upload';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/avatar', express.static(`/${uploadConfig.tmpFolder}/avatar`));

app.use(routes);

app.listen(3333, () => console.log('Server is running'));
