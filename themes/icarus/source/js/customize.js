(function() {
    let url = window.location.href;
    if (url === 'https://recordboy.github.io/' || url === 'http://localhost:4000/') {

        const mainDimmed = document.getElementById('bg-main').querySelector('.dimmed');
        const bgMain = document.querySelector('#bg-main');
        const navbar = document.querySelector('.navbar');
        const navbarMenu = document.querySelector('.navbar-menu');
        const navbarLogo = document.querySelector('.navbar-logo');
        const navbarStart = document.querySelector('.navbar-start');
        const navbarEnd = document.querySelector('.navbar-end');
        const saturn = document.getElementById('bg-main').querySelector('.tit').childNodes[0];
        const windowHeight = window.innerHeight;
        let ratio = 0;
        let bgInterval = null;
        let bgIntervalNum = 0;
        let bgIntervalRes = 0;

        // particles
        document.write('<script src="/js/particles.min.js"></script>');
        document.write('<script src="/js/bg.js"></script>');

        // main init
        bgMain.style.display = 'block';
        bgMain.style.height = windowHeight + 'px';
        navbar.style.position = 'absolute';
        navbar.style.width = '100%';
        navbar.style.backgroundColor = 'transparent';
        navbar.style.boxShadow = 'none';
        navbarMenu.style.backgroundColor = 'transparent';
        navbarLogo.childNodes[0].setAttribute('src', '/img/logo_white.png');

        // nav color set
        navSet(navbarStart);
        navSet(navbarEnd);

        // main page open
        window.onload = function() {
            mainRatio();
            mainBgInit();
        }

        window.addEventListener('scroll', function() {
            if (window.scrollY === 0) {
                mainDimmed.style.display = 'none';
            } else {
                mainDimmed.style.display = 'block';
                mainBgSet();
            }
            mainRatio();
        });

        function navSet(target) {
            for (let i = 0; i < target.childNodes.length; i++) {
                target.childNodes[i].style.color = '#fff';
            }
        }

        function mainRatio() {
            ratio = Math.floor(window.scrollY / windowHeight * 1000) / 1000;
        }

        function mainBgSet() {
            const star = document.getElementById('bg-main').querySelector('.particles-js-canvas-el');
            star.style.top = Math.floor(ratio * 200) + 'px';
            // saturn.style.width = Math.floor(ratio * 200) + 'px';
            mainDimmed.style.opacity = ratio;
        }

        function mainBgInit() {
            if (ratio < 1 && ratio !== 0) {
                const star = document.getElementById('bg-main').querySelector('.particles-js-canvas-el');
                console.log('main bg init start');
                // saturn.style.width = Math.floor(ratio * 200) + 'px';
                mainDimmed.style.display = 'block';
                bgInterval = setInterval(function() {
                    bgIntervalNum++;
                    bgIntervalRes = Math.round(bgIntervalNum * 0.01 * 100) / 100;
                    if (bgIntervalNum >= ratio * 100) {
                        clearInterval(bgInterval);
                    }
                    star.style.top = Math.floor(ratio * 200) + 'px';
                    mainDimmed.style.opacity = bgIntervalRes;
                }, 10);
            }
        }

    }
}());
