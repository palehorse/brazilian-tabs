(function( factory ) {
	if (typeof(require) === 'function') {
		module.exports = factory(jQuery);
	} else {
		factory(jQuery);
	}
})(function( $ ) {
	var _this, border_width = 1, border_color = '#adadad', defaults = {}, duration = 300,
		_initUl = function(ul) {
			ul.filter('ul.brazilian-tab').css({
				'list-style': 'none', 
				'display': 'flex',
				'padding': 0,
				'border-bottom': 'solid ' + border_width + 'px ' + border_color,
				'background-color': $('body').css('background-color'),
			});
		},
		_initLiCSS = function(li) {
			li.css({
				'background-color': '#EDEDED',
				'padding': '0.5rem 1rem',
				'border-style': 'solid',
				'border-width': border_width,
				'border-color': border_color,
				'border-top-left-radius': 4,
				'border-top-right-radius': 4,
				'border-bottom': 'none',
				'margin-right': '0.6rem',
			});
		},
		_initLi = function(li) {
			_initLiCSS.call(null, li);

			li.find('a').on('click', function(e) {
				e.preventDefault();
			});

			li.on('click', function(e) {
				var item = $(this);
				e.preventDefault();
				e.stopPropagation();
				selectLi.call(null, item);
				li.siblings('li').each(function() {
					unselectLi.call(null, $(this));
				});
			});
		},
		_init = function(ul) {
			if (typeof ul.data('brazilian-show') === 'string') {
				defaults.show = ul.data('brazilian-show');
			}

			_initUl.call(null, ul);

			ul.children('li.brazilian-item').each(function() {
				var thisLi = $(this);
				_initLi.call(null, thisLi);
			});

			selectLi(ul.find('li.brazilian-item:first'));
			ul.show();
		},
		selectLi = function(item) {
			item.css({
				'height': item.css('height') + 1,
				'margin-bottom': -border_width,
				'background-color': 'inherit',
			});

			if (typeof defaults.onItemSelect === 'function') {
				var content;
				if (typeof item.attr('id') === 'string') {
					if (!$('.brazilian-item-content[data-brazilian-item-id=' + item.attr('id') + ']').length) {
						content = $('<div class="brazilian-item-content" data-brazilian-item-id="' + item.attr('id') + '"></div>');
						content.hide().insertAfter(_this);
					} else {
						content = $('.brazilian-item-content[data-brazilian-item-id=' + item.attr('id') + ']');
					}
				}
				defaults.onItemSelect.call(null, item, content);
			} else {
				showContent.call(null, item.attr('id'));
			}
		},
		unselectLi = function(item) {
			item.css({
				'border-bottom': item.css('height') - 1,
				'margin-bottom': 0,
				'background-color': '#EDEDED',
			});

			if (typeof defaults.onItemUnselect === 'function') {
				var content = $('.brazilian-item-content[data-brazilian-item-id=' + item.attr('id') + ']');
				defaults.onItemUnselect.call(null, item, content);
			} else {
				hideContent.call(null, item.attr('id'));
			}
		},
		showContent = function(id) {
			if (typeof defaults.show == 'string') {
				switch (defaults.show) {
					case 'fade':
						$('.brazilian-item-content[data-brazilian-item-id=' + id + ']').fadeIn(duration);
						break;
					default:
						$('.brazilian-item-content[data-brazilian-item-id=' + id + ']').show();
				}
			} else {
				$('.brazilian-item-content[data-brazilian-item-id=' + id + ']').show();
			}
		},
		hideContent = function(id) {
			$('.brazilian-item-content[data-brazilian-item-id=' + id + ']').hide();
		}; 

		$(document).ready(function() {
			if ($('ul.brazilian-tab').length) {
				_this = $('ul.brazilian-tab');
				_init.call(null, _this);
			}
		});

	$.fn.braziliantabs = function(params) {
		if (typeof params === 'undefined') {
			params = {};
		}
		_this = $(this);
		var items = _this.children('li');
		$.extend(defaults, params);

		if ($(this).hasClass('brazilian-tab')) {
			return false;
		}

		_this.addClass('brazilian-tab');
		items.each(function() {
			$(this).addClass('brazilian-item');
			if (typeof $(this).attr('id') === 'string') {
				if (typeof defaults.contents === 'object' 
				 && defaults.contents[$(this).attr('id')] !== 'undefined') {
					$(defaults.contents[$(this).attr('id')]).addClass('brazilian-item-content')
					$(defaults.contents[$(this).attr('id')]).attr('data-brazilian-item-id', $(this).attr('id'));
				}
			}
		});
		_init.call(null, _this);
	}
});