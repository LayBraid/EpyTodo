const {addUser} = require("./user.query");

async function register(rec, res) {
    name = rec.body.name
    mail = rec.body.contactemail
    firstname = rec.body.firstname
    password = rec.body.password
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        await addUser(name, mail)
    } else {
        return ("510: Bad email address")
    }
}

module.exports = {
    register
}