const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();


const app = express();

// DB config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true , useUnifiedTopology: true})
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

const port = 3000;

app.listen(port, () => console.log(`Server up and running on port ${port}!`));

