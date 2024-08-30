
var navLogo = document.querySelector('.nav__logo');
var nav = document.querySelector('.nav__wrapper');
var headerHeight = document.querySelector('#header').clientHeight;
window.onscroll = function () {
    if (window.scrollY > nav.offsetHeight / 2) {
        nav.classList.add('menu_white');
    } else {
      nav.classList.remove("menu_white");
    }
    if (headerHeight > nav.offsetHeight) {
        if (window.scrollY > headerHeight) {
            nav.classList.add('test-bg');
        } else {
            nav.classList.remove('test-bg');
        }
    }
}