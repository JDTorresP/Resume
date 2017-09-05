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
