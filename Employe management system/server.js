const express = require("express");
const hbs = require("hbs");
const methodOverride = require("method-override");
const session = require("express-session");
const dotenv = require("dotenv")
dotenv.config()
require("./db");


// Init
const app = express();

// Setting HBS as template engine
app.set("view engine", "hbs");
app.set("views", "views/pages");
app.set("view options", { layout: "layout" });
app.use(express.static('statics'));

// Registering hbs partials
hbs.registerPartials("./views/partials");

// Having user form body parsed
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// Adding custom request type override query key name
app.use(methodOverride("_method"));

// Adding the session capabilities
app.use(
  session({
    secret: "monthly-test-5",
    resave: false,
    name: "monthly-test-5",
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    }
  })
);


app.get("/", function (req, res) {
  res.render("index")
});

app.use(require("./routes/getRoutes"));
app.use(require("./routes/postRoutes"));
app.use(require("./routes/deleteRoutes"));
app.use(require("./routes/updateRoutes"));

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`server started at PORT ${PORT}`));

