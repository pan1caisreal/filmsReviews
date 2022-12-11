const Router = require("express")
const router = new Router()
const actorController = require('../controllers/actorController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'),actorController.create)
router.get('/',actorController.getAll)
router.get('/:id',actorController.getOne)

module.exports = router