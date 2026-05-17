"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPosts = listPosts;
exports.createPost = createPost;
const postService_1 = require("../services/postService");
async function listPosts(req, res) {
    const limit = typeof req.query.limit === 'number' ? req.query.limit : undefined;
    const posts = await postService_1.postService.listPosts(limit);
    return res.status(200).json({ success: true, data: posts });
}
async function createPost(req, res) {
    const post = await postService_1.postService.createPost(req.body);
    return res.status(201).json({ success: true, data: post });
}
