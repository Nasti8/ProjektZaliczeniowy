// Template Name: DriveLux
// Template URL: https://uiparadox.co.uk/templates/drivelux/
// Description: DriveLux - Car Rental HTML5 Bootstrap website Template
// Version: 1.0.0

(function (window, document, $, undefined) {
  "use strict";
  var Init = {
    i: function (e) {
      Init.s();
      Init.methods();
    },
    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      Init.w();
      Init.BackToTop();
      Init.preloader();
      Init.searchFunction();
      Init.salActivation();
      Init.intializeSlick();
      Init.formValidation();
      Init.contactForm();
      Init.customSlector();
      Init.bar();
    },
    w: function (e) {
      this._window.on("load", Init.l).on("scroll", Init.res);
    },
    BackToTop: function () {
      var btn = $("#backto-top");
      $(window).on("scroll", function () {
        if ($(window).scrollTop() > 300) {
          btn.addClass("show");
        } else {
          btn.removeClass("show");
        }
      });
      btn.on("click", function (e) {
        e.preventDefault();
        $("html, body").animate(
          {
            scrollTop: 0,
          },
          "300"
        );
      });
    },
    preloader: function () {
      setTimeout(function () { $('#preloader').hide('slow') }, 2000);
    },
    salActivation: function () {
      sal({
        threshold: 0.1,
        once: true,
      });
    },
    searchFunction: function () {
      if ($("#searchInput").length) {
        $("#searchInput").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $(".item-card").filter(function () {
            var hasMatch = $(this).find(".product-title").text().toLowerCase().indexOf(value) > -1;
            $(this).toggle(hasMatch);
          });
        });
      }
    },

    intializeSlick: function (e) {
      if ($(".logo-slider").length) {
        $(".logo-slider").slick({
          infinite: true,
          slidesToShow: 6,
          slidesToScroll: 1,
          arrows: false,
          centerPadding: '0px',
          autoplay: true,
          cssEase: 'linear',
          autoplaySpeed: 2000,
          responsive: [
            
            {
              breakpoint: 1399,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 1199,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                arrows: false
              },
            },
            {
              breakpoint: 492,
              settings: {
                slidesToShow: 1,
                arrows: false,
              },
            },
          ],
        });
      }
      if ($(".card-slider").length) {
        $(".card-slider").slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
          arrows: true,
          centerMode: false,
          responsive: [
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 1199,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 1,
              },
            },
            {
              breakpoint: 575,
              settings: {
                arrows: false,
                slidesToShow: 1,
              },
            },
          ],
        });
      }
      if ($(".client-slider").length) {
        $(".client-slider").slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerPadding: '0px',
          centerMode: true,
          autoplay: false,
          dots: true,
          cssEase: 'linear',
          autoplaySpeed: 2000,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false,
              },
            },
          ],
        });
      }
      if ($(".review-slider").length) {
        $(".review-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          fade: true,
          asNavFor: ".review-slider-nav",
          responsive: [
            {
              breakpoint: 1400,
              settings: {
                arrows: false,
              },
            }
          ],
        });
      }
      if ($(".review-slider-nav").length) {
        $(".review-slider-nav").slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          asNavFor: ".review-slider",
          dots: false,
          arrows: false,
          centerMode: false,
          focusOnSelect: true,
          responsive: [
            {
              breakpoint: 1400,
              settings: {
                arrows: true,
              },
            },
            {
              breakpoint: 990,
              settings: {
                arrows: false,
              },
            },
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                slidesToShow: 2,
              },
            },
          ],
        });
      }
      if ($(".booking-slider").length) {
        $(".booking-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
          asNavFor: ".booking-slider-nav",
        });
      }
      if ($(".booking-slider-nav").length) {
        $(".booking-slider-nav").slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          asNavFor: ".booking-slider",
          dots: false,
          arrows: false,
          centerMode: false,
          focusOnSelect: true,
          responsive: [
            {
              breakpoint: 990,
              settings: {
                arrows: false,
              },
            },
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                slidesToShow: 2,
              },
            },
          ],
        });
      }

    },
    formValidation: function () {
      if ($(".contact-form").length) {
        $(".contact-form").validate();
      }
    },
    contactForm: function () {
        $(".contact-form").on("submit", function (e) {
          e.preventDefault();
          if ($(".contact-form").valid()) {
            var _self = $(this);
            _self
              .closest("div")
              .find('button[type="submit"]')
              .attr("disabled", "disabled");
            var data = $(this).serialize();
            // Zaktualizowana część AJAX
            // Usunięcie pierwotnej wysyłki AJAX
            // Zamiast tego po prostu wyświetlamy komunikat
            document.getElementById("message").innerHTML =
              "<h3 class='bg-primary text-white p-3 mt-3'>Wiadomość wysłana</h3>";
            $("#message").show("slow");
            $("#message").slideDown("slow");
            setTimeout(function () {
              $("#message").slideUp("hide");
              $("#message").hide("slow");
            }, 3000);
          } else {
            return false;
          }
        });
      },
      contactForm: function () {
        $(".contact-form button[type='submit']").on("click", function (e) {
            e.preventDefault(); // Zapobiegamy domyślnemu działaniu przycisku submit
    
            var form = $(this).closest('form');
            if (form.valid()) {
                var submitBtn = $(this);
                submitBtn.attr("disabled", "disabled");
    
                var formData = form.serialize();
                $.ajax({
                    url: "./assets/mail/contact.php",
                    type: "post",
                    dataType: "json",
                    data: formData,
                    success: function (response) {
                        form.trigger("reset");
                        submitBtn.removeAttr("disabled");
                        if (response.success) {
                            $("#message").html("<h3 class='bg-primary text-white p-3 mt-3'>Wiadomość wysłana pomyślnie</h3>").slideDown();
                        } else {
                            $("#message").html("<h3 class='bg-danger text-white p-3 mt-3'>Wystąpił błąd podczas wysyłania wiadomości</h3>").slideDown();
                        }
                        setTimeout(function () {
                            $("#message").slideUp();
                        }, 3000);
                    },
                    error: function () {
                        $("#message").html("<h3 class='bg-danger text-white p-3 mt-3'>Wystąpił błąd podczas wysyłania wiadomości</h3>").slideDown();
                        submitBtn.removeAttr("disabled");
                    }
                });
            }
        });
    },
    customSlector: function(){
      let cs = $('.custom_select');
      let csMenu = $('.select_menu');
      let csMenuOpt = $('.select_menu li')

      cs.click(function() {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');
        $(this).children('.select_menu').slideToggle(300);
      })
      cs.focusout(function() {
        $(this).removeClass('active');
        $(this).children('.select_menu').slideUp(300);
      })
      csMenuOpt.click(function() {
        var div = $(this).html();
        $('.selected').children().replaceWith(div)
      })
    },
    bar: function () {

    },

  }
  Init.i();
})(window, document, jQuery);


