const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/**
 * BlogService - Handles file IO and parsing for blog posts in Markdown.
 */
class BlogService {
  constructor() {
    this.blogsDir = path.join(__dirname, '..', 'content', 'blogs');
  }

  // PUBLIC_INTERFACE
  /**
   * Returns all blog post metadata, sorted by date (descending).
   * @returns {Array} Array of blog post metadata
   */
  getAllBlogMetadata() {
    const files = fs.readdirSync(this.blogsDir)
      .filter(file => file.endsWith('.md'));
    const posts = files.map(filename => {
      const slug = filename.replace(/\.md$/, '');
      const postData = fs.readFileSync(
        path.join(this.blogsDir, filename),
        'utf8'
      );
      const { data } = matter(postData);
      return {
        ...data,
        slug,
      };
    });
    // Sort by date descending
    posts.sort((a, b) => (b.date > a.date ? 1 : -1));
    return posts;
  }

  // PUBLIC_INTERFACE
  /**
   * Returns the full content (and metadata) for a given blog slug.
   * @param {string} slug 
   * @returns {object|null} Blog post (metadata + content as HTML), or null if not found
   */
  getBlogBySlug(slug) {
    const filePath = path.join(this.blogsDir, `${slug}.md`);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      ...data,
      slug,
      content // markdown content, frontend can render as needed
    };
  }
}

module.exports = new BlogService();
