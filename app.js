var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

// Passport Config
require('./config/passport1')(passport);
//EJS and APP Config
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
mongoose.connect('mongodb+srv://akshith123:akshith123@cluster0.d6v8q.mongodb.net/banker_algo_test1', {
	useFindAndModify: false,
	useNewUrlParser: true,
	useUnifiedTopology: true
});


// Express session
app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});


//routes
app.get('/', (req, resp) => {
	resp.render('welcome');
});
app.use('/', require('./routes/admin'));
app.use('/', require('./routes/customer'));
app.use('/', require('./routes/worker'));
app.use('/', require('./routes/Client_Index.js'));
app.use('/Client', require('./routes/Client_Auth.js'));
let port = process.env.PORT;
if (port == null || port == '') {
	port = 8000;
}
app.listen(port, console.log(`Server started on port ${port}`));
