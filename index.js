const MoviesModel = require("./database/movies");
const UserModel = require("./database/users");
require('dotenv').config()
const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

//import mongoose module
var mongoose = require('mongoose');
//setup default mongoose connection
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("CONNECTION ESTABLISHED"));

// http://localhost:5000/
app.get("/", (req, res) => {
    return res.json({"WELCOME": `to my Backend Software for the BookMyShow company`});
});

/*
Route           /movies
Description     Get all the movies
Access          Public
Parameter       None
Methods         Get
*/
// http:localhost:5000/movies
app.get("/movies", async (req, res) => {
    const getAllMovies = await MoviesModel.find();
    return res.json(getAllMovies);
});

/*
Route           /movies/:id
Description     Get a single movies
Access          Public
Parameter       None
Methods         Get
*/
// http:localhost:5000/movie/:id
app.get("/movie/:id", async (req, res) => {
    const {id} = req.params;
    const getMovie = await MoviesModel.findOne({_id: id});
    return res.json(getMovie);
});

/*
Route           /user-register
Description     post single user details in user collection
Access          Public
Parameter       None
Methods         post
*/
// http://localhost:5000/user-register
app.post("/user-register", async (req, res) => {
    const addNewUser = await UserModel.create(req.body);
    return res.json( {userAdded: addNewUser, message: "User was added !!!"} );
});

app.listen(5000, () => {
    console.log("MY EXPRESS APP IS RUNNING.....")
});