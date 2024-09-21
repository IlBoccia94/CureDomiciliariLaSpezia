$(document).ready(function () {
    function scrollToAnchor(aid) {
        var aTag = $("#" + aid);
        $('html,body').animate({ scrollTop: aTag.offset().top }, 'slow');
    }

    // Quando si apre una card, mostra il pulsante di chiusura
    $('.collapse').on('show.bs.collapse', function () {
        $(this).find('.close-btn').fadeIn();
    });

    // Quando si chiude una card, nasconde il pulsante di chiusura
    $('.collapse').on('hide.bs.collapse', function () {
        $(this).find('.close-btn').fadeOut();
    });

    // Aggiunge funzionalità al pulsante di chiusura
    $('.close-btn').on('click', function () {
        $(this).closest('.collapse').collapse('hide');
    });

    $("#toglideflussorelink").click(function (e) {
        $(".close-btn").click();
        setTimeout(
            function () {
                $(".collapseTwo").click();
                scrollToAnchor("toglideflussore");
            }, 500);

    });
});
