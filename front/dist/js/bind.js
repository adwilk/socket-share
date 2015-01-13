/* bind. Copyright(c) 2015 Adam Wilkinson <adwilk@mac.com> */

function Bind(model){
	model = typeof model === 'undefined' ? {} : model;

	var twoWay = function(elem, key){
		elem.addEventListener("input", function() {
			model[key] = this.value;
		});
	}

	for(key in model){
		var elem = document.querySelector('[bind="' + key + '"]');
		elem.innerHTML = model[key];
		twoWay(elem, key);
	}

	Object.observe(model, function(changes){
	    changes.forEach(function(change) {
	    	[].forEach.call(document.querySelectorAll('[bind="' + change.name + '"]'), function(elem) {
		        if(typeof elem.value !== 'undefined'){
		        	elem.value = model[change.name];
		        	if(change.type === 'add'){
			        	twoWay(elem, change.name);
			        }
		        } else {
		        	elem.innerHTML = model[change.name];
		        }
		    });
	    });
	});

	return model;
};