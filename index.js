const express = require('express')
const app = express()
const route = require('./route/route')
const mongoose = require('mongoose')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb+srv://rahul4317:L0Jf8dKS6E1sKl1C@cluster0.dwi1fgs.mongodb.net/Rahul4317')
.then(()=>console.log("MongoDB is connected"))
.catch((error)=>error)

app.use('/',route)


app.listen(process.env.PORT || 3000 , ()=>{
    console.log(`The server is running on ${process.env.PORT || 3000}`)
})