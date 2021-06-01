require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');

const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;

const fileUpload = require('express-fileupload');

const corsOptions = {
  origin: true,
  credentials: true,
  methods: 'GET,PUT,POST,OPTIONS',
  allowedHeaders: 'Content-Type,token',
  allowedHeaders: 'Content-Type,Authorization',
};
const app = express();
app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use(cookieParser());

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With,content-type'
//   );
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });
app.use(express.json());

// app.use(cors({ origin: true, credentials: true }));
app.use(fileUpload({ useTempFiles: true }));

// Routes
app.use('/member', require('./routes/memberRouter'));
app.use('/api', require('./routes/employeeRouter'));
app.use('/api', require('./routes/upload'));

// Connect to mongoDB
const URI = process.env.MONGODB_URL;

mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('connected to MongoDB');
  }
);

app.get('/', (req, res) => {
  res.json({ msg: 'hey sean' });
});

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
