const aboutService = require('../services/aboutService');

/**
 * AboutController - Handles HTTP requests for about endpoint.
 */
class AboutController {
  // PUBLIC_INTERFACE
  /**
   * Get about page content.
   * Responds with both markdown content and parsed frontmatter.
   */
  get(req, res) {
    const about = aboutService.getAboutContent();
    if (!about) {
      return res.status(500).json({ message: 'About content not found.' });
    }
    return res.status(200).json(about);
  }
}

module.exports = new AboutController();
