const express = require("express")
const router = express.Router()
const AuthorController = require('../controllers/authorController')
const BlogController = require('../controllers/blogController')
const Middleware = require("../middlewares/commonMiddlewares")


router.post("/authors", AuthorController.authors)

router.post("/createBlog", Middleware.validAuth, BlogController.createBlog)











module.exports = router