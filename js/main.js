(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate WOW.js
    new WOW().init();

    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-white shadow');
            } else {
                $('.fixed-top').removeClass('bg-white shadow');
            }
        } else {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-white shadow').css('top', -45);
            } else {
                $('.fixed-top').removeClass('bg-white shadow').css('top', 0);
            }
        }
    });
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Project carousel
    $(".project-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
			0:{ items:1 },
            576:{ items:1 },
            768:{ items:2 },
            992:{ items:3 }
        }
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{ items:1 },
			576:{ items:1 },
            768:{ items:2 },
            992:{ items:3 }
        }
    });
    
    // Disclaimer Toggle Function
    window.toggleDisclaimer = function() {
        var dots = document.getElementById("dots");
        var moreText = document.getElementById("moreText");
        var btnText = document.getElementById("readMoreBtn");

        if (dots && moreText && btnText) {
            if (dots.style.display === "none") {
                dots.style.display = "inline";
                btnText.innerHTML = "Read More";
                moreText.style.display = "none";
            } else {
                dots.style.display = "none";
                btnText.innerHTML = "Read Less";
                moreText.style.display = "inline";
            }
        }
    };

    // Generic Phone Call Event Trigger (ready for your Google Ads conversion tag)
    $(document).on('click', 'a[href^="tel:"]', function () {
        if (typeof gtag === 'function') {
            gtag('event', 'conversion', {
                'event_category': 'Phone Call Conversion'
            });
        }
    });

    // Coverage / Zip Code Availability Checker
    $('#coverageForm, #heroZipForm').on('submit', function (e) {
        e.preventDefault();
        var zipInput = $(this).find('input[type="text"]').val().trim();
        var resultDiv = $(this).siblings('.coverage-result');
        if (resultDiv.length === 0) {
            resultDiv = $('<div class="coverage-result mt-3"></div>').insertAfter($(this));
        }

        var zipRegex = /^\d{5}(-\d{4})?$/;
        if (!zipRegex.test(zipInput)) {
            resultDiv.html('<div class="alert alert-warning py-2 px-3 small"><i class="fa fa-exclamation-triangle me-2"></i>Please enter a valid 5-digit US ZIP code to check coverage.</div>');
            return;
        }

        resultDiv.html(
            '<div class="alert alert-success py-3 px-4 shadow-sm">' +
            '<h6 class="fw-bold mb-1 text-success"><i class="fa fa-check-circle me-2"></i>Great News! Services Found in ' + zipInput + '</h6>' +
            '<p class="mb-2 small text-dark">High-Speed Fiber, Cable Broadband, and 5G Home Wireless options are actively servicing your area. Speak with our plan concierge to compare local speeds up to 1,000+ Mbps.</p>' +
            '<a href="tel:+18889635771" class="btn btn-sm btn-primary fw-bold"><i class="fa fa-phone-alt me-2"></i>Call Concierge: +1 (888) 963-5771</a>' +
            '</div>'
        );
    });

    // Callback & Contact Form Submissions
    $('#callbackForm, #contactForm').on('submit', function (e) {
        e.preventDefault();
        var form = $(this);
        var name = form.find('input[name="name"], #name').val();
        var phone = form.find('input[name="phone"], #mobile').val();
        var email = form.find('input[name="email"], #mail, #email').val();

        var alertBox = form.find('.alert-feedback');
        if (alertBox.length === 0) {
            alertBox = $('<div class="alert alert-feedback mt-3" style="display:none;"></div>').appendTo(form);
        }

        if (!name || (!phone && !email)) {
            alertBox.removeClass('alert-success').addClass('alert-danger')
                .html('<i class="fa fa-exclamation-circle me-2"></i>Please provide your name and a valid phone number or email address.')
                .fadeIn();
            return;
        }

        alertBox.removeClass('alert-danger').addClass('alert-success')
            .html('<i class="fa fa-check-circle me-2"></i><strong>Thank you, ' + name + '!</strong> Your inquiry has been received. One of our independent broadband specialists will review available plans at your location and contact you shortly.')
            .fadeIn();

        form[0].reset();
    });

})(jQuery);
