const express = require('express')
const app = express()

const morgan = require("morgan")
const cors = require("cors")

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const weathersRouter = require("./controllers/weathers")

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

app.use(cors())
app.use(express.json())
app.use("/api/weathers", weathersRouter)
// app.use(requestLogger)
// app.use(unknownEndpoint)
// app.use(morgan("tiny"))

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
