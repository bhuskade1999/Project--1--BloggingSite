const express = require("express")
const router = express.Router()
const AuthorController = require('../controllers/authorController')
const BlogController = require('../controllers/blogController')
const middleware = require('../middlewares/commonMiddlewares')


router.post("/authors", AuthorController.authors)

router.post("/blogs",middleware.middle1, BlogController.blogs)

router.get("/Blogs", BlogController.getBlogs)

router.put("/Blogs/:blogId",middleware.middle2, BlogController.updateBlogs)

router.delete("/deleteBlog/:blogId",BlogController.deleteBlog)

router.delete("/Blogs", BlogController.deleteBlog2)

//-----------------------------------------

router.post("/login",AuthorController.login)







module.exports = router