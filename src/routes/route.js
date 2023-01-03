const express = require("express")
const { default: mongoose } = require("mongoose")
const router = express.Router()
const AuthorController = require('../controllers/authorController')
const BlogController = require('../controllers/blogController')
//paras addition
const validObjectID = function(value){mongoose.Types.ObjectId.isValid(value)}
const BlogModel = require("../models/blogModel")

router.post("/authors", AuthorController.authors)

router.post("/blogs", BlogController.blogs)

router.get("/getBlogs", BlogController.getBlogs)

router.put("/blogs/:blogId", async function(req,res){
   try{
    let id = req.params.blogId
    console.log(id)
  
   
    // if(validObjectID(id)) {                                                  // having problem in this
    //     res.status(404).send({msg : "object id is not correct"})}          // blog id is correct or not
    
    let data = req.body                                             // accessing req.body
    let dbdata = await BlogModel.findOne({_id : id})                // finding blog with the help of id in path params
    console.log(data.isDeleted)
    if(data.isDeleted){                                      // if req.body has isdeleted key so create timestamps in dbdata                                                  
        dbdata.deletedAt = Date.now()
        
    }
    else if(data.isPublished){                              // if req.body has ispublished ket so create timestamps in dbdata
    console.log(data.isPublished)
    dbdata.publishedAt = Date.now()
    console.log(dbdata)
    }
    else if(data.tags||data.subcategory){                                    // if req.body has tags and subcategory  push below content in these dbdata  
        let tags = dbdata.tags
        let subcat = dbdata.subcategory
        
        tags.push(data.tags)                                                   // adding null problem
        subcat.push(data.subcategory)     

        let update1 = await BlogModel.findOneAndUpdate(             // insert all the data inside original data                            
            {_id : id},
            {$set : dbdata},
            {new :true}
        )
        res.status(200).send({status : true, data : update1})
    }
    else{                              
        let update = await BlogModel.findOneAndUpdate(              // else if doesn't find any of the above attributes so just simpily update body data in model
            {_id : id },
            {$set : data},
            {new : true})
        
            res.status(200).send({status : true, data : update})
        
    }
   }catch(err){
     res.status(500).send({error : "error" , msg : "something went wrong" })
   }
})

// DELETE /blogs?queryParams
// Delete blog documents by category, authorid, tag name, subcategory name, unpublished
// If the blog document doesn't exist then return an HTTP status of 404 with a body like this

router.delete("/blogs", async function(req,res){
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