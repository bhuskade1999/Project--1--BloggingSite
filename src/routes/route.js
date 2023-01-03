const express = require("express")
const router = express.Router()
const AuthorController = require('../controllers/authorController')
const BlogController = require('../controllers/blogController')



router.post("/authors", AuthorController.authors)

router.post("/blogs", BlogController.blogs)

router.get("/getBlogs", BlogController.getBlogs)


 


module.exports = router