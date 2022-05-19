const {addUser, deleteUserDb, checkUserExist, getAllUsersDb, getUserByIdDb} = require("./user.query");

async function register(rec, res) {
    const name = rec.body.name
    const mail = rec.body.email
    const firstname = rec.body.firstname
    const password = rec.body.password
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        if (await checkUserExist(mail) === false) {
            if (await addUser(name, mail, firstname, password)) {
                res.status(200).json({success: "User added"})
            } else {
                res.status(400).json({error: "User not added"})
            }
        } else {
            res.status(400).json({error: "User already exist"})
        }
    } else {
        return ("510: Bad email address")
    }
}

async function getAllUsers(req, res) {
    try {
        const allUsers = await getAllUsersDb();
        if (allUsers.length > 0) {
            res.status(200).json(allUsers)
        } else {
            res.status(400).json({error: "User doesn't exist"})
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

async function deleteUser(rec, res) {
    const id = rec.params.id;
    await deleteUserDb(id, res)
}

module.exports = {
    register,
    deleteUser,
    getAllUsers,
    getUserById,
}