import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors());    // Permite que aplicações que não estiverem no DNS do front-end possam acessar a API
app.use(routes);

app.listen(3333);


