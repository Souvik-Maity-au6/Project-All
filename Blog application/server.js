var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var methodOverride = require('method-override');
var hbs = require('hbs');
var path = require('path');
require('./utils/hbs');
require('./db')

var userApiRoutes = require('./routes/apiRoutes/userRoutes');
var userNormalRoutes = require('./routes/normalRoutes/userRoutes');
var blogApiRoutes = require('./routes/apiRoutes/blogRoutes');
var blogNormalRoutes = require('./routes/normalRoutes/blogRoutes');

var app = express();

app.set('view engine', 'hbs');
app.set('view options', { layout: 'main' });


hbs.registerPartials(path.join(__dirname, 'views', 'partials'));


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    name: "Ecomerce-Session",
    secret: "Qwgbswgdhg%$&gdyagdv3454",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 30,
        secure: false
    }
}))
app.use(userApiRoutes);
app.use(userNormalRoutes);
app.use(blogApiRoutes);
app.use(blogNormalRoutes);


app.get('/', function(req, res){
    res.render('index', {
        title: 'Welcome ::',
        body_title: 'Welcome to the Professor Gadget blog site',
        body_para: 'Here you can write your own blog and share',
        userId: req.session.userId
    })
});













app.listen(4200, function(){
    console.log('server running on 4200')
})