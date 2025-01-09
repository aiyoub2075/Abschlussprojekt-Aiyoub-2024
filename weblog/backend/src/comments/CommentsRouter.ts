import { Router } from "express";
import { dbConfig } from "../server";

export const commentsRouter = Router();

commentsRouter.post('/:postId', async (req: any, res) => {
    try {
        const commentData = {
            content: req.body.content,
            post_id: req.params.postId,
            user_id: req.body.userId
        };

        const query = `
            INSERT INTO comments (content, post_id, user_id)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const values = [commentData.content, commentData.post_id, commentData.user_id];
        const result = await dbConfig.pool().query(query, values);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Create comment error:', error);
        res.status(500).json({ error: 'Error creating comment' });
    }
});
