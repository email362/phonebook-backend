const express = require('express');
const app = express();

app.use(express.json());

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
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
];

const generateId = () => {
    const id = persons.length > 0 
        ? Math.floor(Math.random()*(persons.length*10)) : 1;
    if(persons.find(person => person.id === id)) {
        generateId();
    } else {
        return id;
    }
};


app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/info', (request, response) => {
    const currDate = new Date().toString(); 
    response.send(`
        <div> 
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${currDate}</p>
        </div> 
    `);
});

app.get('/api/persons/:id',(request,response) => {
    const id = request.params.id ? Number(request.params.id) : null;
   
    const person = persons.find(person => person?.id === id);
    
    person ? response.json(person) 
        : response.status(404).end(); 
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    
    const person = persons.find(person => person.id === id);
    person ? response.status(204).end()
        : response.status(404).end();
});

app.post('/api/persons/', (request, response) => {
  
    const person = {
        id: generateId(),
        name: request.body.name,
        number: request.body.number
    };
    persons = [...persons, person];
    response.json(persons);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
