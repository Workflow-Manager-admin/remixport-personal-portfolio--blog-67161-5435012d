const fs = require('fs');
const path = require('path');

/**
 * ProjectsService - Loads project data from JSON.
 */
class ProjectsService {
  constructor() {
    this.projectsPath = path.join(__dirname, '..', 'content', 'projects.json');
  }

  // PUBLIC_INTERFACE
  /**
   * Returns all projects.
   * @returns {Array}
   */
  getAllProjects() {
    if (!fs.existsSync(this.projectsPath)) {
      return [];
    }
    const fileContents = fs.readFileSync(this.projectsPath, 'utf8');
    try {
      const projects = JSON.parse(fileContents);
      return projects || [];
    } catch {
      return [];
    }
  }
}

module.exports = new ProjectsService();
