(function ($) {
    "use strict";
    $(document).ready(function () {
    /*Responsive menu for small screens*/
        $('.menu-btn').on('click', function (e) {
            $('.menu--main .menu').toggleClass('is-active');
            e.preventDefault();
        });
        /*Search Button in header*/
        $('.btn--search').on('click', function (e) {
            $('.search--header').toggleClass('is-active');
            $('.site-header').toggleClass('has-search');
            e.preventDefault();
        });
        // User Dropdown
        $('.menu--user').on('click', function (e) {
        	$(this).toggleClass('is-active');
        	$('.dropdown--user').toggleClass('is-active');
            e.preventDefault();
            if($(this).hasClass('is-active')) {
            	$('<div id="dropdownclose"></div>').appendTo('body').css({
                    height: '100vh',
                    width: '100vw',
                    position: 'absolute',
                    top: '55px',
                    left: '0',
                    background: 'transparent',
                    cursor: 'pointer'
            	}).on('click', function(e) {
                    $('.menu--user').removeClass('is-active');
                    $('.dropdown--user').removeClass('is-active');
                    $(this).remove();
            	});
            } else {
                $('#dropdownclose').remove();
            }
        });
        /*Floatlabels! (with IE9 compatability; it can't handle pure CSS)*/
        $('.floatlabels input, .floatlabels textarea').not('[type="radio"]').on('change', function () {
            var thiselement = $(this);
            if (thiselement.val() !== '') {
                thiselement.addClass('valid');
            } else {
                thiselement.removeClass('valid');
            }
        });
        /* Required field validation fallback
        $('form').submit(function(e) {
            var ref = $(this).find('[required]').not('[disabled]');
            $(ref).each(function(){
                    if ( $(this).val() == '' )
                    {
                            $(this).css({
                                'border-color' : '#a6192e',
                                'border-width' : '2px'
                            });
                            alert("Please fill out required fields.");
                            $(this).focus();
                            e.preventDefault();
                            return false;
                    }
                });  return true;
        });
        */
        /* Number input validation fallback
        $('form').submit(function(e) {
            var ref = $(this).find('[type="number"]').not('[disabled]');
            $(ref).each(function() {
                var min = Number($(this).attr('min'));
                var max = Number($(this).attr('max'));
                var inputvalue = Number($(this).val());
                if (inputvalue < min && min > 0) {
                    $(this).css({
                        'border-color' : '#a6192e',
                        'border-width' : '2px'
                    });
                    alert('This value must be at least ' + min + '.');
                    $(this).focus();
                    e.preventDefault();
                    return false;
                }
                if (inputvalue > max && max > 0) {
                    $(this).css({
                        'border-color' : '#a6192e',
                        'border-width' : '2px'
                    });
                    alert('This value can’t be over ' + max + '.');
                    $(this).focus();
                    e.preventDefault();
                    return false;
                }
            }); return true;
        });
        */

        // Masonry flowing grid layout
        var grid = $('.cell--grid').imagesLoaded(function () {
            grid.masonry({
                itemSelector: '.brick',
                percentPosition: true,
                columnWidth: '.grid-sizer'
            });
        });
        /*svg4everybody*/
        svg4everybody();
        /*Replace the Blur CSS Filter with a js/Canvas solution for IE 10+, Test for IE 10, 11+*/
        if (navigator.userAgent.match(/\bEdge\/(12)|(13)\b|\bTrident\/[567]\b/) && $('#hero-blur').length > 0) {
        /*Load the StackBlur script*/
            $.getScript('/tpl/wycliffeOrg/assets/javascript/stackblur.js', function () {
                var canvas, canvasHeight;
                canvas = $('<canvas id="hero-canvas" class="img--hero has-blur"></canvas>').prependTo('.header.has-image');
                stackBlurImage('hero-blur', 'hero-canvas', 35, false); // run the blur
                $('#hero-blur').css('display', 'none'); // hide the original
                if (navigator.userAgent.match(/MSIE.(9|10)\./)) {
                    canvasHeight = '120%'; // IE 9
                } else {
                    canvasHeight = 'auto'; // IE 11+
                }
                /*canvasHeight: 'auto';*/
                canvas.css({'width': '120%', 'height': canvasHeight }); // size the canvas properly
            });
        }
		// Fullscreen Responsive Video Player
		function videoSize() {
			// Grab the video player
			var videoPlayer = $('.player--100 .video-container');
			// If the video height is different than the window height
			if (videoPlayer.innerHeight() !== $(window).innerHeight()) {
				// Make the video width a 16:9 aspect ratio to the height
				videoPlayer.css('width', ($(window).innerHeight()/0.5625));
				// Make the video height the window height
				videoPlayer.css('padding-bottom', $(window).innerHeight());
				// If the video width is greater than the window width
			} else if (videoPlayer.innerWidth() > $(window).innerWidth()) {
				// Make the video width the window width
				videoPlayer.css('width', $(window).innerWidth());
				// Make the video height a 16:9 aspect ratio to the width
				videoPlayer.css('padding-bottom', ($(window).innerWidth()*0.5625));
			}
		}
        /*Expanding Video Player*/
        $('.btn--player').click(function () {
            var videoid, videoOffset;
            videoid = $(this).attr('id').substr($(this).attr('id').indexOf('video-') + 6);
            videoOffset = $('#video-' + videoid).offset().top - 25;
            $('#video-' + videoid).addClass('is-active').addClass('well');
            $('.has-player').addClass('is-active');
            $('html, body').animate({scrollTop: videoOffset}, 1000);
            $(this).addClass('is-transparent');
            $('#close-' + videoid).click(function () {
                $('#video-' + videoid).addClass('is-transparent');
								setTimeout(function() {
									$('#video-' + videoid).removeClass('is-active').removeClass('well');
									$('.has-player').removeClass('is-active');
									$('.btn--player').removeClass('is-transparent');
								}, 100);
                var framesrc = $('#video-' + videoid + ' iframe').attr('src');
                setTimeout(function() {
									$('#video-' + videoid + ' iframe').attr('src', framesrc);
									$('#video-' + videoid).removeClass('is-transparent');
								}, 1000);
            });
			window.setTimeout(function() {
				// Size the video to the window
				videoSize();
				// If the window is resized, resize the video
				$(window).on('resize', function() {
					videoSize();
				});
			}, 100);
        });
		
		/* Smooth Scrolling Code **
		** Source: https://css-tricks.com/snippets/jquery/smooth-scrolling/ */
		// Select all links with hashes
		$('a[href*="#"]')
		  // Remove links that don't actually link to anything
		  .not('[href="#"]')
		  .not('[href="#0"]')
			.not('.link--jump')
		  .click(function(event) {
			// On-page links
			if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			  // Figure out element to scroll to
			  var target = $(this.hash);
			  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			  // Does a scroll target exist?
			  if (target.length) {
				// Only prevent default if animation is actually gonna happen
				event.preventDefault();
				// Scroll to the top of the element minus 56 pixels to allow for the menu.
			  $('html, body').animate({
				  scrollTop: (target.offset().top - 55)
				}, 1000, function() {
				  // Callback after animation
				  // Must change focus!
				  var $target = $(target);
				  $target.focus();
				  if ($target.is(":focus")) { // Checking if the target was focused
					return false;
				  } else {
					$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
					$target.focus(); // Set focus again
				  };
				});
			  }
			}
		  });
		
		/* Submenu Active Section Scroll Tracking **
		** Inspired by http://stackoverflow.com/a/25153977 */
		// Find the sections and save them for later
		var sections = $('.cell[id]');
		// Find the sticky menu and save it for later
		var stickyMenu = $('.menu');
		// When the window scrolls...
		$(window).scroll(function() {
			// ...grab the current position, plus some room for the menu
			var currentPosition = $(this).scrollTop() + 56;
			// Take the "active" classes off the links and their containers
			stickyMenu.find('a').removeClass('active');
			stickyMenu.find('li').removeClass('active');
			
			// For each of the sections...
			sections.each(function() {
				// ...find the top and bottom, with some breathing room, and save them for later
				var top = $(this).offset().top,
					bottom = top + $(this).height() + 100;
				
				// If the current position is between the top and bottom of the section...
				if (currentPosition >= top && currentPosition <= bottom) {
					// ...grab the menu link for that item...
					var link = $('a[href="#' + this.id + '"]');
					// ...and make it and its container "active"
					link.addClass('active');
					link.parent().addClass('active');
				}
			});
		});
        /* Expanding Article View */
        $('.has-expand .read-more').on('click', function() {
            $(this).parents('.has-expand').addClass('is-active');
        });
        /* Accordion View */
        $('.accordion .btn--bare').on('click', function() {
            $(this).parents('.accordion').toggleClass('is-active');
            $(this).siblings('.body').attr('aria-hidden', function(index, attr) {
                return attr === 'true' ? 'false' : 'true';
            });
            $(this).css('outline', '0');
        });
        /* Progress Bar Loading Animation */
        $('.progress-meter--fallback--value').each(function() {
            var thiselement = $(this);
            var fullwidth = thiselement.attr('style');
            thiselement.attr('style', fullwidth + ' visibility:hidden;');
            setTimeout(function() {
                thiselement.attr('style', 'width:0; visibility:hidden;');
            }, 100);
            setTimeout(function() {
                thiselement.attr('style', 'width:0; visibility:visible;');
            }, 400);
            setTimeout(function() {
                thiselement.attr('style', fullwidth);
            }, 700);
        });

        /* Fund Selection */
        $('#fund-selection').on('change', function(e) {
            var fundType = $(this).find(":selected").attr('data-type');

            if ($('#lea').hasClass('is-hidden') === false) {
                $('#lea').addClass('is-hidden');
            }

            if (fundType === 'lea') {
                $('#lea').removeClass('is-hidden');
                $('#ministry-budget').addClass('is-hidden');
            } else {
                $('#lea').addClass('is-hidden');
                $('#ministry-budget').removeClass('is-hidden');
            }
        });
        /* Give Grid */
        // Focus the "other amount" number field when the button is clicked, name it "amount"
        // and remove the name from the others for submission, add max and min values to the number field
        $('.givegrid .btn--other').on('click', function() {
            // Timeout because Chrome is too fast
            setTimeout(function() {
                $('.givegrid .input--other input[type="number"]').focus();
            }, 100);
        });
        $('.givegrid .input--other').on('click', function() {
            $('.btn--other').trigger('click');
            $('.input--other input[type="number"]').attr('name', 'amount').attr('min', '5').attr('max', '100000').trigger('focus');
            $('.givegrid input[type="radio"]').attr('name', 'radio');
        });
        // Name the radio amount inputs "amount" when clicked, and remove the name from
        // "other" for submission, remove max and min values from the number field for validation
        $('.givegrid input[type="radio"] + label').not('.btn--other').on('click', function() {
            var thiselement = $(this);
            $('.givegrid input[type="radio"]').attr('name', 'amount');
            $('.input--other input[type="hidden"]').attr('name', 'other-amount').attr('min', '').attr('max', '');
            $('.input--other input[type="number"]').attr('name', 'other').attr('min', '').attr('max', '');
        });
        // Update the give button and quantity of books the gift will provide when the radio buttons are selected
        $('.givegrid input[type="radio"]').on('change', function() {
            $('.givegrid input[type="submit"]').val('Give $' + $(this).val());
            $('.quantity--book strong').html(($(this).val() / 7.50));
            if (Math.floor(($(this).val() / 7.50)) <= 1) {
                $('.name--book').html('Didinga New&nbsp;Testament');
            } else {
                $('.name--book').html('Didinga New&nbsp;Testaments');
            }
        });
        // Update the give button and quantity of books the gift will provide when an other amoount is entered
        $('.givegrid input[type="number"]').on('focus keyup', function() {
            $('.givegrid input[type="submit"]').val('Give $' + $(this).val());
            $('.quantity--book strong').html(Math.floor(($(this).val() / 7.50)));
            if (Math.floor(($(this).val() / 7.50)) <= 1) {
                $('.name--book').html('Didinga New&nbsp;Testament');
            } else {
                $('.name--book').html('Didinga New&nbsp;Testaments');
            }
            // Handle small amounts
            if (Math.floor(($(this).val() / 7.50)) < 1) {
                $('.quantity--book strong').html('nearly 1');
            }
        });
        // Handle the quantity input
        $('.input--quantity').on('focus keyup', function() {
            $(this).attr('name', 'quantity').attr('min', '1').attr('max', '13333');
            $('.input--quantity--amount').attr('name', 'amount').val(($(this).val() * 7.50));
            $('.btn--other .text--smaller').html('$' + ($(this).val() * 7.50).toFixed(2));
            $('.givegrid input[type="submit"]').val('Give $' + ($(this).val() * 7.50).toFixed(2));
            if ($(this).val() !== '') {
                $('.btn--other .text--smaller').removeClass('is-transparent');
            } else {
                $('.btn--other .text--smaller').addClass('is-transparent');
            }
        });
    /* END of Custom Functions */
    });
})(jQuery);
