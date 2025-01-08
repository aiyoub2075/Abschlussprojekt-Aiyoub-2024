import { Pool } from "pg";

export interface Post {
    id: string;
    title: string;
    content: string;
    user_id: string;
    created_at: Date;
    updated_at: Date;
}

export interface CreatePostDto {
    title: string;
    content: string;
    user_id: string;
}

export interface UpdatePostDto {
    title?: string;
    content?: string;
}

export class PostService {
    private db: Pool;

    constructor(db: Pool) {
        this.db = db;
    }

    async createPost(postData: CreatePostDto): Promise<Post> {
        const query = `
            INSERT INTO posts (title, content, user_id)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const values = [postData.title, postData.content, postData.user_id];
        const result = await this.db.query(query, values);
        return result.rows[0];
    }

    async getAllPosts(): Promise<Post[]> {
        const query = `
            SELECT p.*, u.name as author_name 
            FROM posts p
            JOIN users u ON p.user_id = u.id
            ORDER BY p.created_at DESC
        `;
        const result = await this.db.query(query);
        return result.rows;
    }

    async getPostById(id: string): Promise<Post | null> {
        const query = `
            SELECT p.*, u.name as author_name
            FROM posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.id = $1
        `;
        const result = await this.db.query(query, [id]);
        return result.rows[0] || null;
    }

    async getPostsByUserId(userId: string): Promise<Post[]> {
        const query = `
            SELECT p.*, u.name as author_name
            FROM posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.user_id = $1
            ORDER BY p.created_at DESC
        `;
        const result = await this.db.query(query, [userId]);
        return result.rows;
    }

    async updatePost(id: string, userId: string, postData: UpdatePostDto): Promise<Post | null> {
        const updateFields: string[] = [];
        const values: any[] = [];
        let valueCount = 1;

        if (postData.title) {
            updateFields.push(`title = $${valueCount}`);
            values.push(postData.title);
            valueCount++;
        }

        if (postData.content) {
            updateFields.push(`content = $${valueCount}`);
            values.push(postData.content);
            valueCount++;
        }

        if (updateFields.length === 0) {
            return null;
        }

        updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(userId);
        values.push(id);

        const query = `
            UPDATE posts 
            SET ${updateFields.join(', ')}
            WHERE id = $${valueCount + 1} AND user_id = $${valueCount}
            RETURNING *
        `;

        const result = await this.db.query(query, values);
        return result.rows[0] || null;
    }

    async deletePost(id: string, userId: string): Promise<boolean> {
        const query = 'DELETE FROM posts WHERE id = $1 AND user_id = $2 RETURNING *';
        const result = await this.db.query(query, [id, userId]);
        const rowCount = result?.rowCount ?? 0
        return rowCount > 0;
    }
}