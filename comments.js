// Create web server

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comment = require('./models/comment');  


// Connect to MongoDB
mongoose.connect('mongodb://localhost/comments', { useNewUrlParser: true, useUnifiedTopology: true });      

// Middleware
app.use(bodyParser.json()); 

// Routes

// Get all comments
app.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new comment
app.post('/comments', async (req, res) => {
  const comment = new Comment({
    text: req.body.text
  });
  try {
    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});