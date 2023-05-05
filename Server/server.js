// Defining Constants
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

const app = express()
const port = 3300

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
    completionDate: '2021-03-03',
    person: ''
  },
  {
    id: 2,
    task: 'Buy groceries',
    creationDate: '2021-03-01',
    completionDate: '2021-03-03',
    person: ''
  },
  {
    id: 3,
    task: 'Call mom',
    creationDate: '2021-03-01',
    completionDate: '2021-03-03',
    person: ''
  }
]

// --------------------------------function-declaration--------------------------------//

// Function to return all tasks
function returnAll () {
  return ToDo
};

// Function to add a task
function addTask (task, completionDate, person) {
  const creationDate = new Date().toISOString().slice(0, 10)
  const id = ToDo.length + 1
  const newTask = {
    id,
    task,
    creationDate,
    completionDate,
    person
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

// Function to check if user is logged in
function checkLogin (req, res, next) {
  if (req.session.user) {
    return true
  } else {
    return false
  }
}
// --------------------------------main requirements here--------------------------------//

// Get all tasks
app.get('/tasks', (req, res) => {
  if (!checkLogin(req, res)) {
    res.status(403).json('User is not logged in')
  } else {
    res.send(returnAll())
  }
})

// Add a task
app.post('/tasks', (req, res) => {
  const task = req.body.task
  const completionDate = req.body.completionDate
  const person = req.session.user
  if (!checkLogin(req, res)) {
    res.status(403).json('User is not logged in')
  } else {
    if (!task) {
      res.status(406).json('Task title is missing')
    } else {
      addTask(task, completionDate, person)
      res.status(201).send(ToDo[ToDo.length - 1])
    }
  }
})

// Get a task by id
app.get('/tasks/:id', (req, res) => {
  const id = req.params.id
  if (!checkLogin(req, res)) {
    res.status(403).json('User is not logged in')
  } else {
    if (!checkId(id)) {
      res.status(404).json('Task not found')
    }
    res.status(200).send(getTask(id))
  }
})

// Update a task
app.put('/tasks/:id', (req, res) => {
  const id = req.params.id
  const task = req.body.task
  const completionDate = req.body.completionDate
  if (!checkLogin(req, res)) {
    res.status(403).json('User is not logged in')
  } else {
    if (!checkId(id)) {
      res.status(404).json('Task not found')
    } else {
      if (!task) {
        res.status(406).json('Task title is missing')
      } else {
        res.status(201).send(updateTask(id, task, completionDate))
      }
    }
  }
})

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id
  if (!checkLogin(req, res)) {
    res.status(403).json('User is not logged in')
  } else {
    if (!checkId(id)) {
      res.status(404).json('Task not found')
    }
    res.status(200).send(getTask(id))
    deleteTask(id)
  }
})

// ----------------------------------Cookies--------------------------------//

// Login using cookies
app.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  // eslint-disable-next-line eqeqeq
  if (password == 'm295') {
    req.session.user = username
    res.status(200).json('Login successful')
  } else {
    res.status(401).json('Login failed')
  }
}
)

// verify if user is logged in
app.get('/verify', (req, res) => {
  if (req.session.user) {
    res.status(200).json('User is logged in')
  } else {
    res.status(401).json('User is not logged in')
  }
}
)

// delete session
app.delete('/logout', (req, res) => {
  req.session.destroy()
  res.sendStatus(204)
}
)
