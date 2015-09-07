function slider() {
	var h = $(window).height();
	if ( h < 860 ) {
		h = 860;
	}
	if ( h > 1100 ) {
		h = 1100;
	}
	$('.slider > div .container').empty();
	$('.slider > div .prev, .slider > div .next, .slider > div .pagination').remove();
	$('.slider > div .container').html($('.slider .temp').html());
	$('.slider > div').slides({
		generatePagination: true,
		generateNextPrev: true,
		container: 'container',
		effect: 'slide',
		slideSpeed: 500,
		slideEasing: 'easeInOutQuad',
		play: 15000,
		pause: 0,
	});
	$('.slider > div, .slider > div .container, .slider > div .container > div > div, .slider > div .container > div > div').width($('.wrapper').width());
	$('.slider, .slider > div, .slider > div .container, .slider > div .container > div > div').css({
		'height': h+'px'
	});
	$('.slider > div .container > div img').each(function() {
		$(this).css({
			'max-width': $(this).attr('width')+'px',
			'margin-top': -$(this).attr('height')/2+'px'
		});
	});
}
$(document).ready(function() {
	if ( $('.slider').length > 0 ) {
		slider();
		$('.slider > div').bind('swipeleft', function() {
			$('.slider > div .next').trigger('click');
		});
		$('.slider > div').bind('swiperight', function() {
			$('.slider > div .prev').trigger('click');
		});
		$('.slider area').bind('click', function(event) {
			$('html, body').stop().animate({
				scrollTop: $('[data-id="'+$(this).attr('href')+'"]').offset().top-84+'px'
			}, 1000, 'easeInOutQuad');
			$('[data-id="'+$(this).attr('href')+'"]').find('.picture').removeClass('tada').addClass('tada');
			event.preventDefault();
		});
	}
	$('header ul li a').bind('click', function(event) {
		$('html, body').stop().animate({
			scrollTop: $('[data-id="'+$(this).attr('href')+'"]').offset().top-84+'px'
		}, 1000, 'easeInOutQuad');
		event.preventDefault();
	});
	var fixHeader = false;
	$(window).bind('scroll', function() {
		if ( $(document).scrollTop() > 0 ) {
			if ( !fixHeader ) {
				$('header').addClass('fixed');
				fixHeader = true;
			}
		}
		else {
			$('header').removeClass('fixed');
			fixHeader = false;
		}
		$('section').each(function() {
			var firstScroll = true;
			if ( $(document).scrollTop() > $(this).offset().top-84-$(this).outerHeight()/2 && firstScroll ) {
				$(this).find('.picture').addClass('tada');
				firstScroll = false;
			}
		});
		$('[data-id]').each(function() {
			if ( $(window).scrollTop() >= $(this).offset().top-84 ) {
				$('header ul li a[href="'+$(this).attr('data-id')+'"]').parent().addClass('active').siblings().removeClass('active');
			}
			if ( $(window).scrollTop() >= $('.wrapper').height()-$(window).height() ) {
				$('header ul li a[href="7"]').parent().addClass('active').siblings().removeClass('active');
			}
			if ( $(window).scrollTop() < $('.slider').height()-84 ) {
				$('header ul li').removeClass('active');
			}
		});
	});
	$('header img').parent('a').bind('click', function(event) {
		$('html, body').stop().animate({
			scrollTop: 0
		}, 1000);
		event.preventDefaut();
	});
	$('.color li span').each(function() {
		$(this).css({
			'background': $(this).attr('data-hex')
		});
	});
	$('.color li').bind('click', function(event) {
		var t = $(this).attr('data-color');
		$(this).parents('section').find('.picture img[data-phone="'+t+'"]').addClass('active').siblings().removeClass();
		$(this).addClass('active').siblings().removeClass();
		event.preventDefault();
	});
	$('.color li:first-child').trigger('click');
	$('.model li').bind('click', function(event) {
		$(this).addClass('active').siblings().removeClass();
		event.preventDefault();
	});
	$('.model li:first-child').trigger('click');
});
$(window).resize(function() {
	if ( $('.slider').length > 0 ) {
		slider();
	}
});