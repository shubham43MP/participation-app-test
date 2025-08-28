import express from 'express';
import cors from 'cors';
import logger from './utils/logger';
import { Request, Response, NextFunction } from 'express';
import healthRouter from './routes/health.route';
import userRoutes from './routes/user.route';
import { responseMiddleware } from './middlewares/response.middleware';
const app = express();

app.use(cors());
app.use(express.json());
app.use(responseMiddleware);

// ✅ Request logger middleware
app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// routes
app.use('/', healthRouter);
app.use('/', userRoutes);

// ❌ Error handler (always last)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err.stack || err.message);
  res.status(500).json({ message: 'Something went wrong' });
});

export default app;
