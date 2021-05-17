const EXPRESS = require("express");
const APP = EXPRESS();
const PORT = 8080;
let times = 0;

let bodyParser = require("body-parser");
let session = require("express-session");
APP.use(bodyParser.urlencoded({ extended: true }));

APP.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 600000 },
	})
);

// for image/js/css
APP.use(EXPRESS.static(__dirname + "/static"));
// This sets the location where express will look for the ejs views
APP.set("views", __dirname + "/views");
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
APP.set("view engine", "ejs");
// use app.get method and pass it the base route '/' and a callback

APP.get("/", (req, res) => {
	if (req.session.addTwo) {
		req.session.times = times + 2;
	} else if (req.session.reset) {
		req.session.times = 0;
	} else {
		req.session.times = times + 1;
	}

	// return to false
	req.session.addTwo = false;
	req.session.reset = false;

	console.log(req.session.times);
	times = req.session.times;
	res.render("index", { times: times });
});

APP.post("/add", (req, res) => {
	// res.send(`sdsd`);
	req.session.addTwo = true;
	res.redirect("/");
});

APP.post("/reset", (req, res) => {
	// res.send(`sdsd`);
	req.session.reset = true;
	res.redirect("/");
});

APP.listen(PORT, (req, res) => {
	console.log(`Server is listening to ${PORT}`);
});
