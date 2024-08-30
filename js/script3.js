// $(window).scroll(function() {
//     parallax();
//   })

//   function parallax() {

//     var wScroll = $(window).scrollTop()

//     if ($(wScroll).val().length > 70) {
//         $('.nav__logo').css('color', 'red');
//     }

//     else {
//         $('.nav__logo').css('color', 'blue');
//     }

//   }

$(document).ready(function () {
  $(".nav__logo").addClass("menu_black");

  $(window).scroll(function () {
    var light_pos = $("#header").offset().top;
    var light_height = $("#header").height();
    var menu_pos = $(".nav__logo").offset().top;
    var menu_height = $(".nav__logo").height();
    var scroll = $(window).scrollTop();
    var test = $("header").offset().bottom;
    // console.log('light',light_pos);
    // console.log('menu',menu_pos);
    // console.log('scroll',scroll);

    if (menu_pos > light_pos && menu_pos < light_pos + light_height) {
      $(".nav__logo").addClass("menu_white");
      $(".nav__logo").removeClass("menu_black");
      $("#list").addClass("menu_white");
      $("#list").removeClass("menu_black");
      document.getElementById("svg").style.color = "#fff";
    } else {
      $(".nav__logo").removeClass("menu_white");
      $(".nav__logo").addClass("menu_black");
      $("#list").removeClass("menu_white");
      $("#list").addClass("menu_black");
      document.getElementById("svg").style.color = "#232323";
    }

    if (menu_pos > light_height) {
      $(".nav__wrapper").addClass("test-bg");

      $(".nav__logo").removeClass("menu_black");
      $(".nav__logo").addClass("menu_white");

      $("#list").addClass("menu_white");
      $("#list").removeClass("menu_black");

      document.getElementById("svg").style.color = "#fff";
    } else {
      $(".nav__wrapper").removeClass("test-bg");
    }
  });
});
