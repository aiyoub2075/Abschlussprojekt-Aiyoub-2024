// Import the 'express' module
import express, { Router } from 'express';
import { Pool } from 'pg';
import env from 'dotenv';
import { usersRouter } from './users/UsersRouter';
import { DbConfig } from './DbConfig';
import { postsRouter } from './posts/PostsRouter';

env.config();

// Create an Express application
const app = express();
app.use(express.json());

// Set the port number for the server
const port = process.env.PORT;

export const dbConfig = new DbConfig()
dbConfig.init();

const router = Router()
router.use('/users', usersRouter)
router.use('/posts', postsRouter)
app.use(router)

app.get('/', (req, res) => {
  res.send('Hello, Welcome to Chaitanya');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});