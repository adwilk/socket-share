var drawLines = function(selector){
	$(selector + ' path').each(function(){
		this.style.transition = this.style.WebkitTransition = 'none';
		this.style.strokeDasharray = this.getTotalLength() + ' ' + this.getTotalLength();
		this.style.strokeDashoffset = this.getTotalLength();
		this.getBoundingClientRect();
		this.style.transition = this.style.WebkitTransition = 'stroke-dashoffset 2s ease-in-out';
		this.style.strokeDashoffset = '0';
	});
};