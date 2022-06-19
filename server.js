const express = require('express')
const app = express()
const morgan = require('morgan')
const PORT = 6002



app.use(express.json())
app.use(morgan( function (request, response, next) {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('error')
//  next()
}))


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    // console.log(response.persons)
    response.json(persons)
    console.log(persons)
})

app.get('/info', (request, response) => {
    // console.log(response.persons)
    let date = new Date()
    response.send(`Phonebook has info for ${persons.length} people` + '\n' + date)
})

app.get('/api/persons/:id', (request, response) => {
    let id = Number(request.params.id) - 1
    console.log(id)
    response.json(persons[id])
})

app.delete('/api/perons/delete/:id', (request, response) => {
    const id = Number(request.params.id) - 1
    persons = persons.filter( p => p !== persons[id] )
    console.log(persons)

    response.status(204).end()
})

app.post('/api/persons/add', (request, response) => {
    const newId = Math.ceil(Math.random() * 20)
    // persons[persons.length + 1] = { id: newId, name: "unknown", number: "unknown"}
    // response.json(persons)
    console.log(request)
})

app.listen( PORT, () => {
    console.log(`port ${PORT} is running`)
} )