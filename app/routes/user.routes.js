module.exports = app => {
    const user = require("../controllers/user.controllers.js");

    var router = require("express").Router();

    //Create a new user
    router.post("/add-user", user.create);

    //Retrieve all user
    router.get("/", user.findAll);

    //Retrieve a single user with id
    router.get("/:id", user.findOne);

    //Update a user with id
    router.put("/update-user/:id", user.update);

    //Delete a user with id
    router.delete("/delete-user/:id", user.delete);

    app.use('/api/user', router);
}