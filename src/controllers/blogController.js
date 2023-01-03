const BlogModel = require('../models/blogModel')
const AuthorModel = require('../models/authorModel')
const mongoose = require('mongoose')




const blogs = async (req, res) => {
      try {
            let data = req.body
            let authorId = data.authorId
            if (!authorId) {
                  return res.status(404).send({ Error: "AuthorId must be present" })
            }
            let savedAuthorId = await AuthorModel.findById(authorId)
            if (!savedAuthorId) {
                  return res.status(404).send({ Error: "authorId is inValid" })
            }
            let savedData = await BlogModel.create(data)
            res.status(201).send({ status: true, msg: savedData })
      }
      catch (err) {
            res.status(400).send({ msg: "authorId is inValid", error: err.message })
      }


}


// Get Api

const getBlogs = async (req, res) => {
      try {
            let data = req.query

            let filter = { isDeleted: false, isPublished: true }

            const { category, subcategory, tags, authorId } = data

            if (category) {
                  let verifyCategory = await BlogModel.findOne({ category: category })
                  if (!verifyCategory) {
                        return res
                              .status(404)
                              .send({ status: false, msg: "No blogs in this category" })
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
            if (tags) {
                  let verifyTags = await BlogModel.findOne({ tags: tags }) // it can't return after 0th index 
                  if (!verifyTags) {
                        return res
                              .status(404)
                              .send({ status: false, msg: "No blogs in this tags" })
                  }
            }
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

            filter = { ...data, ...filter }      // with rest operator and use like or operator

            let getQueryData = await BlogModel.find(filter)

            if (getQueryData.length == 0) {
                  return res
                        .status(404)
                        .send({ status: false, message: "No blogs found" })
            }
            else {
                  return res
                        .status(200)
                        .send({ status: true, message: getQueryData })
            }
      }
      catch (err) {
            res.status(400).send({ status: false, error: err.message })
      }

}



//delete api using params

const deleteBlog = async function (req,res) {
 try{

 let blogId = req.params.blogId
    findData = await BlogModel.findOne({_id:blogId})
    if(!findData){
      return res.status(404).send({status:false,error:"please enter valid BlogId"})
    }


    if(findData.isDeleted == true){
       return res.status(400).send({status:false, error:"document already deleted"})
    }


    deleteData =await BlogModel.findOneAndUpdate({_id:blogId},
      {$set:{isDeleted:true}},{new:true})

    return res.status(200).send({status:true,msg :deleteData})
    
      }
      catch(err){
            res.status(400).send({ status: false, error: err.message })
      }
}


//delete Api using query parama

const deleteBlog2=async function(req,res){
      data = req.query
      const{ category, authorid, tags, subcategory , unpublished} = data
      
      savedata =await BlogModel.find()
}









module.exports.deleteBlog = deleteBlog
module.exports.blogs = blogs
module.exports.getBlogs = getBlogs