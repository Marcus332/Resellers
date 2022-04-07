// DEL 1 A
const express = require('express');
const { request } = require('http');
const path = require('path');
const data = require('./data');
const app = express();
var uniqid = require('uniqid');
const { stringify } = require('querystring');

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, './public/registration.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, './public/login.html'));
});

app.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, './public/user.html'));
});

app.get('/updateUser', (req, res) => {
  res.sendFile(path.join(__dirname, './public/updateUser.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, './public/home.html'));
});
//product
app.get('/product', (req, res) => {
  res.sendFile(path.join(__dirname, './public/product.html'));
});

app.get('/products/:category', (req, res) => {
  const category = req.params.category;
  console.log(data.findProductsByCategory(category));
  res.status(200).json(data.findProductsByCategory(category));
});

app.get('/deleteuser', (req, res) => {
  res.sendFile(path.join(__dirname, './public/deleteuser.html'));
});
app.get('/updateproduct/:Idproduct', (req, res) => {
  res.sendFile(path.join(__dirname, './public/updateproduct.html'));
});

app.post('/updateproduct', (req, res) => {
  
  let newProduct = {
    category: req.body.category,
    product: req.body.product,
    price: req.body.price,
    Idproduct: req.body.Idproduct,
    image: req.body.image,
    owner: ""
  };
  data.updateProduct(newProduct, res);
  
});


app.delete('/deleteProduct', (req, res) => {
  data.deleteProduct(req.body.Idproduct, res);
});

app.post('/registration', (req, res) => {
  let newUser = {
    email: req.body.email,
    password: req.body.password,
  };
  data.saveUser(newUser, res);
});

//produkt
app.post('/product', (req, res) => {
  let Idproduct = uniqid()
  let newProduct = {
    category: req.body.category,
    product: req.body.product,
    price: req.body.price,
    Idproduct: Idproduct,
    image: req.body.image,
    owner: ""
  };
  data.saveProduct(newProduct, res);
});

app.get('/listUserProducts/:email', (req, res) => {
  const email = req.params.email;
  res.status(200).json(data.listUserProducts(email));
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  data.userLogin(email, password, res);
});

app.delete('/delete', (req, res) => {
  const user = (userModel = {
    email: req.body.email,
    password: req.body.password,
  });
  data.deleteUser(user, res);
});

app.put('/update', (req, res) => {
  const user = (userModel = {
    email: req.body.email,
    password: req.body.password,
  });
  data.updateUser(user, res);
});

const PORT = 3000;
app.listen(3000, () => {
  console.log(`server lytter til port ${PORT}`);
});

module.exports = app