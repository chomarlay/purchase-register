const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/purchases', require('./routes/purchases'));
app.use('/api/attachments', require('./routes/attachments'));

// Serve static assets in production -- to deploy in Heroku
//NOTE:  this has to be after the above Define Routes
if (process.env.NODE_ENV === 'production') {
  // Set static folder -- serve client
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
