const UsersData = require("../data/users.json");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

function getAll() {
    return UsersData;
}

function addNew(req, res) {
    const newUser = {
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "token": uuidv4(),
        "role": req.body.role,
        "created_at": new Date().toLocaleString(),
        "updated_at": new Date().toLocaleString()
    };

    var tempNewUsersList = UsersData;

    tempNewUsersList ?
        tempNewUsersList.push(newUser) :
        tempNewUsersList = [newUser];

    try {
        fs.writeFile('./data/users.json', JSON.stringify(tempNewUsersList), err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        });

        return { code: 200, message: "User successfully added" }
    }
    catch (error) {
        console.log(error);
        return { code: 500, message: "Error writing file" }
    }
}

function edit() {
    return null;
}

function deleteUser() {
    return null;
}


module.exports = { getAll, addNew };
