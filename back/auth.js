var crypto = require('crypto');
var LocalStrategy = require('passport-local').Strategy;
var users = require('./users');

var salt = new Buffer('fbhjag34yit38a9gfg834fg83fgf34', 'hex');
var iterations = 1000;

module.exports = {
	init: function (passport) {
		passport.use(new LocalStrategy(function (username, password, done) {
			var user = users.filter(function(item) {
			    return item.username == username;
			});
		    
		    hash(password, function(hashed){
		    	if(user[0] === null || user[0].username != username || user[0].password != hashed) {
					return done(null, false);
				}
				return done(null, user);
		    });			
		}));

		passport.serializeUser(function (user, done) {
			done(null, user);
		});
		 
		passport.deserializeUser(function (user, done) {
			done(null, user);
		});
	},
	isAuthenticated: function (req, res, next) {
		if (req.isAuthenticated()){
			return next();
		}
		res.redirect('/log-in');
	}
};

var hash = function(password, callback) {
	crypto.pbkdf2(password, salt, iterations, 64, function(err, key) {
		if(err){
			return callback(false);
		}
		callback(key.toString('hex'));
	});
};