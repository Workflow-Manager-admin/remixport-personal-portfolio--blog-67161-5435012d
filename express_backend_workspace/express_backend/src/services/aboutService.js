const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/**
 * AboutService - Loads about content and metadata from Markdown.
 */
class AboutService {
  constructor() {
    this.aboutPath = path.join(__dirname, '..', 'content', 'about.md');
  }

  // PUBLIC_INTERFACE
  /**
   * Returns about content and metadata.
   * @returns {object|null}
   */
  getAboutContent() {
    if (!fs.existsSync(this.aboutPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(this.aboutPath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      ...data,
      markdown: content
    };
  }
}

module.exports = new AboutService();
