// imports
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const expressfileupload = require("express-fileupload")
const bodyParser = require('body-parser')
const dotenv = require("dotenv").config();
const ejs = require('ejs')

// routes
const { checkUser} = require("./middleware/authMiddleware");
const laptopsRoutes = require("./routes/laptopsRoutes")
const mainRoutes = require("./routes/mainRoutes")
const userRoutes = require("./routes/userRoutes")
const allinOneRoutes = require("./routes/allinOneRoutes")
const monitorRoutes = require("./routes/monitorRoutes")
const orderRoutes = require("./routes/orderRoutes")
const productsRoutes = require("./routes/productsRoutes")

// gitHub url:  https://github.com/Iam-Hafiz/digital-products-ecommerce-website.git

// Configure server & Create server
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for post requests to accept form data from the user
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// Create directory for static ressources
app.use(express.static('public'));
app.use(cookieParser());
app.use(expressfileupload());

//register ejs view engine
app.set('view engine', 'ejs');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongo_url);
    console.log('Connexion to database successfull');
  } catch (error) {
    console.log(error);
  }
}

//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
        console.log(`Server is running at http://localhost:${PORT}`)
    })
})

// routes
app.use('*', checkUser);
app.use(mainRoutes);
app.use(laptopsRoutes);
app.use(allinOneRoutes);
app.use(monitorRoutes);
app.use(userRoutes);
app.use(orderRoutes);
app.use(productsRoutes);

app.use((req, res) => {
    res.status(404).render('main-views/html404', { title: 'Not found 404'});
});





// anothor way to Connect to database server mangodb
/*
mongoose.connect(process.env.mongo_url)
    .catch((err) => console.error(err));
mongoose.connection.on('open', () => { console.log('Connexion to database successfull'), app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});});
*/