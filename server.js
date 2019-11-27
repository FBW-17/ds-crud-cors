const express = require("express")
const api = express()
const uuid = require("uuid/v1")

api.listen(3000, () => console.log("Started on 3000"))

let users = []

// api.use == MIDDLEWARE
api.use(express.json())

api.use((req, res, next) => {
    res.set("ACCESS-CONTROL-ALLOW-ORIGIN", "*")
    res.set("ACCESS-CONTROL-ALLOW-HEADERS", "*")
    res.set("ACCESS-CONTROL-ALLOW-METHODS", "*")
    next()
})

api.get("/users", (req, res) => {
    res.send(users)
})

api.post("/users", (req, res) => {
    let name = req.body.name // fetch the name that was sent to us
    let userNew = {} // create a new user object

    // if name param given => create new user
    if(name) {
        userNew.id = uuid() // use UUID to give the user a unique ID
        userNew.name = name
        users.push(userNew)
    }

    res.send(userNew)
})

api.patch("/users/:id", (req, res) => {
    let id = req.params.id
    let name = req.body.name // => comes from browser fetch() => body: JSON.stringify({name: "Rob"})

    // fetch user by its ID from the array using find
    let userFound = users.find(user => user.id == id)
    if(!userFound) {
        return res.send({})
    }
    // update the user
    userFound.name = name

    // send the updated user back
    res.send(userFound)
})

// DELETE ROUTE
api.delete("/users/:id", (req, res) => {
    let id = req.params.id // fetch the ID of the user to delete

    // find a user with this ID 
    // => we use findIndex here, because we later want to delete this user
    // using splice. And splice needs the index / position of that user
    // in the array
    let userIndex = users.findIndex(user => user.id == id) 

    // if the user was found => delete it
    if(userIndex != -1) {
        users.splice(userIndex, 1)
    }
    return res.send({})
})
