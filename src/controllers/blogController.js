const BlogModel = require('../models/blogModel')
const AuthorModel = require('../models/authorModel')
const Validation = require('../validations/validator')
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const moment = require('moment')
const { findById } = require('../models/blogModel')



//Create a blog document from request body. Get authorId in request body only.

// Make sure the authorId is a valid authorId by checking the author exist in the authors collection.

// Return HTTP status 201 on a succesful blog creation. Also return the blog document. The response should be a JSON object like this

// Create atleast 5 blogs for each author

// Return HTTP status 400 for an invalid request with a response body like this


const createBlogs = async (req, res) => {

      try {
            let data = req.body
            let { title, body, category, authorId , isPublished ,publishedAt } = data;
            
            if (Object.keys(req.body).length < 1) {
                  return res.status(400).send({ msg: "Insert Data : BAD REQUEST" })
            }
            if (!Validation.isValid(title)) {
                  return res.status(400).send({status:false, msg: "Enter Title" })
            }

            if (!Validation.isValid(body)) {
                  return res.status(400).send({ status:false, msg: "Enter Body" })
            }

            if (!Validation.isValid(category)) {
                  return res.status(400).send({ status:false, msg: "Enter Category" })
            }

            if (!authorId || !Validation.isValid(authorId) ) {
                  return res.status(400).send({ status:false, msg: "Enter  Author Id" })
            }

            let validAuthorId = await AuthorModel.findById(authorId)
            if (!validAuthorId ) {
                  return res.status(400).send({ status: false, message: "Invalid  authorId" })
             }

             if(authorId !==  req.authorId) {
                  //console.log(req.authorId)
                  return res.status(401).send({ status: false, message: "Authorisation failled" })
             }
             
             if(isPublished === true){
                data.publishedAt = Date.now()  
            }
             
            let savedData = await BlogModel.create(data)
            res.status(201).send({ status: true, msg: savedData})

      }
      catch (err) {
            res.status(500).send({ status : false, error : err.message })
      }


}


// Get Api
// Returns all blogs in the collection that aren't deleted and are published
// Return the HTTP status 200 if any documents are found. The response structure should be like this
// If no documents are found then return an HTTP status 404 with a response like this
// Filter blogs list by applying filters. Query param can have any combination of below filters.
// By author Id
// By category
// List of blogs that have a specific tag
// List of blogs that have a specific subcategory example of a query url: blogs?filtername=filtervalue&f2=fv2

const getBlogs = async (req, res) => {

      try {
            let data = req.query
            let filterData = { isDeleted: false, isPublished: true }
            const { category, subcategory, tags, authorId } = data

            if (category) {
                 filterData.category = category
            }

            if (subcategory) {
                  filterData.subcategory = subcategory
            }
            
            if(tags) {
                  filterData.tags = tags
            }

            if (authorId) {
                 filterData.authorId = authorId
            }

            let validAuthorId = mongoose.Types.ObjectId(authorId)
            if (validAuthorId == false) {
                        return res.status(400).send({ status: false, message: "Invalid  authorId" })
            }
                  
           //filterData = { ...data, ...filterData }      // with rest operator and use like or operator

            let getQueryData = await BlogModel.find(filterData)
            let  count = getQueryData.length

            if (getQueryData.length == 0) {
                  return res .status(404).send({ status: false, message: "No blogs found " })
            }

            return res.status(200).send({ status: true, count:count ,message: getQueryData })

      }
      catch (err) {
            res.status(500).send({ status: false, error: err.message })
      }

}

// PUT /blogs/:blogId
// Updates a blog by changing the its title, body, adding tags, adding a subcategory. (Assuming tag and subcategory received in body is need to be added)
// Updates a blog by changing its publish status i.e. adds publishedAt date and set published to true                                 
// Check if the blogId exists (must have isDeleted false). If it doesn't, return an HTTP status 404 with a response body like this
// Return an HTTP status 200 if updated successfully with a body like this
// Also make sure in the response you return the updated blog document.


const updateBlogs = async (req, res) => {
      try {

            let data = req.body
            let date = moment().format()
            let blogId = req.params.blogId

            const { title, body, category, tags, subcategory,isPublished } = data

            if (Object.keys(data).length == 0) {
                  return res.status(400).send({ status: false, msg: "Body should not be Empty.. " })
            }

            if(!mongoose.isValidObjectId(blogId)){
                  return res.status(400).send({status:false,msg:"please enter valid blogId"})
            }
     
            let dbdata = await BlogModel.findById(blogId )
            if (!dbdata) {
                  return res.status(404).send({ status: false, message: "invalid blogId" });
            }
             
            let authorsId = dbdata.authorId.toString()
            if(authorsId !== req.authorId){
                  return res.status(401).send({status:false ,msg: "you are not Authorised"})
            }

            if(dbdata.isDeleted === true){
                  return res.status(400).send({status:false,msg :"Can not update already Deleted Blog"})
            } 

            let blog = await BlogModel.findOneAndUpdate({ _id: blogId, isDeleted: false },// isDeleted: false  
                  {
                        $set: { isPublished:isPublished, body: body, title: title, publishedAt: date },
                        $push: { category:category,tags: tags, subcategory: subcategory }
                  },
                  { new: true })

            if (!blog) {
                  return res.status(200).send({ status: false, msg:"already deleted" })
            }
            return res.status(200).send({ status: true, msg: blog })


      } catch (err) {
            res.status(500).send({ status: false, error: err.message })
      }
}


//delete api using params

const deleteBlogs1 = async function (req, res) {
      try {

            let blogId = req.params.blogId
            if (!ObjectId.isValid(blogId)) {
                  return res.status(400).send({ status: false, msg: "invalid Blog id" })
            }
            let blog = await BlogModel.findById({ _id: blogId, isDeleted: false, deletedAt: false })
            if (!blog) {
                  return res.status(404).send({ status: false, error: "No such blog exists" })
            }

            if(blog.authorId !== req.authorId){
                  res.status(401).send({status:false ,msg :"you are not authorised"})
            }

            if (blog.isDeleted == true) {
                  return res.status(400).send({ status: false, error: "document already deleted" })
            }


            updatedData = await BlogModel.findOneAndUpdate({ _id: blogId },
                  { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })

            return res.status(200).send({ status: true, msg: "daleted successfully", data: updatedData })

      }
      catch (err) {
            return res.status(400).send({ status: false, error: err.message })
      }
}

// / DELETE /blogs?queryParams
// Delete blog documents by category, authorid, tag name, subcategory name, unpublished
// If the blog document doesn't exist then return an HTTP status of 404 with a body like this

//delete Api using query parama

const deleteBlogs2 = async (req, res) => {
      try {
        
        let filterData= {isDeleted:false ,authorId:req.authorId}
            const { category, authorId, tags, subcategory, isPublished } = req.query;

            if (category) {
                   filterData.category = category            
            }
            if (authorId) {
                  if (!ObjectId.isValid(authorId)) {
                        return res.status(400).send({ status: false, msg: "invalid author id" })
                  }else{
                        filterData.authorId = authorId
                  }
                 
            }
            if (tags) {
                  filterData.tags = tags
            }

            if (subcategory) {
                  filterData.subcategory = subcategory      
            }

            if (isPublished) {
                  if (req.query.isPublished == "true") {
                        return res.status(400).send({ status: false, msg: "Document published is not deleted" })
                  }else{
                        filterData.isPublished = isPublished
                  }
                   
            }
            let blogdata = await BlogModel.findOne({filterData})
            if(!blogdata){
                  return res.status(404).send({ status: false, msg: "no data is found to be deleted" })
                  }

            if (data.authorId._id !== req.authorId){
                  res.status(401).send({status:false ,msg :"you are not authorised"})
            }


            let updateData = await BlogModel.updateOne(filterData,{isDeleted:true},{new:true})
            return res.status(200).send({status:true ,msg:"Blog Deleted Successfully", data: updateData})
      }
      catch (err) {
            res.status(500).send({ status: false, msg: err.message })
      }

}




module.exports.createBlogs = createBlogs
module.exports.getBlogs = getBlogs
module.exports.updateBlogs = updateBlogs
module.exports.deleteBlog = deleteBlogs1
module.exports.deleteBlog2 = deleteBlogs2