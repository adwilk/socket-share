var router = new Router({
	join:{
		path:'join/*',
		template:'join'
	},
	create:{
		path:'create',
		template:'create'
	},
	notSupported:{
		path:'notSupported',
		template:'notSupported'
	},
	otherwise:'create'
});

if(!Object.observe){
	document.body.innerHTML = 'not supported';
} else if(!window.webkitRTCPeerConnection){
	router.go('notSupported');
} else {
	var model = new Bind();

	var peer = new Peer({
		host: '/',
		port: location.port ? location.port : 80,
		path: '/peerjs'
	});

	var connections = [];

	peer.on('open', function(id){
		router.current().template === 'create' ? create(id) : join(location.hash.slice(1));
	});

	function create(id){
		model.waiting = true;
		model.link = location.protocol + '//' + location.host + '/#/join/' + id;

		peer.on('connection', function(c) {
			document.querySelector('.share-link').classList.add('hide');
			document.querySelector('.connected').classList.remove('hide');
			handleConnection(c, function(){
				document.querySelector('.share-link').classList.remove('hide');
				document.querySelector('.connected').classList.add('hide');
			});
		});

		document.querySelector('.share-link input').addEventListener('click', function(e){
		    this.select();
		});	

		document.querySelector('[type="file"]').addEventListener('change', function(e){
			var self = this;
			connections.map(function(connection) {
				connection.send(self.files[0].name);
		    	connection.send(self.files[0]);
			});
		});
	}

	function join(id){
		peer.on('error', function() {
			document.querySelector('.disconnected').classList.remove('hide');
			document.querySelector('.connected').classList.add('hide');
		});

		handleConnection(peer.connect(router.params(0)),function(){
			document.querySelector('.disconnected').classList.remove('hide');
			document.querySelector('.connected').classList.add('hide');
		});
	}

	function handleConnection(c, close){
		c.on('data', function(data){
			if (data.constructor === ArrayBuffer) {
	        	var dataView = new Uint8Array(data);
	        	var dataBlob = new Blob([dataView]);

	        	var save = document.createElement('a');
			    save.href = window.URL.createObjectURL(dataBlob);
			    save.target = '_blank';
			    save.download = model.fileName;

			    var evt = document.createEvent('MouseEvents');
			    evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);

			    save.dispatchEvent(evt);

			    (window.URL || window.webkitURL).revokeObjectURL(save.href);
	      	} else {
	      		model.fileName = data;
	      	}
		});

		c.on('close', function(){
			connections.splice(connections.indexOf(c), 1);
			model.peers = connections.length;

			if(!connections.length){
				close();
			}
		});

		connections.push(c);
		model.peers = connections.length;
	}
}