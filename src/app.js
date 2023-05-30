require("./config/dotenv")
require("express-async-errors")

const cors = require("cors")
const express = require("express")

const app = express()
app.use(express.json())
app.use(cors())

const { initDatabase } = require("./config/db")

const authRouter = require("./routes/auth.routes")
const projectsRouter = require("./routes/projects.routes")
const experiencesRouter = require("./routes/experiences.routes")
const informationRouter = require("./routes/information.routes")

const port = process.env.APP_PORT || 5000

app.get("/", (req, res) => {
  res.send("Welcome to my Personal Site API :)")
})

app.use("/api/auth", authRouter)
app.use("/api/portfolio", projectsRouter)
app.use("/api/experiencias", experiencesRouter)
app.use("/api/informacoes", informationRouter)

initDatabase()

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    status: "error",
    message: err.message
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
  console.log(`HOST ${process.env.DB_HOST}`)
})