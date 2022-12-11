const Router = require("express")
const router = new Router()
const movieController = require("../controllers/movieController");

router.get('/:id',movieController.get)


module.exports = router