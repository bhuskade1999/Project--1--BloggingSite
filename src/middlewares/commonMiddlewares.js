const BlogModel = require('../models/blogModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const authentication = function (req, res, next) {
      try {
            let token = req.headers["x-api-key"];
            if (!token) {
                  return res.status(400).send({ status: false, Error: "authentication error, and token must be present" })
            }
            try {
                  let decodedToken = jwt.verify(token, "functionup")
                  req.headers["loggedUserId"] = decodedToken.username
                  // console.log(decodedToken);

                  next();
            }
            catch (err) {
                  return res.status(400).send({ status: false, msg: "invalid token" })
            }
      }
      catch (err) {
            return res.status(500).send({ status: false, msg: err.message })
      }
}

const authorization = async function (req, res, next) {
      try {
            loggedUserId = req.headers["loggedUserId"]
            // console.log(req.headers["loggedUserId"]);
            if (Object.keys(req.params).length != 0) {
                  let blogData = await BlogModel.findOne({ _id: req.params.blogId })
                  let authorId = blogData.authorId
                  // console.log(authorId);
                  if (authorId != loggedUserId) {
                        return res.status(403).send({ status: false, msg: "you are not authorized" })
                  }
            }
            if (req.query.authorId) {
                  if (req.query.authorId != loggedUserId) {
                        return res.status(403).send({ status: false, msg: req.query.authorId })
                  }
            }
            next();
      }
      catch (err) {
            return res.status(401).send({ status: false, error: err.message })
      }
}





module.exports.authentication = authentication;
module.exports.authorization = authorization;



