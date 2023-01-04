 const AuthorModel = require('../models/authorModel')
 const BlogModel = require('../models/blogModel')
 const jwt = require('jsonwebtoken')


 const middle1 = async (req,res,next) => {

      let data = req.body
      let authorId = data.authorId
      const header = req.headers["x-api-key"]

      if(!header){
          res.status(400).send({status :false , msg : "token is mandatory in header"})
      }
      let decode = jwt.verify(header,"functionup")
      
      if (!decode){
          res.status(401).send({status : false, msg: "token is invalid"})
      }

      let tokenId = decode.userId  
      if(authorId !== tokenId){
            return res.status(401).send({status:false,msg:"unathorised user"})
      }
      next()


 }
 const middle2 = async (req,res,next) => {

      
      let blogId = req.params.blogId
      const token = req.headers["x-api-key"]

      if(!token){
          res.status(400).send({status :false , msg : "token is mandatory in header"})
      }
      let decoded = jwt.verify(token,"functionup")
      
      if (!decoded){
          res.status(401).send({status : false, msg: "token is invalid"})
      }
      let tokenId = decoded.userId  
       
      let details = await  BlogModel.findOne({_id:blogId})
      let authorsId = details.authorId

      if(authorsId !== tokenId){
            return res.status(401).send({status:false,msg:"unathorised user"})
      }


      next()


 }





 module.exports.middle1 = middle1
 module.exports.middle2 = middle2