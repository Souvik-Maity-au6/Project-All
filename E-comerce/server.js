var express = require('express');
var session = require('express-session');
var methodOverride = require('method-override');
var hbs = require('hbs');
var path = require('path');
require('./utils/hbs');
var dotenv = require('dotenv');
dotenv.config();
require('./db')
var PORT = process.env.PORT || 4200
var userApiRoutes = require('./routes/apiRoutes/userRoutes');
var userNormalRoutes = require('./routes/normalRoutes/userRoutes');
var productNormalRoutes = require('./routes/normalRoutes/productNormalRoutes');
var productApiRoutes = require('./routes/apiRoutes/productRoutes')

var app = express();

app.set('view engine', 'hbs');
app.set('view options', { layout: 'main' });


hbs.registerPartials(path.join(__dirname, 'views', 'partials'));



app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    name: "product-Session",
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
app.use(productNormalRoutes);
app.use(productApiRoutes)


app.get('/', function(req, res){
    res.render('index', {
        title: 'Welcome ::',
        body_title: 'Welcome to Footway',
        body_para: 'Life is short, your heels shouldn’t be!- One shoe can change your life.',
    })
});












app.listen(PORT, function(){
    console.log('server running on 4200')
})