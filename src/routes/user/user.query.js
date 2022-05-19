const db = require('../../config/db');

async function addUser(name, mail, firstname, password) {
    db.query("INSERT INTO user (email, password, name, firstname) values (" + mail + "', '" + password + "', '" + name + "', '" + firstname + "');", function (err, result, fields) {
        if (err) {
            console.log(err);
            return ("500: Internal server error");
        }
        return result;
    })
}

module.exports = {
    addUser
}