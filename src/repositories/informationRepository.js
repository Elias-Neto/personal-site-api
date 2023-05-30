const { pool } = require('../config/db');

const getInformation = async () => {
  const result = await pool.query('SELECT * FROM information')

  return (result.rows[0])
}

const updateInformation = async (data) => {
  const result = await pool.query(`
    UPDATE information
    SET name = $1,  "profilePic" = $2, office = $3, resume = $4
    WHERE id = 1
    RETURNING *
  `, [data.name, data.profilePic, data.office, data.resume])

  return (result.rows[0])
}

module.exports = {
  getInformation,
  updateInformation
}