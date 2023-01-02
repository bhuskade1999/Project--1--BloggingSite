 const AuthorModel = require('../models/authorModel')


 const validAuth = async (req,res,next) => {
      let authorId = req.body.authorId
      if(!authorId) return res.status(404).send({Error:"Auhor must be present"})

      let validAuthor = await AuthorModel.findById(authorId)
      if(validAuthor){
            next()
      }
      else{
            res.status(400).send({Error:"authorId is not valid"})
      }

 }

 module.exports.validAuth = validAuth