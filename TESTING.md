# Modul 295 Testing Backend

## GET/tasks
### GET/tasks liefert eine Liste von allen Tasks im JSON Format zurück. Es nimmt keine Parameter entgegen.
- Success Response(http://localhost:3300/tasks):
    - Code: 200
    - Content: `[
  {
    "id": 1,
    "task": "Complete math homework",
    "creationDate": "2021-03-01",
    "completionDate": "",
    "person": ""
  },
  {
    "id": 2,
    "task": "Buy groceries",
    "creationDate": "2021-03-01",
    "completionDate": "2021-03-03",
    "person": ""
  },
  {
    "id": 3,
    "task": "Call mom",
    "creationDate": "2021-03-01",
    "completionDate": "2021-03-03",
    "person": ""
  }
  `
## POST/tasks
### POST/tasks erstellt einen neuen Task. Es nimmt einen JSON Body entgegen, welcher die Eigenschaften des Tasks enthält. Es gibt den erstellten Task im JSON Format zurück.
- Success Response (http://localhost:3300/tasks):
    - Code: 201
    - Content: <br>
    `{"id": 4,`<br>
    `"task": "Do laundry",`<br>
    `"creationDate": "2021-03-01",`<br>
    `"completionDate": "",`<br>
    `"person": "user@mail.com"}`

- Error wenn kein Task beschrieben wird (http://localhost:3300/tasks):
    - Code: 406
    - Content: `{
    "message": "Task title is missing"
  }`

## GET/tasks/{id}
### GET/tasks/{id} liefert einen Task im JSON Format zurück. Es nimmt die ID des Tasks als Parameter entgegen.
- Success Response (http://localhost:3300/tasks/1):
    - Code: 200
    - Content: <br>
    `{"id": 1,`<br>
    `"task": "Complete math homework",`<br>
    `"creationDate": "2021-03-01",`<br>
    `"completionDate": "",`<br>
    `"person": ""}`


- Error wenn Task nicht gefunden wird (http://localhost:3300/tasks/5):
    - Code: 404
    - Content: `{
    "message": "Task not found"
  }`

## PUT/tasks/{id}
### PUT/tasks/{id} aktualisiert einen Task. Es nimmt die ID des Tasks als Parameter entgegen und einen JSON Body, welcher die Eigenschaften des Tasks enthält. Es gibt den aktualisierten Task im JSON Format zurück.
- Success Response (http://localhost:3300/tasks/1):
    - Code: 201
    - Content: <br>
    `{"id": 1,`<br>
    `"task": "Walk the Dog",`<br>
    `"creationDate": "2021-03-01",`<br>
    `"completionDate": "",`<br>
    `"person": "user@mail.com"}`

- Error wenn Task nicht gefunden wird (http://localhost:3300/tasks/5):
    - Code: 404
    - Content: `{
    "message": "Task not found"
  }`

- Error wenn kein Task beschrieben wird (http://localhost:3300/tasks/1):
    - Code: 406
    - Content: `{
    "message": "Task title is missing"
  }`

## DELETE/tasks/{id}
### DELETE/tasks/{id} löscht einen Task. Es nimmt die ID des Tasks als Parameter entgegen.
- Success Response (http://localhost:3300/tasks/1):
    - Code: 200
    - Content: <br>
    `{"id": 1,`<br>
    `"task": "Walk the dog",`<br>
    `"CreationDate": "2021-03-01",`<br>
    `"completionDate": "",`<br>
    `"person": ""}`

- Error wenn Task nicht gefunden wird (http://localhost:3300/tasks/5):
    - Code: 404
    - Content: `{
    "message": "Task not found"
  }`
## POST//login
### POST/login nimmt einen JSON Body entgegen, welcher die Eigenschaften des Users enthält. Es gibt eine Login-Bestätigung im JSON Format zurück.
- Success Response (http://localhost:3300/login):
    - Code: 200
    - Content: `{
    "message": "Login successful"
  }`

- Error wenn kein Email nicht gültig ist(http://localhost:3300/login):
    - Code: 401
    - Content: `{
    "message": "Login failed"
  }`
## GET/verify
### GET/verify überprüft, ob der User eingeloggt ist. Es gibt eine Bestätigung im JSON Format zurück.
- Success Response (http://localhost:3300/verify):
    - Code: 200
    - Content: `{
    "message": "User is logged in"
  }`

- Error wenn User nicht eingeloggt ist (http://localhost:3300/verify):
    - Code: 401
    - Content: `{
    "message": "User is not logged in"
  }`

## DELETE/logout
### DELETE/logout loggt den User aus.
- Success Response (http://localhost:3300/logout):
    - Code: 204
    - Content: `{}`