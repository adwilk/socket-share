var passport = require('passport');
var auth = require("./auth");
var app = require('./express')();
var server = require('http').createServer(app);
var activeProfile = require('./profiles').active();

/**
* Configure Express
**/
app.use(passport.initialize());
app.use(passport.session());
auth.init(passport);

/**
* Configure PeerJS
**/
var ExpressPeerServer = require('peer').ExpressPeerServer;
app.use('/peerjs', ExpressPeerServer(server));

/**
* Start Express
**/
server.listen(activeProfile.express.port, activeProfile.express.ip, function() {
	console.log('%s: Node server started on %s:%d ...', Date(Date.now()), activeProfile.express.ip, activeProfile.express.port);
});

auth.init(passport);
require("./routes")(app, passport, auth, activeProfile.express.ip === '0.0.0.0');