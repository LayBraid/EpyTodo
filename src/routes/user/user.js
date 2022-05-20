const {deleteUser, getAllUsers, getUserById, updateUser, checkUserExist} = require("./user.query");
const {getTodoByUserId} = require("../todos/todos.query")
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

async function user(app) {
    app.get('/user', auth, async (req, res) => {
        const user = await getUserById(req.id);
        if (user.length > 0) {
            res.status(200).json(user)
        } else {
            res.status(400).json({error: "User doesn't exist"})
        }
    });

    app.get('/user/todos', auth, async (req, res) => {
        if (checkUserExist(req.id) == false) {
            res.status(400).json({error: "This user does not exist"});
        }
        const todo = await getTodoByUserId(req.id);
        if (user.length > 0) {
            res.status(200).json(todo)
        } else {
            res.status(400).json({error: "There are no todos associated to this user"})
        }
    });

    app.put('/user/:id', async (req, res) => {
        const id = req.params.id;
        const name = req.body.name
        const mail = req.body.email
        const firstname = req.body.firstname
        const password = req.body.password

        if (id === undefined)
            res.status(400).json({error: "Bad request"})
        try {
            if (await updateUser(name, mail, firstname, password, id)) {
                res.status(200).json({success: "User updated"})
            } else {
                res.status(400).json({error: "User doesn't exist"})
            }
        } catch (e) {
            res.status(500).json({error: "Internal Server Error"})
        }
    });

    app.get('/users/all', async (req, res) => {
        try {
            const allUsers = await getAllUsers();
            if (allUsers.length > 0) {
                res.status(200).json(allUsers)
            } else {
                res.status(400).json({error: "There are no users yet !"})
            }
        } catch (e) {
            res.status(500).json({error: "Internal Server Error"})
        }
    });

    app.get('/users/:id', async (req, res) => {
        const id = req.params.id;

        if (id === undefined)
            res.status(400).json({error: "Bad request"})
        try {
            const user = await getUserById(id);
            if (user.length > 0) {
                res.status(200).json(user)
            } else {
                res.status(400).json({error: "User doesn't exist"})
            }
        } catch (e) {
            res.status(500).json({error: "Internal Server Error"})
        }
    });

    app.delete('/users/:id', async (req, res) => {
        const id = req.params.id;

        if (id === undefined)
            res.status(400).json({error: "Bad request"})
        try {
            if (await deleteUser(id)) {
                res.status(200).json({success: "User deleted"})
            } else {
                res.status(400).json({error: "User doesn't exist"})
            }
        } catch (e) {
            res.status(500).json({error: "Internal Server Error"})
        }
    });
}

module.exports = user