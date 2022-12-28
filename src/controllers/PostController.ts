import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { postService } from "../services/PostService";
import { PostAttributes, PostInstance } from "../models/post";
import { ApiError } from "../errorHandlers/apiErrorHandler";

export class PostController {
    static async createPost(req: Request, res: Response, next: NextFunction): Promise<Response<PostInstance> | undefined> {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) throw next(ApiError.BadRequest(400, `Invalid body data`, errors.array()));

            const { title, content, published } = req.body;
            const owner = req.headers.user as string;

            const post = await postService.createPost(title, content, published, owner);

            return res.status(200).json({post});
        } catch(err) {
            next(err);
        }
    }

    static async changeState(req: Request, res: Response, next: NextFunction): Promise<Response<boolean> | undefined> {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) throw next(ApiError.BadRequest(400, "Invalid body data", errors.array()));

            const { published, id } = req.body;

            const response = await postService.changeState(published, id);

            return res.status(200).json({success: response});
        } catch(err) {
            next(err);
        }
    }

    static async getProfilePosts(req: Request, res: Response, next: NextFunction): Promise<Response<PostInstance[]> | undefined> {
        try {
            const user = req.headers.user as string;

            const response = await postService.getProfilePosts(user);

            return res.status(200).json({response});
        } catch(err) {
            next(err);
        }
    }

    static async removePost(req: Request, res: Response, next: NextFunction): Promise<Response<boolean> | undefined> {
        try {
            const postId = req.params.id;
            const user = req.headers.user as string;
            const role = req.headers.role as string;

            const response = await postService.removePost(user, role, postId);
            
            return res.status(200).json({success: response});
        } catch(err) {
            next(err);
        }
    }

    static async updatePost(req: Request, res: Response, next: NextFunction):Promise<Response<PostInstance> | undefined> {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) throw next(ApiError.BadRequest(400, "Invalid body data", errors.array()));
            if (Object.keys(req.body).length === 1) throw next(ApiError.BadRequest(400, "No data"));

            const user = req.headers.user as string;
            const propertiesToUpdate: PostAttributes = req.body;

            const response = await postService.updatePost(user, propertiesToUpdate);

            return res.status(200).json({response});
        } catch(err) {  
            next(err);
        }
    }

    static async getPosts(req: Request, res: Response, next: NextFunction): Promise<Response<PostInstance[]> | undefined> {
        try {
            const response = await postService.getPosts();

            return res.status(200).json({response});
        } catch(err) {
            next(err);
        }
    }
}