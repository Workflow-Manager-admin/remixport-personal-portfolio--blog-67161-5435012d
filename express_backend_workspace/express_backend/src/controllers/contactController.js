const contactService = require('../services/contactService');

/**
 * ContactController - Handles /api/contact submissions.
 */
class ContactController {
  // PUBLIC_INTERFACE
  /**
   * Receive contact form submission.
   */
  submit(req, res) {
    const { name, email, message } = req.body;
    if (
      !name ||
      !email ||
      !message
    ) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }
    const result = contactService.handleContactSubmission({ name, email, message });
    return res.status(200).json(result);
  }
}

module.exports = new ContactController();
