$(document).ready(function() {
    var fileName = location.href.split("/").slice(-1)[0];
    fileName = fileName.split(".")[0];
    console.log(fileName);
    if (fileName) {
        $("#" + fileName).addClass("active");
    } else {
        $("#index").addClass("active");
    }

    $("#car-item-0").addClass("active");
    $("#car-ind-0").addClass("active");

    $('.carousel').carousel({
        interval: 5000,
    });

    if ($(document).dotdotdot) {
        $('.news-card').dotdotdot({
            ellipsis: '...',
            wrap: 'word',
            after: 'a.readmore',
            fallbackToLetter: true,
            watch: window,

        });
    }

});
