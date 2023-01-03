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

router.delete("/deleteBlog/:blogId",BlogController.deleteBlog)





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

 


module.exports = router