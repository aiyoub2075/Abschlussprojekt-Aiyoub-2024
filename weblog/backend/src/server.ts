import express, {Router} from 'express';
import env from 'dotenv';
import {usersRouter} from './users/UsersRouter';
import {DbConfig} from './DbConfig';
import {postsRouter} from './posts/PostsRouter';
import {commentsRouter} from './comments/CommentsRouter';
import cors from 'cors';

env.config();

// Create an Express application
const app = express();
app.use(express.json());
app.use(cors());

// Set the port number for the server
const port = process.env.PORT;

export const dbConfig = new DbConfig()
dbConfig.init();

const router = Router()
router.use('/api/users', usersRouter)
router.use('/api/posts', postsRouter)
router.use('/api/comments', commentsRouter)
app.use(router)

app.get('/', (req, res) => {
  res.send('Hello, Welcome to Chaitanya');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});