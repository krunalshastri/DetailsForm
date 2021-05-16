const express = require('express');
const dotEnv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.ATLAS_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.get('/', (req, res) => {
  res.send('Running!');
});

app.use('/form', require('./Routes/users'));
app.use('/form', require('./Routes/auth'));
app.use('/form', require('./Routes/students'));
app.use('/form', require('./Routes/teachers'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
