const Router = require("express")
const actorRouter = require('./actorRouter')
const filmRouter = require('./filmRouter')
const reviewsRouter = require('./reviewsRouter')
const userRouter = require('./userRouter')
const postRouter = require('./postRouter')
const listRouter = require('./listRouter')
const movieRouter = require('./movieRouter')
const actorFilmRouter = require('./actorFilmRouter')
const router = new Router()

router.use('/user', userRouter)
router.use('/actor', actorRouter)
router.use('/film', filmRouter)
router.use('/review', reviewsRouter)
router.use('/post',postRouter)
router.use('/list',listRouter)
router.use('/movie',movieRouter)
router.use('/actorFilm',actorFilmRouter)


module.exports = router