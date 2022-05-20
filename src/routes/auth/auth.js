const {addUser, checkUserExist, getUserById} = require("../user/user.query");
const jwt = require("jsonwebtoken")

async function auth(app) {
    app.post('/register', async function register(req, res) {
        const name = req.body.name
        const mail = req.body.email
        const firstname = req.body.firstname
        const password = req.body.password
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            if (await checkUserExist(mail) === false) {
                if (await addUser(name, mail, firstname, password)) {
                    res.status(201).json({success: "User added"})
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
    app.post('/login', async function register(req, res) {
        const mail = req.body.email
        const password = req.body.password
        const user = await getUserById(mail);
        if (user[0].password === password) {
            const token = jwt.sign({email:mail, id:user[0].id}, process.env.SECRET, {expiresIn: '60s'});
            res.status(200).json({token})
        } else {
            res.status(400).json({error: "Wrong password"})
        }
    });
}

module.exports = auth
