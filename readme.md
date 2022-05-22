# EpyTodo

EpyTodo is a simple todo list application with JavaScript and the Express framework.

In this application, you can add, remove, and edit todo items.

And you can also mark todo items as done.

For do it, you can create a user account and login.

# Variables

In this project, you must add this variables to your environment variables:

```MYSQL_DATABASE='epytodo'
MYSQL_HOST='localhost'
MYSQL_USER='YOUR_USERNAME'
MYSQL_ROOT_PASSWORD='YOUR_PASSWORD'
MYSQL_PORT=3306
SECRET='8aa639443827a392b011d82ed0c40fe8d50e5642ff84720fae6a218d570a99e58a1258f0f42d9cfd438a5d8e05b3f4316ffb0b8f0b7fc00feeea84e05330acee'
```

# Dependencies

```
npm install
```

# Launching the DB with Docker

```
docker-compose up
```

# Launching the app

```
npm start
```

# List of the routes

```angular2html
├── POST /register - Create a new user
├── POST /login - Login a user
├── GET /user - Get the current user information
├── GET /user/todos - Get the current user todos
├── GET /user/:id or :email - Get a user by id or email
├── PUT /user/:id - Update a user by id
├── DELETE /user/:id - Delete a user by id
├── GET /todos - Get all todos
├── GET /todos/:id - Get a todo by id
├── POST /todos - Create a new todo
├── PUT /todos/:id - Update a todo by id
└── DELETE /todos/:id - Delete a todo by id
```

## Developers

| [<img src="https://github.com/LayBraid.png?size=85" width=85><br><sub>Clément Loeuillet</sub>](https://github.com/LayBraid) | [<img src="https://github.com/agherasie.png?size=85" width=85><br><sub>Alexandru Gherasie</sub>](https://github.com/agherasie) | [<img src="https://github.com/Elieleche.png?size=85" width=85><br><sub>Elie Chardin</sub>](https://github.com/Elieleche) |
|:---------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------:|