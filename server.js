const express = require('express')
const mongoose=require('mongoose')
const ShortUrl = require('./models/ShortUrl')
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/UrlShortner', {
  userNewUrlParesr:true, useUnifiedTopology: true
})
 
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.get('/', async(req, res) => {
  const shortUrls= await ShortUrl.find()
  res.render('index',{shortUrls:shortUrls})
})

app.post('/shortUrls', (req, res) => {
  ShortUrl.create({ful: req.body.fullUrl})
  res.redirect('/')
  
})

app.listen(process.env.PORT || 5000);