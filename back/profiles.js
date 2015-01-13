module.exports = {
	active: function(){
		return (typeof process.env.OPENSHIFT_NODEJS_IP === "undefined") ? module.exports.local : module.exports.isandbox;
	},
	local: {
		express: {
			ip: '0.0.0.0',
			port: '8080'
		}
	},
	isandbox: {
		express: {
			ip: process.env.OPENSHIFT_NODEJS_IP,
			port: process.env.OPENSHIFT_NODEJS_PORT
		}
	}
};