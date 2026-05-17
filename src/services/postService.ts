import type { Post } from '@prisma/client'
import { prisma } from '../db/prisma'
import { AppError } from '../utils/AppError'

interface CreatePostInput {
  userId: string
  content: string
}

export class PostService {
  async listPosts(limit = 100): Promise<Post[]> {
    return prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    })
  }

  async createPost(input: CreatePostInput): Promise<Post> {
    const user = await prisma.user.findUnique({ where: { id: input.userId } })
    if (!user) {
      throw new AppError('User not found', 404)
    }

    return prisma.post.create({
      data: {
        userId: input.userId,
        content: input.content.trim(),
      },
    })
  }
}

export const postService = new PostService()
