var express = require('express');
var compress = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

module.exports = function () {
	var app = express();
	app.use(compress());
	app.engine('html', require('ejs').renderFile);
	app.use('/resources', express.static(__dirname + '/../front/dist'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
	  extended: true
	}));
	app.use(cookieParser());
	app.use(session({
		secret: '658723456872436953475843656',
		saveUninitialized: true,
		resave: true
	}));

	return app;
};