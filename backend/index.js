const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use('/api/languages', require('./routes/languageRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/types', require('./routes/typesRoutes'));
app.use('/api/mvmts&chaps', require('./routes/mvmts&chapsRoutes'));
// app.use('/api/books', require(''))

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
