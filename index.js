const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const Schema = mongoose.Schema;
const studentSchema = new Schema({
  myName: { type: String, unique: true, required: true },
  mySID: { type: String, required: true }
});

// Create a Model object
const User = mongoose.model("s24student", studentSchema);

const router = express.Router();


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
  
  const uri = req.body.myuri;

  // connect to the database and log the connection
  mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

  // add the data to the database
  const myName = "Raymond Lei";
  const mySID = "300369438";

  const newUser = new User({
    myName,
    mySID
})

newUser
    .save()
    .then(console.log(mySID + " added"))


  
  // send a response to the user
  res.send(`<h1>Document  Added</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
