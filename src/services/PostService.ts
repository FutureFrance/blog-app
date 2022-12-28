import { ApiError } from '../errorHandlers/apiErrorHandler';
import { PostAttributes, PostInstance, PostModel } from '../models/post'

class PostService {
    async createPost(title: string, content: string, published: boolean, owner: string): Promise<PostInstance> {
        const postExists = await PostModel.findOne({
            where: { title }
        }).catch(err => { throw ApiError.BadRequest(500, "Fatal Error trying to find the post") });

        if (postExists) throw ApiError.BadRequest(400, "Post already exists");

        const post = await PostModel.create({ 
            title, content, owner,published 
        }).catch(err => { throw ApiError.BadRequest(500, "Fatal Error trying to create the post") });
        
        return post;
    } 

    async changeState(published: boolean, postId: string): Promise<boolean> {
        await PostModel.update({published}, {
            where: {
                id: postId
            }
        }).catch(err => {throw ApiError.BadRequest(500, `Fatal error unable to update this post state`)});

        return true;
    }

    async getProfilePosts(userId: string): Promise<PostInstance[]> {
        const posts = await PostModel.findAll({
            where: { 
                owner: userId 
            }
        }).catch(err => { throw ApiError.BadRequest(500, "Fatal Error trying to search for the posts") });

        if (!posts) throw ApiError.BadRequest(500, "Unable to fetch products for this user");

        return posts;
    }

    async getPosts(): Promise<PostInstance[]> {
        const posts = await PostModel.findAll({where: {published: true}});

        if (!posts) throw ApiError.BadRequest(500, "Unable to fetch posts for this user");

        return posts;
    }

    async removePost(user: string, role: string, postId: string): Promise<boolean> {
        if (role === "286") {
            const deletedPost = await PostModel.destroy({
                where: {
                    id: postId, 
                    published: true
                }
            }).catch(err => { throw ApiError.BadRequest(500, "Fatal Error trying to delete the post") });

            if (!deletedPost) throw ApiError.BadRequest(400, "You can not delete this post");

            return true;
        }

        const deletedPost = await PostModel.destroy({
            where: {
                id: postId,
                owner: user,
            }
        }).catch(err => { throw ApiError.BadRequest(500, "Fatal Error trying to delete the product") });

        if (!deletedPost) throw ApiError.BadRequest(400, "You can not delete this post");

        return true;
    }

    async updatePost(userId: string, propertiesToUpdate: PostAttributes): Promise<PostInstance[]> {
        const post = await PostModel.update({ ...propertiesToUpdate}, {
            where: {
                owner: userId,
                id: propertiesToUpdate.id
            },
            fields: ['title', 'content', 'published'],
            returning: true,
        }).catch(err => { throw ApiError.BadRequest(500, "Fatal Error trying to search for the product") });

        return post[1];
    }
}

export const postService = new PostService();