const express = require('express')
const app = express()
const port =4000
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://booksland:booksland123@cluster0.kxbgnhq.mongodb.net/')
.then(()=>{
    console.log('Database connected successfully');
})
.catch((err)=>{console.error('Error conncecting to database:',err)});

const Users = mongoose.model('Users',{username:String,password:String});
app.get('/',(req,res)=>{
    res.send(`<h1>Hello World!</h1>`);
})

// signup api
app.get('/signup',(req,res)=>{
    // const username = 'username';
    // const password = 'password';
    const  user = new Users({username:"Ram Bogati",password:"TV WALA MANXE"}).save().then((doc) => {
        console.log("User added");
        res.json(doc);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error adding the user.");
      });

})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})