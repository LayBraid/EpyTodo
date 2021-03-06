const {addUser, checkUserExist, getUserById} = require("../user/user.query");
const jwt = require("jsonwebtoken");
const { checkTodoExistId } = require("../todos/todos.query");
const { userExists } = require("../../middleware/notFound");

async function createToken(res, mail, id) {
    const token = jwt.sign({email:mail, id:id}, process.env.SECRET, {expiresIn: '1h'})
    return res.status(200).json({token})
}

async function auth(app) {
    app.post('/register', async function register(req, res) {
        const bcrypt = require('bcryptjs')
        const name = req.body.name
        const mail = req.body.email
        const firstname = req.body.firstname
        const password = req.body.password
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            if (await checkUserExist(mail) === false) {
                let salt = await bcrypt.genSalt(10)
                let hash = await bcrypt.hash(password, salt)
                await addUser(name, mail, firstname, hash)
                const new_user = await getUserById(mail)
                const id = new_user[0].id
                createToken(res, mail, id)
            } else {
                res.status(400).json({msg: "Account already exists"})
            }
        } else {
            return ("510: Bad parameter")
        }
    });
    app.post('/login', userExists, async function register(req, res) {
        const bcrypt = require('bcryptjs')
        const mail = req.body.email
        const password = req.body.password
        const user = await getUserById(mail);
        const id = user[0].id
        let compare = await bcrypt.compare(password, user[0].password)
        if (compare === true) {
            createToken(res, mail, id)
        } else {
            res.status(400).json({msg: "Invalid Credentials"})
        }
    });
}

module.exports = auth
