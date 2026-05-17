"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = exports.PostService = void 0;
const prisma_1 = require("../db/prisma");
const AppError_1 = require("../utils/AppError");
class PostService {
    async listPosts(limit = 100) {
        return prisma_1.prisma.post.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: limit,
        });
    }
    async createPost(input) {
        const user = await prisma_1.prisma.user.findUnique({ where: { id: input.userId } });
        if (!user) {
            throw new AppError_1.AppError('User not found', 404);
        }
        return prisma_1.prisma.post.create({
            data: {
                userId: input.userId,
                content: input.content.trim(),
            },
        });
    }
}
exports.PostService = PostService;
exports.postService = new PostService();
