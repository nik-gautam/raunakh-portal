(function ($) {
	"use strict";
	$(".main-menu li").on("click", function(){
		$(".main-menu").find(".active").removeClass("active");
		$(this).addClass("active");
	 });

	 $(window).scroll(function() { 
		var Scroll = $(window).scrollTop() + 1,
					SectionOneOffset = $('#donation-container').offset().top, 
					SectionTwoOffset = $('#about-container').offset().top,
					SectionThreeOffset = $('#testimonials-container').offset().top,
					SectionFourOffset = $('#gallery-container').offset().top,
					SectionFiveOffset = $('#societies-container').offset().top,
					SectionSixOffset = $('#contact-container').offset().top;

		if (Scroll >= SectionOneOffset) { 
			$(".main-menu").find(".active").removeClass("active");
			$(".menu-item-1").addClass("active"); 
		} 
		if (Scroll >= SectionTwoOffset) { 
			$(".main-menu").find(".active").removeClass("active");
			$(".menu-item-2").addClass("active"); 
		} 
		if (Scroll >= SectionThreeOffset) { 
			$(".main-menu").find(".active").removeClass("active");
			$(".menu-item-3").addClass("active"); 			
		} 
		if (Scroll >= SectionFourOffset) { 
			$(".main-menu").find(".active").removeClass("active");
			$(".menu-item-4").addClass("active"); 			
		} 
		if (Scroll >= SectionFiveOffset) { 
			$(".main-menu").find(".active").removeClass("active");
			$(".menu-item-5").addClass("active"); 			
		}
		if (Scroll >= SectionSixOffset) { 
			$(".main-menu").find(".active").removeClass("active");
			$(".menu-item-6").addClass("active"); 			
		}
	});
	
	// meanmenu
	$('#mobile-menu').meanmenu({
		meanMenuContainer: '.mobile-menu',
		meanScreenWidth: "992"
	});

	$('.info-bar').on('click', function () {
		$('.extra-info').addClass('info-open');
	})

	$('.close-icon').on('click', function () {
		$('.extra-info').removeClass('info-open');
	})


	// sticky
	var wind = $(window);
	var sticky = $('#sticky-header');
	wind.on('scroll', function () {
		var scroll = wind.scrollTop();
		if (scroll < 100) {
			sticky.removeClass('sticky');
		} else {
			sticky.addClass('sticky');
		}
	});

	// 4. Custom BackGround 
    $("[data-background]").each(function () {
        $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
    });


	// mainSlider
	function mainSlider() {
		var BasicSlider = $('.slider-active');
		BasicSlider.on('init', function (e, slick) {
			var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
			doAnimations($firstAnimatingElements);
		});
		BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
			var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
			doAnimations($animatingElements);
		});
		BasicSlider.slick({
			autoplay: false,
			autoplaySpeed: 10000,
			dots: false,
			fade: true,
			arrows: true,
			prevArrow: '<button type="button" class="slick-prev"><i class="far fa-long-arrow-alt-left"></i></button>',
			nextArrow: '<button type="button" class="slick-next"><i class="far fa-long-arrow-alt-right"></i></button>',
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true,
					}
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: false,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: false,
					}
				}
			]
		});

		function doAnimations(elements) {
			var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			elements.each(function () {
				var $this = $(this);
				var $animationDelay = $this.data('delay');
				var $animationType = 'animated ' + $this.data('animation');
				$this.css({
					'animation-delay': $animationDelay,
					'-webkit-animation-delay': $animationDelay
				});
				$this.addClass($animationType).one(animationEndEvents, function () {
					$this.removeClass($animationType);
				});
			});
		}
	}
	mainSlider();




// testimonial - active
$('.testimonial-active').slick({
	dots: true,
	arrows: true,
	infinite: true,
	autoplay:true,
	speed: 300,
	prevArrow: '<button type="button" class="slick-prev"><i class="far fa-long-arrow-alt-left"></i></button>',
	nextArrow: '<button type="button" class="slick-next"><i class="far fa-long-arrow-alt-right"></i></button>',
	slidesToShow: 3,
	slidesToScroll: 1,
	centerMode: true,
	centerPadding: 0,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 991,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: false,
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
			}
		}
	]
});


	//COUNTER 
	$('.numb').counterUp({
		delay: 20,
		time: 1100
	});
	

	// scrollToTop
	$.scrollUp({
		scrollName: 'scrollUp', // Element ID
		topDistance: '300', // Distance from top before showing element (px)
		topSpeed: 300, // Speed back to top (ms)
		animation: 'fade', // Fade, slide, none
		animationInSpeed: 200, // Animation in speed (ms)
		animationOutSpeed: 200, // Animation out speed (ms)
		scrollText: '<i class="fas fa-level-up-alt"></i>', // Text for element
		activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
	});

	$(function(){
  
		var swiper = new Swiper('.carousel-gallery .swiper-container', {
		  effect: 'slide',
		  speed: 900,
		  slidesPerView: 3,
		  spaceBetween: 20,
		  simulateTouch: true,
		  autoplay: {
			delay: 5000,
			stopOnLastSlide: false,
			disableOnInteraction: false
		  },
		  pagination: {
			el: '.carousel-gallery .swiper-pagination',
			clickable: true
		  },
		  breakpoints: {
			// when window width is <= 320px
			320: {
			  slidesPerView: 1,
			  spaceBetween: 5
			},
			// when window width is <= 480px
			425: {
			  slidesPerView: 1,
			  spaceBetween: 10
			},
			// when window width is <= 640px
			768: {
			  slidesPerView: 1,
			  spaceBetween: 20
			}
		  }
		}); /*http://idangero.us/swiper/api/*/
	  
		
	  
	});

	// WOW active
	new WOW().init();



	})(jQuery);


function validationContact(){
	var email = document.getElementById("contact-email").value;
	var name = document.getElementById("contact-name").value;

	if (!name.match(/^[a-zA-Z]+$/)) {

		document.getElementById("error-contact").innerHTML=` <div class="newsletters-wrapper mb-30 error-contact ">
			<div class="newsletter-form newsletter-02-form">
					<p>Please enter correct name.</p>
			</div>
		</div>`;
		return false;
	
	  }

	if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {

		document.getElementById("error-contact").innerHTML=` <div class="newsletters-wrapper mb-30 error-contact ">
			<div class="newsletter-form newsletter-02-form">
					<p>Please enter a valid email address.</p>
			</div>
		</div>`;
		return false;
	
	}

	if(document.getElementById("contact-name").value.length===0 || document.getElementById("contact-email").value.length===0 || document.getElementById("contact-subject").value.length===0 ||document.getElementById("contact-message").value.length===0){
		document.getElementById("error-contact").innerHTML=` <div class="newsletters-wrapper mb-30 error-contact ">
			<div class="newsletter-form newsletter-02-form">
					<p>All fields are neccessary. Please enter all fields.</p>
			</div>
		</div>`;
		return false;	
	}
	else{
		document.getElementById("error-contact").innerHTML=``;
		return true;
	}
}


function validationDonation(){
	if(document.getElementById("donation-amount-input").value > 50000){
		document.getElementById("error-donation").innerHTML = `
			<div class="error-contact mt-2 mb-4">
						<p>You cannot donate more than Rs 50k at once.</p>																			
			</div>`;
			return false;
	}
	else if(document.getElementById("donation-amount-input").value>0){
		document.getElementById("error-donation").innerHTML = ``;
		return true;
	}
	else{
		document.getElementById("error-donation").innerHTML = `
			<div class="error-contact mt-2 mb-4">
						<p>Invalid value. Negative and Zero is not acceptable.</p>																			
			</div>`;
			return false;
	}
}
$('.carousel').carousel({
	interval: 2000
  })

  function add_value(val){
	  document.getElementById("donation-amount-input").value = val;
  }

