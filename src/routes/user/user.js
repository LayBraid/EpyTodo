const {deleteUser, getAllUsers, getUserById, updateUser, getUserTodos} = require("./user.query");
const jwt = require("jsonwebtoken");

async function user(app) {
    app.get('/user', async (req, res) => {
        const auth = req.headers.authorization;
        if (!auth)
            res.status(401).json({error: "Unauthorized"})
        const parts = auth.split(' ');
        if (parts.length !== 2) {
            return res.status(401).json({error: 'Token error'});
        }
        let decoded;
        try {
            const decoded = await jwt.verify(parts[1], process.env.SECRET);
        } catch (e) {
            return res.status(401).json({error: 'Token invalid'});
        }
        if (decoded["id"] === req.user) {
            try {
                const user = await getUserById(decoded["id"]);
                if (user.length > 0) {
                    res.status(200).json(user)
                } else {
                    res.status(400).json({error: "User doesn't exist"})
                }
            } catch (e) {
                res.status(500).json({error: "Internal Server Error"})
            }
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