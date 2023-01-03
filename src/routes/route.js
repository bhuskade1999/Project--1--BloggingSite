const express = require("express")
const { default: mongoose } = require("mongoose")
const router = express.Router()
const AuthorController = require('../controllers/authorController')
const BlogController = require('../controllers/blogController')



router.post("/authors", AuthorController.authors)

router.post("/blogs", BlogController.blogs)

router.get("/Blogs", BlogController.getBlogs)

<<<<<<< HEAD
router.delete("/deleteBlog/:blogId",BlogController.deleteBlog)





router.put("/blogs/:blogId", async function(req,res){
=======

router.put("/putBlogs/:blogId", BlogController.updateBlog)
router.put("/putBlogss/:blogId", BlogController.putApi)

// DELETE /blogs?queryParams
// Delete blog documents by category, authorid, tag name, subcategory name, unpublished
// If the blog document doesn't exist then return an HTTP status of 404 with a body like this

router.delete("/blogs", async function(req,res){
>>>>>>> 3300c64d612d8a0713167f33b94936fc0ca19c20
   try{
    const {authorId,tags,subcategory,isPublished} = req.query
    
    if (authorId) {
        let validAuthorId = mongoose.Types.ObjectId(authorId)
        if (validAuthorId == false) {
              return res
                    .status(400)
                    .send({ status: false, message: "Invalid length of authorId" })
        }

        let verifyAuthorId = await BlogModel.findOne({ authorId: authorId })
        if (!verifyAuthorId) {
              return res
                    .status(400)
                    .send({ status: false, message: "No blogs with this authorId exists" })
        }
  }
    if (tags) {
        let verifyTags = await BlogModel.findOne({ tags: tags }) // it can't return after 0th index 
            if (!verifyTags) {
             return res
                .status(404)
                .send({ status: false, msg: "No blogs in this tags" })
    }
}

    if (subcategory) {
        let verifySubCategory = await BlogModel.findOne({ subcategory: subcategory })
        if (!verifySubCategory) {
              return res
                    .status(404)
                    .send({ status: false, msg: "No blogs in this subcategory" })
        }
}

    if (isPublished) {
        let Unpublished = await BlogModel.find({ isPublished : isPublished })
        if (Unpublished) {
              if(Unpublished.isPublished == true){return res.status(404).send({status : false, msg : "no data found"}) }
            }else{
                return res.status(404).send({status : false, msg : "isPublished not found"})
            }
}
    let update = await BlogModel.updateMany( req.query,{$set : {isDeleted : false}},{new : true} )
    res.status(200).send({status : true,  msg : "blog succesfully deleted"})
}catch(err){
    res.send({msg : err.message})
}


})

module.exports = router