(function( factory ) {
	if (typeof(require) === 'function') {
		module.exports = factory(jQuery);
	} else {
		factory(jQuery);
	}
})(function( $ ) {
	var _this, border_width = 1, border_color = '#adadad', defaults = {}, duration = 300, selectId,
		_initUl = function(ul) {
			ul.css({
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
				unselectLi.call(null, li.siblings('li'));
			});
		},
		_init = function() {
			if (typeof _this.data('brazilian-show') === 'string') {
				defaults.show = _this.data('brazilian-show');
			}

			_initUl.call(null, _this);

			_this.children('li.brazilian-item').each(function() {
				var thisLi = $(this);
				_initLi.call(null, thisLi);
			});

			selectLi(_this.find('li.brazilian-item:first'));
		},
		selectLi = function(item) {
			selectId = item.attr('id');
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
					defaults.onItemSelect.call(null, item, content);
				}
			} else {
				showContent.call();
			}
		},
		unselectLi = function(item) {
			item.css({
				'border-bottom': item.css('height') - 1,
				'margin-bottom': 0,
				'background-color': '#EDEDED',
			});

			if (typeof defaults.onItemUnselect === 'function') {
				var content;
				if (!$('.brazilian-item-content[data-brazilian-item-id=' + item.attr('id') + ']').length) {
					content = $('<div class="brazilian-item-content" data-brazilian-item-id="' + item.attr('id') + '"></div>');
					content.hide().insertAfter(_this);
				} else {
					content = $('.brazilian-item-content[data-brazilian-item-id=' + item.attr('id') + ']');
				}
				defaults.onItemUnselect.call(null, item, content);
			} else {
				hideContent.call();
			}
		},
		showContent = function() {
			if (typeof defaults.show == 'string') {
				switch (defaults.show) {
					case 'fade':
						$('.brazilian-item-content[data-brazilian-item-id=' + selectId + ']').fadeIn(duration);
						break;
					default:
						$('.brazilian-item-content[data-brazilian-item-id=' + selectId + ']').show();
				}
			} else {
				$('.brazilian-item-content[data-brazilian-item-id=' + selectId + ']').show();
			}
		},
		hideContent = function() {
			$('.brazilian-item-content[data-brazilian-item-id!=' + selectId + ']').hide();
		}; 

		$(document).ready(function() {
			_this = $('ul.brazilian-tab');
			_init.call(null);
		});

	$.fn.braziliantabs = function(params) {
		if (typeof params === 'undefined') {
			return false;
		}
		_this = $(this);
		$.extend(defaults, params);
		_this.addClass('brazilian-tab');
		_this.children('li').addClass('brazilian-item');
		_init();

	}
});