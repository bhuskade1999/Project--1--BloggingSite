const express = require("express")
const router = express.Router()
const AuthorController = require('../controllers/authorController')
const BlogController = require('../controllers/blogController')



router.post("/authors", AuthorController.authors)

router.post("/blogs", BlogController.blogs)

router.get("/Blogs", BlogController.getBlogs)

router.put("/Blogs/:blogId", BlogController.updateBlogs)

router.delete("/deleteBlog/:blogId",BlogController.deleteBlog)

router.delete("/Blogs", BlogController.deleteBlog2)









module.exports = router