// Create web server
// Create a route that listens to post requests
// When a post request is made, save the comment to the database
// Create a route that listens to get requests
// When a get request is made, send all the comments in the database

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('./models/comment');

mongoose.connect('mongodb://localhost/comments');

app.use(bodyParser.json());

app.post('/comments', (req, res) => {
  const comment = new Comment({
    text: req.body.text
  });

  comment.save().then(() => {
    res.send('Comment saved');
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.get('/comments', (req, res) => {
  Comment.find().then((comments) => {
    res.send(comments);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
