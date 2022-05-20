const {addUser, checkUserExist} = require("../user/user.query");

async function auth(app) {
    app.post('/register', async function register(req, res) {
        const name = req.body.name
        const mail = req.body.email
        const firstname = req.body.firstname
        const password = req.body.password
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
    });
}

module.exports = auth
