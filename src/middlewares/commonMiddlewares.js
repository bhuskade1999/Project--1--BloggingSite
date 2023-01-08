const AuthorModel = require('../models/authorModel')
const BlogModel = require('../models/blogModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const authentication = function (req, res, next) {
   try{         
      let token = req.headers["x-api-key"];
      if (!token) {
            return res.status(400).send({ status: false, Error: "token is not present in header" })
      }
            
      let decodedToken = jwt.verify(token, "functionup")
      req.authorId = decodedToken.username
       next();
       }
       catch(err){
             res.status(500).send({status:false,error :err.message})
      }
      }
        




 module.exports.authentication = authentication;
 



