
const AuthorModel = require('../models/authorModel')
const Validation = require('../validations/validator')



// Create an author - atleast 5 authors
// Create a author document from request body. Endpoint: BASE_URL/authors


const authors = async (req, res) => {
      
      try {
            let data = req.body

            if (Object.keys(data).length == 0) {
                  return res.status(400).send({ status: false, msg: "author data is required" })
            }
            //using destructure

            const { fName, lName, title, email, password } = data

            if (!Validation.isValidNames(fName)) {
                  return res.status(400).send({ status: false, msg: "first name is required" })
            }

            if (!Validation.isValidNames(lName)) {
                  return res
                        .status(400)
                        .send({ status: false, msg: "last name is required" })
            }

            if (!Validation.isValidNames(title)) {
                  return res
                        .status(400)
                        .send({ status: false, msg: "title is required" })
            }
            if (!["Mr", "Mrs", "Miss"].includes(title)) {
                  return res
                        .status(400)
                        .send({ status: false, msg: "title should contains Mr, Mrs, Miss" })
            }
            if (!email) {
                  return res
                        .status(400)
                        .send({ status: false, msg: "email is required" })
            }
            if (!Validation.isValidEmail(email)) {
                  return res
                        .status(400)
                        .send({ status: false, msg: "invalid email address" })
            }
            const emailUnique = await AuthorModel.findOne({ email: data.email })
            if (emailUnique) {
                  return res
                        .status(400)
                        .send({ status: false, msg: "email is already exist" })
            }
            if (!password) {
                  return res
                        .status(400)
                        .send({ status: false, msg: "password is required" })
            }

            let savedData = await AuthorModel.create(data)
            res.status(201).send({ status: true, msg: savedData })
      }
      catch (err) {
            return res.status(500).send({ status: false, error: err.message })
      }

}

module.exports.authors = authors
