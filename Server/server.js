// Defining Constants
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
  secret: 'superSecret',
  resave: false,
  saveUnititialized: true,
  cookie: {}
}))

// Prints Portnumber and URL
app.listen(port, () => {
  console.log(
        `\nPort: ${port}\thttp://localhost:${port}\tEnjoy ;)`
  )
})

// ToDo List containing all pre existing tasks
const ToDo = [
  {
    id: 1,
    task: 'Complete math homework',
    creationDate: '2021-03-01',
    completionDate: '2021-03-03'
  },
  {
    id: 2,
    task: 'Buy groceries',
    creationDate: '2021-03-01',
    completionDate: '2021-03-03'
  },
  {
    id: 3,
    task: 'Call mom',
    creationDate: '2021-03-01',
    completionDate: '2021-03-03'
  }
]

// --------------------------------function-declaration--------------------------------//

// Function to return all tasks
function returnAll () {
  return ToDo
};

// Function to add a task
function addTask (id, task, completionDate) {
  const creationDate = new Date().toISOString().slice(0, 10)
  const newTask = {
    id,
    task,
    creationDate,
    completionDate
  }
  ToDo.push(newTask)
};

// Function to get a task by id
function getTask (id) {
  // eslint-disable-next-line eqeqeq
  const foundTask = ToDo.find(task => task.id == id)
  return foundTask
};

// Function to update a task
function updateTask (id, task, completionDate) {
  // eslint-disable-next-line eqeqeq
  const updatedTask = ToDo.find(task => task.id == id)
  updatedTask.task = task
  updateTask.completionDate = completionDate
  return updatedTask
};

// Function to delete a task
function deleteTask (id) {
  // eslint-disable-next-line eqeqeq
  const index = ToDo.findIndex(task => task.id == id)
  ToDo.splice(index, 1)
};

// check if task id exists
function checkId (id) {
  // eslint-disable-next-line eqeqeq
  const foundTask = ToDo.find(task => task.id == id)
  if (foundTask) {
    return true
  } else {
    return false
  }
};
// --------------------------------main requirements here--------------------------------//

// Get all tasks
app.get('/tasks', (req, res) => {
  res.send(returnAll())
})

// Add a task
app.post('/tasks', (req, res) => {
  const id = req.query.id
  const task = req.query.task
  const completionDate = req.query.completionDate
  if (checkId(id)) {
    res.status(400).json('Task already exists')
  } else {
    addTask(id, task, completionDate)
    res.status(201).send(ToDo[ToDo.length - 1])
  }
})

// Get a task by id
app.get('/tasks/:id', (req, res) => {
  const id = req.params.id
  if (!checkId(id)) {
    res.status(404).json('Task not found')
  }
  res.status(200).send(getTask(id))
})

// Update a task
app.put('/tasks/:id', (req, res) => {
  const id = req.params.id
  const task = req.query.task
  const completionDate = req.query.completionDate
  if (!checkId(id)) {
    res.status(404).json('Task not found')
  }
  res.status(201).send(updateTask(id, task, completionDate))
})

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id
  if (!checkId(id)) {
    res.status(404).json('Task not found')
  }
  res.status(200).send(getTask(id))
  deleteTask(id)
})

// ----------------------------------Cookies--------------------------------//

// Login using cookies
app.post('/login', (req, res) => {
  const username = req.query.username
  const password = req.query.password
  if (username === 'admin' && password === 'm295') {
    req.session.user = username
    res.status(200).json('Login successful')
  } else {
    res.status(401).json('Login failed')
  }
}
)
