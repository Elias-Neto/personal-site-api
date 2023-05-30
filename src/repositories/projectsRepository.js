const { pool } = require("../config/db")

const getAllProjects = async () => {
  const result = await pool.query("SELECT * FROM projects")

  return (result.rows)
}

const getProjectById = async (id) => {
  const result = await pool.query("SELECT * FROM projects WHERE id = $1", [id])

  return (result.rows)
}

const createProject = async (project) => {
  const result = await pool.query(`
    INSERT INTO projects (title, demonstration, description, github, deploy) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *
  `, [project.title, project.demonstration, project.description, project.github, project.deploy])

  return (result.rows)
}

const updateProject = async (id, project) => {
  const result = await pool.query(`
    UPDATE projects
    SET title = $1, demonstration = $2, description = $3, github = $4, deploy = $5
    WHERE id = $6
    RETURNING *
  `, [project.title, project.demonstration, project.description, project.github, project.deploy, id])

  return (result.rows)
}

const deleteProject = async (id) => {
  const result = await pool.query("DELETE FROM projects WHERE id = $1", [id])

  return (result.rowCount)
}

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
}