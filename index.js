require('dotenv').config();
const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2
const app = express();
const mongoose = require('mongoose');
const pug = require('pug');
const port = 3000;

const User = require('./models/Upload');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

mongoose.connect('mongodb://localhost:27017/TestUdemy', { useUnifiedTopology: true, useNewUrlParser: true }, () => {
  console.log("Connect successfully")
});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'pug')
app.set('views', './views');


// use static file , css , images
app.use(express.static('public'));
app.get('/', async (req, res) => {
  res.redirect('/home');
})

app.get('/home', async (req, res) => {
  const allUser = await User.find();
  res.render('home', {
    users: allUser
  })
})
app.get('/post', function (req, res, next) {
  res.render('postinfor');
})

app.post('/post', upload.single('avatar'), async (req, res) => {
  var errors = [];
  var avatar;
  const { name, age } = req.body;
  try {
    await cloudinary.uploader.upload(req.file.path,
      function (error, result) {
        console.log(result)
        avatar = result.url
      }
    );
  } catch (error) {
    console.log(error);
  }


  const user = {
    name,
    age,
    avatar
  }
  console.log(user)
  if (errors.length) {
    res.render('/postinfor', {
      errors: errors
    })
  }
  const newUser = await User.create(user);
  console.log(newUser)
  res.redirect('/home');
})

app.listen(port, () => {
  console.log("App listening on port " + port)
})