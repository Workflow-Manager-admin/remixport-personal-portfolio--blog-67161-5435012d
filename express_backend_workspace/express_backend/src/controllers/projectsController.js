const projectsService = require('../services/projectsService');

/**
 * ProjectsController - Handles HTTP requests for projects endpoint.
 */
class ProjectsController {
  // PUBLIC_INTERFACE
  /**
   * Get all project entries.
   * Returns an array of project objects.
   */
  list(req, res) {
    const projects = projectsService.getAllProjects();
    return res.status(200).json(projects);
  }
}

module.exports = new ProjectsController();
