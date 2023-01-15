const express = require("express")
const router = express.Router()
const AuthorController = require('../controllers/authorController')
const BlogController = require('../controllers/blogController')
const Middleware = require('../middlewares/commonMiddlewares')


router.post("/authors", AuthorController.authors) //create author

router.post("/blogs",Middleware.authentication, BlogController.createBlogs)  //create blog

router.get("/blogs",Middleware.authentication, BlogController.getBlogs) //get blog

router.put("/blogs/:blogId",Middleware.authentication, BlogController.updateBlogs)  //update blog

router.delete("/blogs/:blogId",Middleware.authentication,   BlogController.deleteBlog)  //delete blog by Id

router.delete("/blog",Middleware.authentication,  BlogController.deleteBlog2)  // delete blog by query


router.post("/login",AuthorController.login)   //author login







module.exports = router