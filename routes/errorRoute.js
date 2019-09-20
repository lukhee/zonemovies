const errorController = require("../controllers/errorController")

const route = require("express").Router()

route.get('/', errorController.error500)

module.exports = route