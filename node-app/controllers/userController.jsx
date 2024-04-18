const mongoose = require('mongoose')
var jwt = require('jsonwebtoken')

const Users = mongoose.model("Users", {
    username: String,
    password: String,
    cartProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
  });

  // favourites
module.exports.favourites = (req, res) => {
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
  }
module.exports.dislikeFavourites = (req, res) => {
    let productId = req.body.productId;
    let userId = req.body.userId;
  
    Users.updateOne({_id:userId }, { $pull: { cartProducts:productId} })
      .then(() => {
        res.send({ message: "added successfully" })
      })
      .catch(() => {
        res.send({ message: "server err" })
      })
  }

  module.exports.favouritesById =  (req, res) => {
    Users.findOne({ _id: req.body.userId })
      .populate("cartProducts")
      .then((result) => {
        // console.log({ result: "product data" });
        res.send({ message: "success", products: result.cartProducts });
      })
      .catch((err) => {
        res.send({ message: "server err" });
      });
  }

  module.exports.userProfile = (req, res) => {
    console.log(req.params.id);
    Users.findOne({ _id: req.params.id })
      .then((result) => {
        res.send({
          message: "success",
          user: {
            username: result.username,
          },
        });
      })
      .catch((err) => {
        res.send({ message: "server err" });
      });
  }

  module.exports.signup = (req, res) => {
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
  }

  module.exports.login =  (req, res) => {
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
  
            res.send({
              message: `Welcome ${doc.username}`,
              token: token,
              userId: doc._id,
            });
          }
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error logging in");
      });
  }