const BlogModel = require('../models/blogModel')
const AuthorModel = require('../models/authorModel')



const createBlog = async (req,res) => {
      let data = req.body
      let createBlog = await BlogModel.create(data)
      res.status(201).send({store:createBlog})
}

module.exports.createBlog = createBlog