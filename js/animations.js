$
    .fn
    .extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this
                .addClass('animated ' + animationName)
                .one(animationEnd, function () {
                    $(this).removeClass('animated ' + animationName);
                });
            return this;
        }
    });

function skillsAnim() {
    $('#skills').animateCss('fadeIn');
};
function skillsAnim2() {
    $('#skills2').animateCss('fadeIn');
};

function footAnim() {
    $('#foot').animateCss('fadeIn');
};


// manejador de scroll listener
window
    .addEventListener('scroll', function (e) {
        last_known_scroll_position = window.scrollY;
        if (!ticking) {
            window
                .requestAnimationFrame(function () {
                    manejadorScroll(last_known_scroll_position);
                    ticking = false;
                });
        }
        ticking = true;
    });

function manejadorScroll(scroll_pos) {
    //si el scroll sobrepasa cierto valor las figuras cambian de velocidad
    if (scroll_pos > totalHeight / 6) {} else if (scroll_pos < (totalHeight / 6)) {}
    //print("coord", scroll_pos);
}