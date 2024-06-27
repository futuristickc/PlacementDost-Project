const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Connect to MongoDB
const mongoURI = 'your_mongo_db_connection_string_here';
mongoose.connect(mongoURI, {
    useNewURIParse: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

//Basic route
app.get('/', (req, res) => {
    res.send("Hello from the backend server!");
});

//Start server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});