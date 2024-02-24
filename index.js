require('dotenv').config();
const express = require('express');
const router = require('./app/router');
const session = require('express-session');

const app = express();
app.set('view engine', 'ejs');
app.set('views','./app/views');

app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}))
app.use(session({
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false // true : pour les sites en https sinon le dépôt est impossible
  }
}));
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur on http://localhost:${PORT}`));