import { Router } from "express";
import { PostService } from "./PostsService";
import { dbConfig } from "../server";

export const postsRouter = Router();

export interface CreatePostDto {
    title: string;
    content: string;
    user_id: string;
}

postsRouter.get("/", async (req, res) => {
    const query = `
        WITH post_comments AS (
        SELECT 
            c.post_id,
            json_agg(
            json_build_object(
                'id', c.id,
                'content', c.content,
                'created_at', c.created_at,
                'user_id', c.user_id,
                'author_name', u.username
            ) ORDER BY c.created_at DESC
            ) as comments
        FROM comments c
        JOIN weblogusers u ON c.user_id = u.id
        GROUP BY c.post_id
        )
        SELECT 
        p.*,
        u.username as author_name,
        COALESCE(pc.comments, '[]'::json) as comments
        FROM posts p
        JOIN weblogusers u ON p.user_id = u.id
        LEFT JOIN post_comments pc ON p.id = pc.post_id
        ORDER BY p.created_at DESC
    `;
  
    const posts = await dbConfig.pool().query(query);
    return res.status(201).json(posts.rows);
})

postsRouter.post("/", async (req, res) => {
    console.log(req.body);
    
    const postData: CreatePostDto = req.body;
    const query = `
            INSERT INTO posts (title, content, user_id)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
    const values = [postData.title, postData.content, postData.user_id];
    const result = await dbConfig.pool().query(query, values);
    return res.status(201).json(result.rows[0]);
})