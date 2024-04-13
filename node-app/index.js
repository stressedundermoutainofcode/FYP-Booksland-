const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
var jwt = require('jsonwebtoken')
const mongoose = require("mongoose");
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const app = express();
const upload = multer({ storage: storage })
app.use('/uploads', express.static(path.join(__dirname,'uploads')));

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
const Prodcuts = mongoose.model("Products", { bookName: String, bookDescription: String, bookPrice:String, bookCategory:String, bookImage: String })

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

//add listing
app.post('/add-product',upload.single('bookImage'),(req,res)=>{
  console.log(req.body);
  console.log(req.file.path);
  const bookName = req.body.bookName;
  const bookImage = req.file.path;
  const bookPrice = req.body.bookPrice;
  const bookDescription = req.body.bookDescription;
  const bookCategory = req.body.bookCategory; 
  const product = new Prodcuts({bookName,bookDescription,bookPrice,bookCategory,bookImage})
  product.save()  
   .then(()=>{
    res.send({message: 'Listing Success'})
   })
   .catch(()=>{
    res.send({message:'Server err'})
   })
})

app.get('/get-products',(req,res)=>{
  Prodcuts.find()
  .then((result)=>{
    console.log({result:"product data"})
    res.send({message:'success',products:result})

  })
  .catch((err)=>{
    res.send({message:'server err'})

  })
  
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});