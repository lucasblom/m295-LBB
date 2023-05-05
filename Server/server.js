// Defining Constants
const cors = require('cors');
const express = require('express')
const bodyParser = require('body-parser');
const session = require('express-session')

//Specifying Port
const port = 3000

//Secifiying App
const app = express()

// --------------------------------------------------------------------------------------//

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Prints Portnumber and URL
app.listen(port, () => {
  console.log(
    `\nPort: ${port}\thttp://localhost:${port}\tEnjoy ;)`
  );
});


// ToDo List containing all tasks
var ToDo = [
    {
        "id": 1,
        "task": "Complete math homework",
        "completed": true
    },
    {
        "id": 2,
        "task": "Buy groceries",
        "completed": false
    },
    {
        "id": 3,
        "task": "Call mom",
        "completed": false
    }
]


// Functions declaration here

// Function to return all tasks
function returnAll() {
  return ToDo;
};

// Function to add a task
function addTask(id, task, completed) {
    const newTask = {
      "id": id,
      "task": task,
      "completed": completed,
    };
    ToDo.push(newTask);
  };

// Function to get a task by id
function getTask(id) {
    const foundTask = ToDo.find(task => task.id == id);
    return foundTask;
    };

// Function to update a task
function updateTask(id, task, completed) {
    const updatedTask = ToDo.find(task => task.id == id);
    updatedTask.task = task;
    updatedTask.completed = completed;
    return updatedTask;
    };

// Function to delete a task
function deleteTask(id) {
    const index = ToDo.findIndex(task => task.id == id);
    ToDo.splice(index, 1);
    };

//End-Points declared here

// Get all tasks
app.get('/tasks', (req, res) => {
    res.send(returnAll())
});

// Add a task
app.post('/tasks', (req, res) => {
    const id = req.query.id;
    const task = req.query.task;
    const completed = req.query.completed;
    addTask(id, task, completed);
    res.send(ToDo[ToDo.length - 1]);
});

// Get a task by id
app.get('/task/:id', (req, res) => {
    const id = req.params.id;
    res.send(getTask(id));
});

app.put('/task/:id', (req, res) => {
    const id = req.params.id;
    const task = req.query.task;
    const completed = req.query.completed;
    res.send(updateTask(id, task, completed));
});

app.delete('/task/:id', (req, res) => {
    const id = req.params.id;
    deleteTask(id);
    res.send(ToDo);
});