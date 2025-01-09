import { Request, Response, Router } from "express";
import { dbConfig } from "../server";
import { UUID, createHash } from "crypto";

export const usersRouter = Router();

export interface User {
    id?: UUID;
    username: string;
    email: string;
    password: string,
    created_at?: Date;
    updated_at?: Date;
}

usersRouter.post('/login', async (req: Request, res: Response) => {
    const { email, password }: User = req.body

    const query = `
      SELECT *
      FROM weblogusers 
      WHERE email = $1 AND password = $2
    `;

    try {
        const result = await dbConfig.pool().query(query, [email, hashPassword(password)]);
        const user: User = result.rows[0];

        if (user) {
            res.json({
                success: true,
                id: user.id
            })
        } else {
            res.json({
                success: false,
                data: result.rows
            })
        }
    } catch (err) {
        if (err instanceof Error) {
            console.error('Error executing query:', err.stack);
        } else {
            console.error('Unexpected error:', err);
        }
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
        });
    }

})


usersRouter.post('/register', async (req: Request, res: Response) => {
    const { username, email, password }: User = req.body

    try {
        const result = await dbConfig.pool().query(
            'INSERT INTO weblogusers (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashPassword(password)]
        );

        res.json({
            success: true,
            data: result.rows
        })
    } catch (err) {
        if (err instanceof Error) {
            console.error('Error executing query:', err.stack);
        } else {
            console.error('Unexpected error:', err);
        }
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
        });
    }

})

usersRouter.get('/', async (req: Request, res: Response) => {
    try {
        const result = await dbConfig.pool().query("select * from weblogusers");

        res.json({
            success: true,
            data: result.rows
        })
    } catch (err) {
        if (err instanceof Error) {
            console.error('Error executing query:', err.stack);
        } else {
            console.error('Unexpected error:', err);
        }
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
        });
    }

})

export const hashPassword = (password: string): string => {
    return createHash('sha256').update(password).digest('hex');
}