const {deleteUserDb, getAllUsersDb, getUserByIdDb, updateUserDb, getUserTodosDb} = require("./user.query");
const jwt = require("jsonwebtoken");

async function getCurrentUser(req, res) {
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
            const user = await getUserByIdDb(decoded["id"]);
            if (user.length > 0) {
                res.status(200).json(user)
            } else {
                res.status(400).json({error: "User doesn't exist"})
            }
        } catch (e) {
            res.status(500).json({error: "Internal Server Error"})
        }
    }
}

async function updateUser(req, res) {
    const id = req.params.id;
    const name = req.body.name
    const mail = req.body.email
    const firstname = req.body.firstname
    const password = req.body.password

    if (id === undefined)
        res.status(400).json({error: "Bad request"})
    try {
        if (await updateUserDb(name, mail, firstname, password, id)) {
            res.status(200).json({success: "User updated"})
        } else {
            res.status(400).json({error: "User doesn't exist"})
        }
    } catch (e) {
        res.status(500).json({error: "Internal Server Error"})
    }
}

async function getAllUsers(req, res) {
    try {
        const allUsers = await getAllUsersDb();
        if (allUsers.length > 0) {
            res.status(200).json(allUsers)
        } else {
            res.status(400).json({error: "There are no users yet !"})
        }
    } catch (e) {
        res.status(500).json({error: "Internal Server Error"})
    }
}

async function getUserById(req, res) {
    const id = req.params.id;

    if (id === undefined)
        res.status(400).json({error: "Bad request"})
    try {
        const user = await getUserByIdDb(id);
        if (user.length > 0) {
            res.status(200).json(user)
        } else {
            res.status(400).json({error: "User doesn't exist"})
        }
    } catch (e) {
        res.status(500).json({error: "Internal Server Error"})
    }
}

async function deleteUser(req, res) {
    const id = req.params.id;

    if (id === undefined)
        res.status(400).json({error: "Bad request"})
    try {
        if (await deleteUserDb(id)) {
            res.status(200).json({success: "User deleted"})
        } else {
            res.status(400).json({error: "User doesn't exist"})
        }
    } catch (e) {
        res.status(500).json({error: "Internal Server Error"})
    }
}


module.exports = {
    updateUser,
    getAllUsers,
    getUserById,
    deleteUser,
    getCurrentUser
}