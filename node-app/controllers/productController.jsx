const mongoose = require('mongoose')

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

  //search
module.exports.search = (req, res) =>{
 
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
  }

  module.exports.addedProducts =   (req, res) => {
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
  }

//   module.exports.getProducts = (req, res) => {
//     const catName = req.query.catName;
//     console.log(catName)
  
//     Prodcuts.find({ category: catName })
//       .sort({ postingTime: -1 }) // Sorting by posting time in descending order
//       .then((result) => {
//         res.send({ message: "success", products: result });
//       })
//       .catch((err) => {
//         res.send({ message: "server err" });
//       });
//   }

module.exports.getProducts = (req, res) => {
    const { catName, typeName } = req.query; 
    let query = {}; // Initialize an empty query object
  
    // Check if a specific category is provided
    if (catName && catName !== "All") {
      query.category = catName; 
    }
  
    // Check if a specific type is provided
    if (typeName && typeName !== "All") {
      query.type = typeName; // Add type to the query
    }
  
    Prodcuts.find(query) // Pass the query object to filter products
      .sort({ postingTime: -1 }) // Sorting by posting time in descending order
      .then((result) => {
        res.send({ message: "success", products: result });
      })
      .catch((err) => {
        res.send({ message: "server err" });
      });
  };
  

  module.exports.getProductsById = (req, res) => {
    Prodcuts.findOne({ _id: req.params.id })
      .then((result) => {
        res.send({ message: "success", product: result });
      })
      .catch((err) => {
        res.send({ message: "server err" });
      });
  }

  module.exports.myProducts = (req, res) => {
    Prodcuts.find({ addedBy: req.body.userId })
      .then((result) => {
        res.send({ message: "success", products: result });
      })
      .catch((err) => {
        res.send({ message: "server err" });
      });
  }