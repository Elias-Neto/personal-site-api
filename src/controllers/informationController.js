const informationRepository = require('../repositories/informationRepository')

const getInformation = async (req, res) => {
  const information = await informationRepository.getInformation()

  information ? res.json(information) : res.status(404).json({ message: "No information found" })
}

const updateInformation = async (req, res) => {
  const information = await informationRepository.updateInformation(req.body)

  information ? res.json(information) : res.status(404).json({ message: "No information found" })
}

module.exports = {
  getInformation,
  updateInformation
}