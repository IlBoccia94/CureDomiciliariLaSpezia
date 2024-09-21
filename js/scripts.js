$(document).ready(function () {

    // Controllo se l'utente ha già visto la modale
    if (!localStorage.getItem("modalShown")) {
        // Se non l'ha vista, mostro la modale e salvo nel localStorage
        $("#btnTriggerModal").click();
        localStorage.setItem("modalShown", "true");
    }

    const $parallaxElements = $('.parallax');
    const scrollFactor = 0.5;

    function easeOutQuad(t) {
        return t * (2 - t);
    }

    function updateParallax() {
        $parallaxElements.each(function () {
            const $element = $(this);
            const scrollPosition = $(window).scrollTop();
            const elementOffset = $element.offset().top;
            const elementHeight = $element.height();
            const windowHeight = $(window).height();

            if (scrollPosition + windowHeight > elementOffset && scrollPosition < elementOffset + elementHeight) {
                const distance = (scrollPosition - elementOffset) * scrollFactor;
                const easedDistance = easeOutQuad(Math.min(1, distance / elementHeight)) * distance;
                $element.css('background-position', `center ${easedDistance}px`);
            }
        });
    }

    $(window).on('scroll', updateParallax);
    updateParallax(); // Chiamata iniziale per impostare l'effetto

    const sections = ['#section1', '#section2', '#section3', '#section4', '#section5', '#section6', '#section7', '#section8'];
    let isScrolling = false;
    const scrollDuration = 1000; // Durata dello scroll in millisecondi

    function scrollToSection(index) {
        if (index < 0 || index >= sections.length) return;

        isScrolling = true;
        $('html, body').animate({
            scrollTop: $(sections[index]).offset().top
        }, scrollDuration, function () {
            isScrolling = false;
        });
    }

    // Funzione per gestire lo scroll tramite rotellina del mouse
    $(window).on('wheel', function (event) {
        if (isScrolling) return;

        const direction = event.originalEvent.deltaY > 0 ? 1 : -1;
        const currentScrollPosition = $(window).scrollTop();
        let currentSectionIndex = sections.findIndex((section) => {
            return currentScrollPosition < $(section).offset().top + $(section).outerHeight();
        });

        if (direction === 1 && currentSectionIndex < sections.length - 1) {
            scrollToSection(currentSectionIndex + 1);
        } else if (direction === -1 && currentSectionIndex > 0) {
            scrollToSection(currentSectionIndex - 1);
        }

        event.preventDefault();
    });

    // Variabili per il touch
    let startY = 0;

    // Evento touchstart per memorizzare la posizione iniziale
    $(window).on('touchstart', function (e) {
        startY = e.originalEvent.touches[0].pageY; // Memorizza la posizione di partenza
    });

    // Evento touchmove per gestire lo scorrimento
    $(window).on('touchmove', function (e) {
        if (isScrolling) return;

        const endY = e.originalEvent.touches[0].pageY; // Memorizza la posizione corrente

        // Calcola la direzione basata sulla differenza tra startY e endY
        const direction = startY > endY ? 1 : -1;

        const currentScrollPosition = $(window).scrollTop();
        let currentSectionIndex = sections.findIndex((section) => {
            return currentScrollPosition < $(section).offset().top + $(section).outerHeight();
        });

        if (direction === 1 && currentSectionIndex < sections.length - 1) {
            scrollToSection(currentSectionIndex + 1);
        } else if (direction === -1 && currentSectionIndex > 0) {
            scrollToSection(currentSectionIndex - 1);
        }

        e.preventDefault(); // Impedisce il comportamento di scroll standard
    });
});
