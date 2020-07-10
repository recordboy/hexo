(function() {
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

    // main customize
    customize();

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

    // main customize
    function customize() {

        const url = window.location.href;
        if (url === 'https://recordboy.github.io/' || url === 'http://localhost:4000/') {

            // init        
            const hero = document.querySelector('#hero');
            const dimmed = hero.querySelector('.dimmed');
            const navbar = document.querySelector('.navbar');
            const navbarMenu = document.querySelector('.navbar-menu');
            const navbarLogo = document.querySelector('.navbar-logo');
            const navbarStart = document.querySelector('.navbar-start');
            const navbarEnd = document.querySelector('.navbar-end');
            let ratio = 0;
        
            // particles
            document.write('<script src="/js/particles.min.js"></script>');
            document.write('<script src="/js/app.js"></script>');
        
            // main init
            hero.style.display = 'block';
            navbar.style.position = 'absolute';
            navbar.style.width = '100%';
            navbar.style.backgroundColor = 'transparent';
            navbar.style.boxShadow = 'none';
            navbarMenu.style.backgroundColor = 'transparent';
            navbarLogo.childNodes[0].setAttribute('src', '/img/logo_white.png');
            hero.style.display === 'block' ? hero.classList.add('on') : hero.classList.remove('on');
        
            // main page open
            window.onload = () => {
                mainRatio();
                mainBgInit();
            }
        
            window.addEventListener('scroll', () => {
                if (window.scrollY === 0) {
                    dimmed.style.display = 'none';
                } else {
                    dimmed.style.display = 'block';
                    window.scrollY < 500 && mainBgSet();
                }
                mainRatio();
            });
        
            const navSet = target => {
                for (let i = 0; i < target.childNodes.length; i++) {
                    target.childNodes[i].style.color = '#fff';
                }
            }
        
            const mainRatio = () => {
                ratio = Math.floor(window.scrollY / hero.clientHeight * 1000) / 1000;
            }
        
            const mainBgSet = () => {
                dimmed.style.opacity = ratio;
            }
        
            const mainBgInit = () => {
                if (ratio < 1 && ratio !== 0) {
                    dimmed.style.display = 'block';
                    dimmed.style.opacity = ratio;
                }
            }
        
            // nav color set
            navSet(navbarStart);
            navSet(navbarEnd);
        
        }
        
    }
}());
