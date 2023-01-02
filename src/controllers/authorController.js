const AuthorModel = require('../models/authorModel')

const authors = async (req,res) => {
      let data = req.body
      let createAuthor = await AuthorModel.create(data)
      res.status(201).send({store:createAuthor})
}

module.exports.authors = authors
