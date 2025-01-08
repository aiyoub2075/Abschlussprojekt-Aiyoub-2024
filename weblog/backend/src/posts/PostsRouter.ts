import { Router } from "express";
import { PostService } from "./PostsService";
import { dbConfig } from "../server";

export const postsRouter = Router();
// const postService = new PostService(dbConfig.pool());

postsRouter.get("/", (req, res) => {

})