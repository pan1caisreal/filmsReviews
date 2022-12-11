const Router = require("express")
const router = new Router()
const listController = require('../controllers/listController')

router.post('/',listController.create)
router.get('/get',listController.getAll)
router.post('/delete/:id',listController.deleteMovie)


module.exports = router