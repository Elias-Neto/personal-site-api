const experiencesRepository = require("../repositories/experiencesRepository")

const getAllExperiences = async (req, res) => {
  const type = req.query.type
  const experiences = await experiencesRepository.getAllExperiences(type)

  experiences.length > 0 ? res.json(experiences) : res.status(404).json({ message: "No experiences found" })
}

const getExperienceById = async (req, res) => {
  const experience = await experiencesRepository.getExperienceById(req.params.id)

  experience.length > 0 ? res.json(experience) : res.status(404).json({ message: "No experience found" })
}

const createExperience = async (req, res) => {
  const experience = await experiencesRepository.createExperience(req.body)

  res.status(201).json(experience)
}

const updateExperience = async (req, res) => {
  const experience = await experiencesRepository.updateExperience(req.params.id, req.body)

  experience.length > 0 ? res.json(experience) : res.status(404).json({ message: "No experience found" })
}

const deleteExperience = async (req, res) => {
  const experience = await experiencesRepository.deleteExperience(req.params.id)

  experience > 0 ? res.json({ message: "Experience deleted" }) : res.status(404).json({ message: "No experience found" })
}

module.exports = {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience
}