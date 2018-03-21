// Element.matches polyfill: https://developer.mozilla.org/de/docs/Web/API/Element/matches
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
}

(function($) {
	$.fn.cartoAccordion = function(options) {
		const that = this;
		const defaults = {
			/*
			 * Index of the element that should be opened on initialization.
			 * The first element has index 1.
			 * If openInitial = 0 only those elements that have an "active"
			 * class (set in HTML) in their header will be opened.
			 */
			openInitial: 1,
			/*
			 * Should accordion elements stay open when other elements are
			 * activated.
			 */
			stayOpen: false,
			/*
			 * Duration of animation - should be a string or number 
			 * determining the speed of animation. See jQuery's 
			 * documentation for more info.
			 */
			animationDuration: 'fast',
			/*
			 * Callback function for activation of an element.
			 */
			onToggle: function(header) { }
		};
		const settings = $.extend({}, defaults, options);
		
		/*
		 * Use breadth first search and stop at the first level
		 * where elements are found.
		 * 
		 * This code is used below instead of $.find to allow 
		 * for nested accordions.
		 */	
		const bfsearch = function(el, selector) {
			var result = [];
			var queue = el.children();

			while(result.length == 0 && queue.length > 0) {
				var next = [];
				queue.each(function() {
					if(this.matches(selector)) {
						result.push($(this));
					} else {
						next.push($(this).children());
					}
				});
				queue = $(next).map(function() { return this.toArray(); });
			}
			return $(result).map(function() { return this.toArray(); });
		};
	
		const init = function() {
			if(!that.hasClass('accordion')) {
				that.addClass('accordion');
			}
			
			// all accordion headers
			const headers = bfsearch(that, '.accordion-toggle');
			
			// all accordion bodies
			const bodies = bfsearch(that, '.accordion-content');

			// clean old events
			headers.off('click');
			
			headers.click(function(event) {
				const target = $(event.currentTarget);
				target.toggleClass('active');
				target.next().slideToggle(settings.animationDuration);
				
				if(!settings.stayOpen) {
					// close others
					headers.not($(this)).removeClass('active');
					bodies.not($(this).next()).slideUp(settings.animationDuration);
				}
				if(typeof(settings.onToggle) === 'function') {
					settings.onToggle(target);
				}
			});
			
			if(settings.openInitial == 0) {
				// open nothing - except those marked (in HTML) with active class
				headers.not('.active').next('.accordion-content').hide();
			} else {
				headers.removeClass('active');
				bodies.hide();
				
				headers.eq(settings.openInitial-1).trigger('click');
			}
			
		};
		init();
		
		return this;
	};
}(jQuery));
