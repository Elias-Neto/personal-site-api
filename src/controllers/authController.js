const usersRepository = require('../repositories/usersRepository')

const login = async (req, res) => {
  const { email, password } = req.body

  const user = await usersRepository.getUserByEmail(email)

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  return res.status(200).json({ message: 'Login successful' })
}

module.exports = {
  login
}