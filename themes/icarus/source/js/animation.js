(function() {
    
    // customize();

    function $() {
        return Array.prototype.slice.call(document.querySelectorAll.apply(document, arguments));
    }

    if ($('.columns .column-right').length && $('.columns .column-right-shadow').length && !$('.columns .column-right-shadow')[0].children.length) {
        for (const child of $('.columns .column-right')[0].children) {
            $('.columns .column-right-shadow')[0].append(child.cloneNode(true));
        }
    }

    $('body > .navbar, body > .section, body > .footer').forEach(element => {
        element.style.transition = '0s';
        element.style.opacity = '0';
    });
    document.querySelector('body > .navbar').style.transform = 'translateY(-100px)';
    [
        '.column-main > .card, .column-main > .pagination, .column-main > .post-navigation',
        '.column-left > .card, .column-right-shadow > .card',
        '.column-right > .card'
    ].forEach(selector => {
        $(selector).forEach(element => {
            element.style.transition = '0s';
            element.style.opacity = '0';
            element.style.transform = 'scale(0.8)';
            element.style.transformOrigin = 'center top';
        });
    });
    setTimeout(() => {
        $('body > .navbar, body > .section, body > .footer').forEach(element => {
            element.style.opacity = '1';
            element.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
        });
        document.querySelector('body > .navbar').style.transform = 'translateY(0)';
        [
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
            const nav = document.querySelector('.navbar');
            const navBg = nav.querySelector('.bg');
            const navLogo = nav.querySelector('.navbar-logo');
            let timer = null;
            nav.classList.add('on');
            navBg.style.display = 'block';
            navLogo.childNodes[0].setAttribute('src', '/img/logo_ko_white.png');
            window.onload = () => {
                navBgChange();
            };
            const navBgChange = () => {
                navBg.classList = 'bg type02';
                timer = setInterval(() => {
                    if (navBg.classList.value === 'bg type01') {
                        navBg.classList = 'bg type02';
                    } else if (navBg.classList.value === 'bg type02') {
                        navBg.classList = 'bg type03';
                    } else if (navBg.classList.value === 'bg type03') {
                        navBg.classList = 'bg type04';
                    } else if (navBg.classList.value === 'bg type04') {
                        navBg.classList = 'bg type01';
                    }
                }, 2500);
            }
        }
    }
}());
