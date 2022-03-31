const UsersData = require("../data/users.json");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const getAll = () => {
    try {
        return getAllUsersFromFile();
    } catch (err) {
        console.log(err);
        return { code: 500, message: "Error while getting all users data." };
    }
}

const getAllUsersFromFile = () => {
    const jsonUsersData = fs.readFileSync("./data/users.json");
    return JSON.parse(jsonUsersData);
}

const addNew = (req, res) => {
    const newUser = {
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "token": uuidv4(),
        "role": req.body.role,
        "created_at": new Date().toLocaleString(),
        "updated_at": new Date().toLocaleString()
    };

    var tempNewUsersList = getAllUsersFromFile();

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

const edit = (req) => {
    const result = getAllUsersFromFile().map(user => {
        if (user.token === req.params.token) {
            return {
                ...user,
                "firstname": req.body.firstname ?? user.firstname,
                "lastname": req.body.lastname ?? user.lastname,
                "role": req.body.role ?? user.role,
                "updated_at": new Date().toLocaleString()
            };
        }
        return user;
    });

    try {
        fs.writeFile('./data/users.json', JSON.stringify(result), err => {
            if (err) {
                console.log('Error editing file', err)
            } else {
                console.log('Successfully edited')
            }
        });

        return { code: 200, message: "User successfully edited" }
    }
    catch (error) {
        console.log(error);
        return { code: 500, message: "Error while editing user" }
    }
}

const deleteUser = (req, res) => {
    const result = getAllUsersFromFile().filter(
        function (user) { return user.token != req.params.token }
    );

    try {
        fs.writeFile('./data/users.json', JSON.stringify(result), err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        });

        return { code: 200, message: "User successfully removed" }
    }
    catch (error) {
        console.log(error);
        return { code: 500, message: "Error while removing user" }
    }
}


module.exports = { getAll, addNew, deleteUser, edit };
