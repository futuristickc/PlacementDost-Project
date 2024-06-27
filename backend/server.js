require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
// mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
console.log('MONGO_URI:', mongoURI);

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('Mongo connection error:', err.message);
        process.exit(1); // Exit the process with an error code
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

//Use routes
app.use('/api', productRoutes);