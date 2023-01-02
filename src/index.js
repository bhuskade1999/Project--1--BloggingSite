const express = require("express")
const mongoose = require("mongoose")
const route = require("./routes/route")
mongoose.set('strictQuery', true)

const app = express()
app.use(express.json())

mongoose.connect("mongodb+srv://sanhil143:raisahab12345@sanhildb.kk3knyj.mongodb.net/bloggingSite",{
      useNewUrlParser:true
})
.then(() => console.error("My DB is connected"))
.catch((err) => console.error(err))


app.use("/",route)

app.listen(3000 , () => {
      console.error("Express app running on port " + 3000);
})





