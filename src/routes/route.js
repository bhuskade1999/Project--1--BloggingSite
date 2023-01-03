const express = require("express")
const { default: mongoose } = require("mongoose")
const router = express.Router()
const AuthorController = require('../controllers/authorController')
const BlogController = require('../controllers/blogController')



router.post("/authors", AuthorController.authors)

router.post("/blogs", BlogController.blogs)

router.get("/Blogs", BlogController.getBlogs)

router.put("/putBlogs/:blogId", BlogController.updateBlog)
router.put("/putBlogss/:blogId", BlogController.putApi)

 


module.exports = router