const Router = require("express")
const router = new Router()
const actorController = require("../controllers/actorController");
const actorFilm = require("../controllers/actorFilmController")



router.post('/',actorController.inTheFilm)
router.get('/:id',actorFilm.get)
router.get('/films/:id',actorFilm.getFilms)

module.exports = router