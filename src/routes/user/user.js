const {addUser, deleteUserDb, checkUserExist} = require("./user.query");

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

async function deleteUser(rec, res) {
    const id = rec.params.id;
    await deleteUserDb(id, res)
}

module.exports = {
    register,
    deleteUser
}