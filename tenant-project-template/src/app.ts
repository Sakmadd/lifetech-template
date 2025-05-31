import cors from 'cors';
import express from 'express';
import requestLogger from './middlewares/requestLogger';
import { responseMiddleware } from './middlewares/response.middleware';
import routes from './routes/index.route';

// Express Server
const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(responseMiddleware);

app.use('/api/v1', routes);

export default app;
