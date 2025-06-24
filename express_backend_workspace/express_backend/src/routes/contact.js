/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact form endpoint
 */

const express = require('express');
const contactController = require('../controllers/contactController');

const router = express.Router();

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Submit contact form
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@email.com
 *               message:
 *                 type: string
 *                 example: Hello! I'm interested in your work.
 *     responses:
 *       200:
 *         description: Contact form submission received (mocked)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 received:
 *                   type: object
 *       400:
 *         description: Missing required fields
 */
router.post('/', contactController.submit.bind(contactController));

module.exports = router;
