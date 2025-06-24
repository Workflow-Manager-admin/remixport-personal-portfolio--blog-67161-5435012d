/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog post retrieval APIs
 */

const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get list of blog post metadata
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: List of blog post metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   slug:
 *                     type: string
 *                   date:
 *                     type: string
 *                   excerpt:
 *                     type: string
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 */
router.get('/', blogController.list.bind(blogController));

/**
 * @swagger
 * /api/blogs/{slug}:
 *   get:
 *     summary: Get a blog post by slug
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog slug
 *     responses:
 *       200:
 *         description: Blog post (metadata and markdown content)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 slug:
 *                   type: string
 *                 date:
 *                   type: string
 *                 excerpt:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                 content:
 *                   type: string
 *                   description: Markdown content of blog post
 *       404:
 *         description: Blog post not found
 */
router.get('/:slug', blogController.detail.bind(blogController));

module.exports = router;
