const blogService = require('../services/blogService');

/**
 * BlogController - Handles HTTP requests for blog-related APIs.
 */
class BlogController {
  // PUBLIC_INTERFACE
  /**
   * List all blog post metadata.
   */
  list(req, res) {
    const posts = blogService.getAllBlogMetadata();
    return res.status(200).json(posts);
  }

  // PUBLIC_INTERFACE
  /**
   * Get full content+metadata for a specific blog post.
   */
  detail(req, res) {
    const { slug } = req.params;
    const post = blogService.getBlogBySlug(slug);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }
    return res.status(200).json(post);
  }
}

module.exports = new BlogController();
