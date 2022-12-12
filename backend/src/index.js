const express = require ("express")
const app = express()
const mongoose = require ("mongoose")
require ("dotenv").config()
mongoose.set('strictQuery', true);
const route = require("./router/route")
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(cookieParser())


mongoose.connect(process.env.MONGO_CONNECTION,{useNewUrlParser:true})
.then(()=>{
    console.log("MongoDB is Connected..")
}).catch(err=>{
    console.log(err.message);
})


app.use('/',route)

app.listen(process.env.PORT, () =>{
    console.log("Backend is running on port " + process.env.PORT)
})