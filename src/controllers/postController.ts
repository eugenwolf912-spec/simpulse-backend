import type { Request, Response } from 'express'
import { postService } from '../services/postService'

export async function listPosts(req: Request, res: Response) {
  const limit = typeof req.query.limit === 'number' ? req.query.limit : undefined
  const posts = await postService.listPosts(limit)
  return res.status(200).json({ success: true, data: posts })
}

export async function createPost(req: Request, res: Response) {
  const post = await postService.createPost(req.body)
  return res.status(201).json({ success: true, data: post })
}
