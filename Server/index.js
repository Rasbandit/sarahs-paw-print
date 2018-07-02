const express = require('express'),
  session = require('express-session'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  massive = require('massive'),
  nodemailer = require('nodemailer'),
  multer = require('multer'),
  upload = multer(),
  dotenv = require('dotenv'),
  port = 3000;

dotenv.load();

const app = (module.exports = express());

// database connection
const connectionStrings = process.env.MASSIVE_URI;
var db = massive.connectSync({
  connectionString: connectionStrings,
});
app.set('db', db);
var db = app.get('db');

// Passport middleware
const isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send();
  return next();
};

const imgCtrl = require('./controllers/imageController');
const mailCtrl = require('./controllers/emailCtrl');
const awsCtrl = require('./controllers/awsCtrl');
const passport = require('./controllers/passport');
const userCtrl = require('./controllers/userCtrl');

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}./../dist`));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// auth
app.post(
  '/api/login',
  passport.authenticate('local', {
    successRedirect: '/me',
  })
);
app.get('/api/logout', (req, res, next) => {
  req.logout();
  return res.status(200).send('logged out');
});

//= ==USER ENDPOINTS=========================
// app.post('/api/register', userCtrl.register);
app.get('/me', isAuthed, userCtrl.me);

// getting pictures
app.get('/api/getPortraits', imgCtrl.getPortraits);
app.get('/api/getOthers', imgCtrl.getOthers);

// Email Endpoint

// s3 endpoints
app.post('/api/upload', upload.single('attachment'), awsCtrl.upload);

app.listen(port, () => {
  console.log(`Ship docked at port ${port}`);
});
