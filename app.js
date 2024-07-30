const express = require('express')
const app = express()
const cors = require('cors')
const ejs = require('ejs')

// mongodb database connect here
require('./config/dataBase')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//Router Here
const router = require('./Router/router')
app.use(router)
//here set ejs 
app.set('view engine', 'ejs')
app.use(cors())



module.exports =app;