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
        const windowHeight = window.innerHeight;
        let ratio = 0;
        let bgInterval = null;
        let bgIntervalNum = 0;
        let bgIntervalRes = 0;

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
            mainDimmed.style.opacity = ratio;
        }

        function mainBgInit() {
            if (ratio < 1 && ratio !== 0) {
                mainDimmed.style.display = 'block';
                bgInterval = setInterval(function() {
                    bgIntervalNum++;
                    bgIntervalRes = Math.round(bgIntervalNum * 0.01 * 100) / 100;
                    if (bgIntervalNum >= ratio * 100) {
                        clearInterval(bgInterval);
                    }
                    mainDimmed.style.opacity = bgIntervalRes;
                }, 10);
            }
        }

    }
}());
