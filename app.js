/**	
	
	Main JS
	
	
**/

jQuery(function ($) {


	/* 1. SCROLLSPY */

	$("#navbar ul li a[href^='#']").on('click', function (e) {

		// prevent default anchor click behavior
		e.preventDefault();

		// store hash
		var hash = this.hash;

		// animate
		$('html, body').animate({
			scrollTop: $(hash).offset().top
		}, 1000, function () {

			// when done, add hash to url
			// (default click behaviour)
			window.location.hash = hash;
		});

	});


	/* 2. HOVER DROP-DOWN */

	// for hover dropdown menu
	$('ul.nav li.dropdown').on('mouseenter', function () {
		$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
	}).on('mouseleave', function () {
		$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
	});




	/* 3. MAIN SLIDER (SLICK SLIDER) */

	jQuery('.main-slider').slick({
		dots: false,
		infinite: true,
		speed: 500,
		autoplay: true,
		accessibility: false,
		fade: true,
		cssEase: 'linear'
	});





	/* 4. SCROLL TOP BUTTON */

	//Check to see if the window is top if not then display button

	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 300) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});

	//Click event to scroll to top

	$('.scrollToTop').on('click', function () {
		$('html, body').animate({
			scrollTop: 0
		}, 800);
		return false;
	});


	/* 5. PRELOADER */

	$(function () { // makes sure the whole site is loaded
		$('#status').fadeOut(); // will first fade out the loading animation
		$('#preloader').delay(100).fadeOut('slow'); // will fade out the white DIV that covers the website.
		$('body').delay(100).css({
			'overflow': 'visible'
		});
	})



	/* 6. WOW ANIMATION */

	wow = new WOW({
		animateClass: 'animated',
		offset: 100,
		live: true,

	});
	wow.init();

});

/* 7. GOOGLE MAP */


function initMap() {
	var uluru = {
		lat: 44.772437,
		lng: 20.477140
	};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: uluru
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
}

/* 8. SLICK SLIDER(BLOG) */

$(function () {
	$('.slider').slick({
		centerMode: false,
		centerPadding: '60px',
		dots: true,
		/* Just changed this to get the bottom dots navigation */
		infinite: true,

		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 500,
				settings: {
					centerMode: false,
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}

		]
	});
});


/* 9. LOCAL STORAGE FOR QUICK FORM */





document.getElementById("btn").addEventListener("click", sendLS);
let users = [];
const modal = document.getElementById('id01');
const email = document.getElementById("email");
const message = document.getElementById("message");

// Pozivamo eventListener sa kojim ujedno i cekiramo mail validaciju
// Function - eventListner that trigger Local Storage event
function sendLS(event) {
	event.preventDefault();

	validation();


}
// Function - save user and add to local storage
const saveUser = (email, message) => {
	const newUser = {
		email: email,
		message: message,

	};

	if (localStorage.getItem("users")) {
		users = JSON.parse(localStorage.getItem("users"));

		users.push(newUser);
		localStorage.setItem("users", JSON.stringify(users));

	} else { // Ovo se izvrsava samo prvi put, tj. samo kada u localStorage-u
		// ne postoji polje/kljuc "users"
		users.push(newUser);
		localStorage.setItem("users", JSON.stringify(users));
	}
	modal.style.display = 'block';

	document.getElementById('showMessage').innerHTML = message;
	document.getElementById('showEmail').innerHTML = email;

}

// Function - validate quick form message
function validation() {
	const filter = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

	if (email.value === '') {
		modal.style.display = "none";
		Swal.fire({
			type: 'error',
			title: 'Niste uneli Vas Email!',
			text: 'Molimo Vas, probajte ponovo!',

		})

	} else if (message.value === '') {
		modal.style.display = "none";
		Swal.fire({
			type: 'error',
			title: 'Niste uneli nista u tekst poruke',
			text: 'Molimo Vas, probajte ponovo!',

		})

	} else if (message.value.length <= 20) {
		modal.style.display = "none";
		Swal.fire({
			type: 'error',
			title: 'Molimo da posaljete poruku sa minimum 20 slova',
			text: 'Molimo Vas, probajte ponovo!',

		})
	} else if (!filter.test(email.value)) {
		modal.style.display = "none";
		Swal.fire({
			type: 'error',
			title: 'Pogresan unos email-a',
			text: 'Molimo Vas, probajte ponovo!',
		})

	} else {
		modal.style.display = 'block';
		document.getElementById('showMessage').innerHTML = message.value;
		document.getElementById('showEmail').innerHTML = email.value;
	}
}

// Function - calling Loader modal
const endMsg = () => {
	document.getElementById('showEnd').style.display = "block";
	document.getElementById('loading').style.display = "none";
}

// Function - cancel sending to Local Storage
const cancel = () => {

	modal.style.display = "none";
}

// Function - send to Local Storage
const sendMsg = () => {
	saveUser(email.value, message.value)
	document.getElementById("question").style.display = "none";
	document.getElementById('loading').style.display = "block";

	setTimeout(endMsg, 2000);
}

// Function - pressing ok at the end reloades page
const ok = () => {
	document.getElementById('id01').style.display = 'none';
	window.location.reload()
}