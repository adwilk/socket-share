/* router. Copyright(c) 2015 Adam Wilkinson <adwilk@mac.com> */

function Router(routes){
	var current = null;
	var view = document.querySelector('[router-view]');
	var params = null;

	for(var route in routes){
		if(routes[route].path){
			routes[route].regex = new RegExp(routes[route].path.split('*').join('(.*)'));
		}
	}

	window.addEventListener("hashchange", change);

	function change(){
		if(current === null || !matches(current)){
			for(route in routes){
				if(matches(routes[route])){
					show(routes[route])
					current = routes[route];
					return true;
				}
			}
			go(routes['otherwise']);
		}
	};

	function matches(route){
		return route.regex ? route.regex.test(location.hash.slice(2)) : false;
	}

	function show(route){
		getParams(route);
		view.innerHTML = document.querySelector('template#' + route.template).innerHTML;
	}

	function getParams(route){
		var results = route.regex.exec(location.hash.slice(2));
		results.shift();
		params = results;
	}

	function go(path){
		location.hash = '#/' + path;
	}

	this.current =  function(){
		return current;
	}

	this.params =  function(index){
		return index ? params[index] : params;
	}

	this.go = go;

	change();
	return this;
};