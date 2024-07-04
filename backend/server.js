require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

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

app.get('/api/data', (req, res) => {
    //set cache headers for API responses
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send({ message: 'Hello, world!' });
});


//Use routes
app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api/payment', paymentRoutes);

//Static Files (serve public files(images, etc))
app.use(express.static(path.join(_dirname, 'public'), {
    maxAge: '1d'
}));

//Serve build directory for production(after 'npm run build')
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(_dirname, 'build'), {
        maxAge: '1d'
    }));
    
    //serve reacts html file
    app.get('*', (req, res) => {
        res.sendFile(path.join(_dirname, 'build', 'index.html'));
    });
};  
    
//Start server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});