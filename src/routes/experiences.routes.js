const express = require("express")
const router = express.Router()

const experiencesController = require("../controllers/experienceController")

router.get("/", experiencesController.getAllExperiences)
router.get("/:id", experiencesController.getExperienceById)
router.post("/", experiencesController.createExperience)
router.put("/:id", experiencesController.updateExperience)
router.delete("/:id", experiencesController.deleteExperience)

module.exports = router