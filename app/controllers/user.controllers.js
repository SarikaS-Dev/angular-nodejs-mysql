const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new user
exports.create = (req, res) => {

    //create user
    const user = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        department: req.body.department,
        city: req.body.city
    };

    //save user in the database
    User.create(user).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

// Retrieve all user from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? {name: { [Op.like]: `%${name}`}} : null;

    User.findAll({where: condition}).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the user."
        });
    }); 
};

// Find a single user with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    
    User.findByPk(id).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving user witth ID : "+id
        });
    }); 
};


// Update a user by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    
    User.update(req.body, {where : {id:id}}).then(num => {
        if(num == 1) {
            res.send({
                message: "User was updated successfully!"
            });
        }
        else {
            res.send({
                message: `Cannot update user with id = ${id}. Maybe user ddosen't exists`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating user witth ID : "+id
        });
    });  
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    
    User.destroy({where : {id:id}}).then(num => {
        if(num == 1) {
            res.send({
                message: "User was deleted successfully!"
            });
        }
        else {
            res.send({
                message: `Cannot delete user with id = ${id}. Maybe user ddosen't exists`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting user witth ID : "+id
        });
    });
};