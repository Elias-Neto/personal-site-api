const projectsRepository = require("../repositories/projectsRepository")

const getAllProjects = async (req, res) => {
  const projects = await projectsRepository.getAllProjects()

  projects.length > 0 ? res.json(projects) : res.status(404).json({ message: "No projects found" })
}

const getProjectById = async (req, res) => {
  const project = await projectsRepository.getProjectById(req.params.id)

  project.length > 0 ? res.json(project) : res.status(404).json({ message: "No project found" })
}

const createProject = async (req, res) => {
  const project = await projectsRepository.createProject(req.body)

  res.status(201).json(project)
}

const updateProject = async (req, res) => {
  const project = await projectsRepository.updateProject(req.params.id, req.body)

  project.length > 0 ? res.json(project) : res.status(404).json({ message: "No project found" })
}

const deleteProject = async (req, res) => {
  const project = await projectsRepository.deleteProject(req.params.id)

  project > 0 ? res.json({ message: "Project deleted" }) : res.status(404).json({ message: "No project found" })
}

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
}