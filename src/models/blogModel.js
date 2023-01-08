const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
      
      title: {
            type: String,
            required: true
      },
      body: {
            type: String,
            required: true
      },
      authorId: {
            type: objectId,
            required:true,
            ref: "Author"
      },
      tags: [String],
      category: {
            type: [String],
            required: true
      },
      subcategory: {
            type:[String]
      },
      isPublished: {
            type: Boolean,
            default: false
      },
      publishedAt:{
            type: Date,
            default:null
      },
      isDeleted: {
            type: Boolean,
            default: false
      },
      deletedAt:{
            type:Date,  
      },
      
      
      

}, { timestamps: true })

module.exports = mongoose.model("Blogs", blogSchema)


// title: {mandatory},
//         body: {mandatory},
//         authorId: {mandatory, refs to author model},
//         tags: {array of string},
//         category: {string, mandatory},
//         subcategory: {array of string, examples[technology-[web development, mobile development, AI, ML etc]] },
//         createdAt, updatedAt, deletedAt: {when the document is deleted},
//         isDeleted: {boolean, default: false},
//         publishedAt: {when the blog is published},
//         isPublished: {boolean, default: false}}