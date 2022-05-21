const {deleteUser, getUserById, updateUser} = require("./user.query");
const {getTodoByUserId} = require("../todos/todos.query")
const {userExists} = require("../../middleware/notFound")
const auth = require("../../middleware/auth");

async function user(app) {
    app.get('/user', auth, userExists, async (req, res) => {
        const user = await getUserById(req.id);
        res.status(200).json(user)
    });

    app.get('/user/todos', auth, userExists, async (req, res) => {
        const todo = await getTodoByUserId(req.id);
        if (todo.length > 0) {
            res.status(200).json(todo)
        } else {
            res.status(202).json({success: "The user exsists but doesn't have any tasks"})
        }
    });

    app.put('/users/:id', userExists, auth, async (req, res) => {
        const id = req.params.id;
        const name = req.body.name
        const mail = req.body.email
        const firstname = req.body.firstname
        const password = req.body.password
        try {
            await updateUser(name, mail, firstname, password, id)
            res.status(200).json({success: "User updated"})
        } catch (e) {
            res.status(500).json({error: "Internal Server Error"})
        }
    });

    app.get('/users/:id', userExists, auth, async (req, res) => {
        const id = req.params.id;
        try {
            const user = await getUserById(id);
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json({error: "Internal Server Error"})
        }
    });

    app.delete('/users/:id', userExists, auth, async (req, res) => {
        const id = req.params.id;
        try {
            await deleteUser(id)
            res.status(200).json({success: "User deleted"})
        } catch (e) {
            res.status(500).json({error: "Internal Server Error"})
        }
    });
}

module.exports = user