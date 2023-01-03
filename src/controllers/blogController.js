const BlogModel = require('../models/blogModel')
const AuthorModel = require('../models/authorModel')
const { default: mongoose } = require('mongoose')



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

const getBlogs = async (req, res) => {

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
            let verifyTags = await BlogModel.findOne({ tags: tags })
            if (!verifyTags) {
                  return res
                        .status(404)
                        .send({ status: false, msg: "No blogs in this tags" })
            }
      }
      if (authorId) {
            let validAuthorId = mongoose.Types.ObjectId.validAuthorId(authorId)
            if (validAuthorId == false) {
                  return res
                        .status(400)
                        .send({ status: false, message: "Invalid length of authorId" })
            }
      }



}





module.exports.blogs = blogs