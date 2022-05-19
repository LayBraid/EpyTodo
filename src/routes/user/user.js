const {addUser, deleteUserDb, checkUserExist} = require("./user.query");

async function register(rec, res) {
    const name = rec.body.name
    const mail = rec.body.email
    const firstname = rec.body.firstname
    const password = rec.body.password
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        if (await checkUserExist(mail, res)) {
            await addUser(name, mail, firstname, password, res)
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