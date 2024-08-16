const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');
const hashtagModel = require('./models/hashtag');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const path = require('path');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.get('/', async (req, res) => {
  // if (req.user.email) {
  //   const user = await userModel.findOne({ email: req.user.email })
  //   const posts = await postModel.find()
  //   if (!user) {
  //     return res.cookie('token', '').redirect('/');
  //   }    
  //   res.render('index', { user, posts });
  // }
  res.send("Welcome");
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { name, email, password, username, phone, image } = req.body;
  const user = await userModel.findOne({ email: email })


  if (user) {
    return res.status(400).json({ message: 'email already exists' });
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) throw err;
      const newUser = await userModel.create({ name, email, password: hash, username, phone, image });
      req.user = newUser;
      const token = jwt.sign({ userName: newUser.username, email: newUser.email }, 'secretKey')
      res.cookie('token', token)
      res.redirect('/');
    });
  })
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: 'error credentials' });
  }
  bcrypt.compare(password, user.password, function (err, result) {
    if (!result) {
      return res.status(401).json({ message: 'error credentials' });
    }
    const token = jwt.sign({ userName: user.username, email: user.email }, 'secretKey')
    res.cookie('token', token);
    res.redirect('/');
  })
});

app.get('/logout', (req, res) => {
  res.cookie('token', '');
  res.redirect('/login');
});


app.get('/dashboard', (req, res) => {
  res.render('index', { user: req.user });
})
app.post('/add-post', isLoggedIn, async (req, res) => {
  const { caption, image } = req.body;
  const user = await userModel.findOne({ email: req.user.email });
  let hashtags = []
  if (caption.indexOf('#') !== -1) {
    hashtags = caption.split(' ').filter((word) => word.startsWith('#'))
    hashtags.forEach(async (tag) => {
      const hashtag = await hashtagModel.findOne({ tag })
      if (hashtag) {
        await hashtagModel.findOneAndUpdate({ tag }, { used: ++hashtag.used })
      }else{
       await hashtagModel.create({ tag });
      }
    });
  }

  const post = await postModel.create({ caption, image, user: user._id, username: user.username, hashtags: hashtags});
  user.posts.push(post._id);
  user.save();
  res.redirect('/');
})

app.get('/like/:id', isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });
  const post = await postModel.findOne({ _id : req.params.id});
  if(user.likedPosts.indexOf(req.params.id) > -1){
    console.log('old post', req.params.id, post.likes.indexOf(user._id));

    post.likes.splice(post.likes.indexOf(user._id), 1);
    user.likedPosts.splice(user.likedPosts.indexOf(post._id), 1);
  }else{
    post.likes.push(user._id);
    user.likedPosts.push(post._id);
    console.log('new post', req.params.id);
  }
  post.save();
  user.save();
  res.redirect('/');  
})

function isLoggedIn(req, res, next) {
  if (req.cookies.token === '') {
    res.redirect('/login')
  } else {
    jwt.verify(req.cookies.token, 'secretKey', (err, decoded) => {
      if (err) {
        res.send(err);
      }
      req.user = decoded;
    });
    next()
  }
}

app.listen(3000)