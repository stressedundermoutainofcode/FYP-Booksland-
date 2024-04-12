const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var jwt = require('jsonwebtoken')
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

const port = 4000;
const uri = "mongodb+srv://booksland:booksland123@cluster0.kxbgnhq.mongodb.net/";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Error conncecting to database:", err);
  });

const Users = mongoose.model("Users", { username: String, password: String });

app.get("/", (req, res) => {
  res.send(`<h1>Hello World!</h1>`);
});

// signup api
app.post("/signup", (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  const user = new Users({ username, password})
    .save()
    .then((doc) => {
      res.status(201).send({message: `User ${doc.username} created`})
      console.log("User added");
      res.json(doc);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error adding the user.");
    });
});

//login api
app.post("/login", (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  Users.findOne({ username: username })
    .then((doc) => {
      console.log(doc, "user data");
      if (!doc) {
        res.send({ message: "User not found" });
      }  else {
        if (doc.password !== password) {
          res.send({ message: "Invalid password" });
        }
        if(doc.password == password){
          const token = jwt.sign({username:doc.username},'secret',{expiresIn:'1h'})

          res.send({ message: `Welcome ${doc.username}`,token:token });

        }
        
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error logging in");
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});