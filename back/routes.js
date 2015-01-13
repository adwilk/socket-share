module.exports = function (app, passport, auth) {
	app.get('/', auth.isAuthenticated, function(req, res) {
		if(req.session.hash){
			var hash = req.session.hash;
			req.session.hash = null;
			res.redirect('/#' + hash);
		}

		res.setHeader("X-UA-Compatible","IE=edge");
		res.render(__dirname + '/../front/dist/index.html');
	});

	app.get('/log-in', function(req, res) {
		res.setHeader("X-UA-Compatible","IE=edge");
		res.render(__dirname + '/../front/dist/log-in.html');
	});

	app.post('/log-in', function(req, res, next) {
		if(req.body.hash) req.session.hash = req.body.hash;
		next();
	}, passport.authenticate('local', {
	    successRedirect: '/',
	    failureRedirect: '/log-in'
	}));

	app.get('/log-out', function (req, res){
		req.logout();
		res.redirect('/log-in');
	});
};