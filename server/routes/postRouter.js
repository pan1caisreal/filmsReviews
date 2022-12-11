const Router = require("express")
const postController = require("../controllers/postController");
const router = new Router()




router.get('/:id',postController.getAllUser)
router.post('/update/:id',postController.updatePost)
router.post('/delete/:id',postController.deletePost)

module.exports = router