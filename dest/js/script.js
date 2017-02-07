/* Document Ready
 ========================================================*/
$(document).ready(function () {
    mobileStartView();

    mobileToggleBtn();

});
/* Resize
 ========================================================*/
$(window).resize(function(){
    mobileStartView();
});

/* Function mobile start view
 ========================================================*/
function mobileStartView() {
    'use strict';
    var mobile_menu = $('.mob-menu'),
        navigation = $('.navigation');

    var wWidth = $(window).width();

    if( wWidth <= 991 ){
        mobile_menu.addClass('isVisible'); //show mob-menu

        navigation
            .addClass('navigation__mobileView');
    } else{
        mobile_menu.removeClass('isVisible'); //show mob-menu

        navigation
            .removeClass('navigation__mobileView');
    }
}

/* Function mobile Toggle
 ========================================================*/
function mobileToggleBtn() {
    var mob__menu = $('.mob-menu'),
        mobile__btn = $('.mob-menu__btn'),
        navigation__mobileView = $('.navigation__mobileView');

    mobile__btn.on('click', function(event){
        event.preventDefault();
        // console.log(event.target);
        // console.log($(this));
        var __this = $(this);
        __this.closest( mob__menu )
            .toggleClass('mob-menu--opened');

        navigation__mobileView.toggleClass('navigation__mobileView--opened')
    });
}