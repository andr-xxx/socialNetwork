const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.get('/', (req, res) => {
  renderAllPosts(req, res);
});

router.get('/home', (req, res) => {
  renderAllPosts(req, res);
});

router.get('/contact', (req, res) => {
  res.render(__dirname + `/public/contact/contact.pug`, {
    title: 'Contacts',
    author: 'Andrey',
    phone: '(050) 71 39 416',
    menu: ['home', 'contact', 'about', 'registration']
  })
});

router.get('/about', (req, res) => {
  res.render(__dirname + `/public/about/about.pug`, {
    title: 'About',
    textAbout: 'My first NodeJS application',
    menu: ['home', 'contact', 'about', 'registration']
  })
});

router.post('/api/addPost', (req, res) => {
  const post = req.body;

  db.connect((err, db) => {
    db.collection("posts").insertOne(post, (err, result) => {

      if(err) return res.status(400).send();

      renderAllPosts(req, res);
      db.close();
    });
  });
});

router.delete('/api/deletePost', (req, res) => {
  const id = new objectId(req.body.id);
  mongoClient.connect(url, (err, db) => {
    db.collection("posts").findOneAndDelete({_id: id}, (err, result) => {

      if (err) return res.status(400).send();
      renderAllPosts(req, res);
      db.close();
    });
  });
});

router.get('/registration', (req, res) => {
  res.render(__dirname + `/public/registration/index.pug`)
});

function renderAllPosts(req, res) {
  db.connect((err, db) => {
    db.get().collection("posts").find({}).toArray((err, posts) => {
      res.render(__dirname + `/public/main/index.pug`, {
        menu: ['home', 'contact', 'about'],
        posts: posts,
      });
      // res.send('hello')
      db.close();
    });
  });
}

module.exports = router;