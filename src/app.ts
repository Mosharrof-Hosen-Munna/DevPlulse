import express, { type Request, type Response } from 'express';
import {  userRoutes } from './modules/user/user.route';
import { issueRoutes } from './modules/issue/issue.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",userRoutes);
app.use("/api/issues",issueRoutes);

app.get('/', (req:Request, res:Response) => {
  res.send('Hello, World!');
});

export default app;