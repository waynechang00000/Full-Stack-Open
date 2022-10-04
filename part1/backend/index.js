const express = require('express')
const mongoose = require('mongoose')
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const password = process.env.MONGO_PWD
const url = `mongodb+srv://nba01704:${password}@reactproject.7jccdku.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(url)

// MONGO connection
// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(unknownEndpoint)
app.use(morgan("tiny"))

let notes = ""

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
