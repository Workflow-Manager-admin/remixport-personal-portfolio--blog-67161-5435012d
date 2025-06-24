/**
 * @swagger
 * tags:
 *   name: About
 *   description: Personal/portfolio about data
 */

const express = require('express');
const aboutController = require('../controllers/aboutController');

const router = express.Router();

/**
 * @swagger
 * /api/about:
 *   get:
 *     summary: Get about page content and metadata
 *     tags: [About]
 *     responses:
 *       200:
 *         description: About data and markdown
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 role:
 *                   type: string
 *                 location:
 *                   type: string
 *                 summary:
 *                   type: string
 *                 markdown:
 *                   type: string
 *       500:
 *         description: Could not retrieve About data
 */
router.get('/', aboutController.get.bind(aboutController));

module.exports = router;
