const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
var jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const app = express();
const upload = multer({ storage: storage });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 4000;
const uri =
  "mongodb+srv://booksland:booksland123@cluster0.kxbgnhq.mongodb.net/";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Error conncecting to database:", err);
  });

const Users = mongoose.model("Users", {
  username: String,
  password: String,
  cartProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
});

let Schema = new mongoose.Schema({
  bookName: String,
  bookDescription: String,
  bookPrice: String,
  bookCategory: String,
  bookImage: String,
  bookImage2: String,
  addedBy:mongoose.Schema.Types.ObjectId,
  postingTime: { type: Date, default: Date.now },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }

})
Schema.index({location: '2dsphere'});
const Prodcuts = mongoose.model("Products",Schema);

app.get("/", (req, res) => {
  res.send(`<h1>Hello World!</h1>`);
});

// signup api
app.post("/signup", (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  const user = new Users({ username, password })
    .save()
    .then((doc) => {
      res.send({ message: `User ${doc.username} created` });
      console.log("User added");
      res.json(doc);
    })
    .catch((err) => {
      console.error(err);
      res.send("Error adding the user.");
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
      } else {
        if (doc.password !== password) {
          res.send({ message: "Invalid password" });
        }
        if (doc.password == password) {
          const token = jwt.sign({ username: doc.username }, "secret", {
            expiresIn: "1h",
          });

          res.send({ message: `Welcome ${doc.username}`, token: token, userId:doc._id });
        }
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error logging in");
    });
});

//add listing
app.post("/add-product", upload.fields([{name: 'bookImage'}, {name: 'bookImage2'}]), (req, res) => {
 

  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const bookName = req.body.bookName;
  const bookImage = req.files.bookImage[0].path;
  const bookImage2 = req.files.bookImage2[0].path;
  const bookPrice = req.body.bookPrice;
  const bookDescription = req.body.bookDescription;
  const bookCategory = req.body.bookCategory;
  const addedBy = req.body.userId;
  const postingTime = new Date(); // Current time

  const product = new Prodcuts({
    bookName,
    bookDescription,
    bookPrice,
    bookCategory,
    bookImage,
    bookImage2,
    addedBy,
    postingTime,
    location: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
  });

  product
    .save()
    .then(() => {
      res.send({ message: "Listing Success" });
    })
    .catch(() => {
      res.send({ message: "Server err" });
    });
});


app.get("/get-products", (req, res) => {
  const catName = req.query.catName;

  Prodcuts.find({ category: catName })
    .sort({ postingTime: -1 }) // Sorting by posting time in descending order
    .then((result) => {
      res.send({ message: "success", products: result });
    })
    .catch((err) => {
      res.send({ message: "server err" });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//cart api

app.post('/cart-products', (req, res) => {
  let productId = req.body.productId;
  let userId = req.body.userId;
  console.log(req.body)

  Users.updateOne({_id:userId }, { $addToSet: { cartProducts:productId} })
    .then(() => {
      res.send({ message: "added successfully" })
    })
    .catch(() => {
      res.send({ message: "server err" })
    })
})

// get cart products
app.post("/cart", (req, res) => {
  Users.findOne({_id : req.body.userId}).populate('cartProducts')
    .then((result) => {
      // console.log({ result: "product data" });
      res.send({ message: "success", products: result.cartProducts});
    })
    .catch((err) => {
      res.send({ message: "server err" });
    });
});


app.get("/get-product/:id", (req, res) => {
  Prodcuts.findOne({ _id : req.params.id})
    .then((result) => {
      res.send({ message: "success", product: result });
    })
    .catch((err) => {
      res.send({ message: "server err" });
    });
});

//search backend api

// search backend api
app.get('/search', (req, res) =>{
 
  let latitude = parseFloat(req.query.loc.split(',')[0]);
  let longitude = parseFloat(req.query.loc.split(',')[1]);
  
  let search = req.query.search;
  
  Prodcuts.find({
    $or: [
      { bookName: { $regex: search, $options: 'i' } },
      { bookCategory: { $regex: search, $options: 'i' } },
      { bookDescription: { $regex: search, $options: 'i' } },
    ],
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        $maxDistance: 20000// Specify the maximum distance in meters
      }
    }
  })
  .then((results) => {
    res.send({ message: 'success', products: results });
  })
  .catch((err) => {
    res.send({ message: 'server err' });
  });
});

//get my listings
app.post('/my-products',(req,res) => {
  Prodcuts.find({ addedBy:req.body.userId })
  .then((result)=>{
    res.send({message: 'success', products:result})

  })
  .catch((err)=>{
    res.send({message:'server err'})
  })
})

//user profile api
app.get('/my-profile/:id',(req,res)=>{
  console.log(req.params.id)
  Users.findOne({ _id : req.params.id})
  .then((result)=>{
    res.send({message:'success', user:{
      username:result.username,
      
    }})
  })
  .catch((err)=>{
    res.send({message:'server err'})
  })
})

