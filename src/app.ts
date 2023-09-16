import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import routes from './routes';
import swaggerDocument from './docs';
import { requestHandler, errorHandler } from './middlewares';

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);
app.use(requestHandler);

export default app;
