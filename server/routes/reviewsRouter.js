const Router = require("express")
const router = new Router()
const reviewsController = require('../controllers/reviewsController')

router.post('/',reviewsController.create)
router.get('/:id',reviewsController.getAll)



module.exports = router