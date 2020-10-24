const express = require('express');
const app = express();

const indexRouter = require('./routes/indexRouter');
const usersRouter = require('./routes/usersRouter');
const albumsRouter = require('./routes/albumsRouter');

const ejs = require('ejs');
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const expressEssion = require('express-session');
app.use(expressEssion({
    secret: "secret"
}));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photobook', {useNewUrlParser: true});

const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.use(express.static('public'));

global.loggedIn = null;
app.use("*", (req, res, next) => {
    //global.loggedIn = req.session.userId;
    res.locals.loggedIn = req.session.userId;
    next();
});


app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/", albumsRouter);

app.use((err, req, res, next) => {
    return res.render('error');
});

app.use((req,res) => res.render('404'));

app.listen(5000);