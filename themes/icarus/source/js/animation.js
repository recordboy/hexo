(function() {

    // customize
    customize();

    function $() {
        return Array.prototype.slice.call(document.querySelectorAll.apply(document, arguments));
    }

    if ($('.columns .column-right').length && $('.columns .column-right-shadow').length && !$('.columns .column-right-shadow')[0].children.length) {
        for (const child of $('.columns .column-right')[0].children) {
            $('.columns .column-right-shadow')[0].append(child.cloneNode(true));
        }
    }

    $('#hero, body > .navbar, body > .section, body > .footer').forEach(element => {
        element.style.transition = '0s';
        element.style.opacity = '0';
    });

    document.querySelector('body > .navbar').style.transform = 'translateY(-100px)';
    [
        '#hero',
        '.column-main > .card, .column-main > .pagination, .column-main > .post-navigation',
        '.column-left > .card, .column-right-shadow > .card',
        '.column-right > .card'
    ].forEach(selector => {
        $(selector).forEach(element => {
            element.style.transition = '0s';
            element.style.opacity = '0';
            element.style.transform = 'scale(0.8)';
            if (element.id === 'hero') {
                element.style.transform = 'scale(0)';
            }
            element.style.transformOrigin = 'center top';
        });
    });
    setTimeout(() => {
        $('#hero, body > .navbar, body > .section, body > .footer').forEach(element => {
            element.style.opacity = '1';
            element.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
        });
        document.querySelector('body > .navbar').style.transform = 'translateY(0)';
        [
            '#hero',
            '.column-main > .card, .column-main > .pagination, .column-main > .post-navigation',
            '.column-left > .card, .column-right-shadow > .card',
            '.column-right > .card'
        ].forEach(selector => {
            let i = 1;
            $(selector).forEach(element => {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = '';
                    element.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
                }, i * 100);
                i++;
            });
        });
    });

    // customize
    function customize() {
        const url = window.location.href;
        if (url === 'https://recordboy.github.io/' || url === 'http://localhost:4000/') {
            const navbar = document.querySelector('.navbar');
            const navbarMenu = document.querySelector('.navbar-menu');
            const navbarLogo = document.querySelector('.navbar-logo');
            const navbarStart = document.querySelector('.navbar-start');
            const navbarEnd = document.querySelector('.navbar-end');
            navbar.style.position = 'absolute';
            navbar.style.width = '100%';
            navbar.style.backgroundColor = 'transparent';
            navbar.style.boxShadow = 'none';
            navbarMenu.style.backgroundColor = 'transparent';
            navbarLogo.childNodes[0].setAttribute('src', '/img/logo_white.png');
            const navSet = target => {
                for (let i = 0; i < target.childNodes.length; i++) {
                    target.childNodes[i].style.color = '#fff';
                }
            }
            navSet(navbarStart);
            navSet(navbarEnd);
        }

    }

}());
