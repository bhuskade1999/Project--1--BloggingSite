const express = require("express")
const router = express.Router()
const AuthorController = require('../controllers/authorController')
const BlogController = require('../controllers/blogController')
const Middleware = require('../middlewares/commonMiddlewares')


router.post("/authors", AuthorController.authors) //create author

router.post("/blogs",Middleware.authentication, BlogController.createBlogs)  //create blog

router.get("/Blogs",Middleware.authentication, BlogController.getBlogs)

router.put("/Blogs/:blogId",Middleware.authentication, BlogController.updateBlogs)

router.delete("/Blogs/:blogId",Middleware.authentication,   BlogController.deleteBlog)

router.delete("/Blogs",Middleware.authentication,   BlogController.deleteBlog2)


router.post("/login",AuthorController.login)







module.exports = router