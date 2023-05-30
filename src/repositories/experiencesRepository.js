const { pool } = require("../config/db")

const getAllExperiences = async (type) => {
  let result

  if (type) {
    result = await pool.query("SELECT * FROM experiences WHERE type = $1", [type])
  } else {
    result = await pool.query("SELECT * FROM experiences")
  }

  return (result.rows)
}

const getExperienceById = async (id) => {
  const result = await pool.query("SELECT * FROM experiences WHERE id = $1", [id])

  return (result.rows)
}

const createExperience = async (experience) => {
  const result = await pool.query(`
    INSERT INTO experiences (title, type, description, "startYear", "endYear") 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *`,
    [experience.title, experience.type, experience.description, experience.startYear, experience.endYear]
  )

  return (result.rows)
}

const updateExperience = async (id, experience) => {
  const result = await pool.query(`
    UPDATE experiences
    SET title = $1, type = $2, description = $3, "startYear" = $4, "endYear" = $5
    WHERE id = $6
    RETURNING *
  `, [experience.title, experience.type, experience.description, experience.startYear, experience.endYear, id])

  return (result.rows)
}

const deleteExperience = async (id) => {
  const result = await pool.query("DELETE FROM experiences WHERE id = $1", [id])

  return (result.rowCount)
}

module.exports = {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience
}