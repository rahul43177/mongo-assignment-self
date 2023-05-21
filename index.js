const express = require('express')
const app = express()
const mongoose = require('mongoose')
const route = require('./route/route')


app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb+srv://rahul4317:L0Jf8dKS6E1sKl1C@cluster0.dwi1fgs.mongodb.net/Rahul4317')
.then(()=>console.log("MongoDB is connected"))
.catch((error)=>error)

app.use(function(req,res,next){
    let date = new Date()
    let currentTimeDate = date.toLocaleString()
    let ip = req.ip
    let route = req.url
    console.log(`The date ,ip and route is ${currentTimeDate} ${ip}${route}`)
    next()
})

app.use('/',route)


app.listen(process.env.PORT || 3000 , function(){
    console.log(`The server is running on port ${process.env.PORT || 3000}`)
})
