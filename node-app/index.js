const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
var jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");
const productController = require("./controllers/productController.jsx");
const userController = require("./controllers/userController.jsx");
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

app.get("/", (req, res) => {
  res.send(`<h1>Hello World!</h1>`);
});

// signup api
app.post("/signup", userController.signup);

//login api
app.post("/login",userController.login);

//add listing
app.post(
  "/add-product",
  upload.fields([{ name: "bookImage" }, { name: "bookImage2" }]),productController.addedProducts);

app.get("/get-products", productController.getProducts);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//cart api

app.post("/cart-products", userController.favourites);
app.post("/dislike-products", userController.dislikeFavourites);

// get cart products
app.post("/cart",userController.favouritesById);

app.get("/get-product/:id", productController.getProductsById);


// search backend api
app.get("/search", productController.search);

//get my listings
app.post("/my-products", productController.myProducts);

//user profile api
app.get("/my-profile/:id", userController.userProfile);
