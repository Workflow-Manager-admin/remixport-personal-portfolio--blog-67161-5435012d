/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Projects API
 */

const express = require('express');
const projectsController = require('../controllers/projectsController');

const router = express.Router();

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects for portfolio
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   slug:
 *                     type: string
 *                   description:
 *                     type: string
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                   github:
 *                     type: string
 *                   website:
 *                     type: string
 */
router.get('/', projectsController.list.bind(projectsController));

module.exports = router;
