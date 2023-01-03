const BlogModel = require('../models/blogModel')
const AuthorModel = require('../models/authorModel')
const mongoose = require('mongoose')



//Create a blog document from request body. Get authorId in request body only.

// Make sure the authorId is a valid authorId by checking the author exist in the authors collection.

// Return HTTP status 201 on a succesful blog creation. Also return the blog document. The response should be a JSON object like this

// Create atleast 5 blogs for each author

// Return HTTP status 400 for an invalid request with a response body like this


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

// PUT /blogs/:blogId
// Updates a blog by changing the its title, body, adding tags, adding a subcategory. (Assuming tag and subcategory received in body is need to be added)
// Updates a blog by changing its publish status i.e. adds publishedAt date and set published to true
// Check if the blogId exists (must have isDeleted false). If it doesn't, return an HTTP status 404 with a response body like this
// Return an HTTP status 200 if updated successfully with a body like this
// Also make sure in the response you return the updated blog document.


module.exports.blogs = blogs
module.exports.getBlogs = getBlogs