(function() {
    let url = window.location.href;
    if (url === 'https://recordboy.github.io/' || url === 'http://localhost:4000/') {
        document.write('<script src="/js/particles.min.js"></script>');
        document.write('<script src="/js/bg.js"></script>');
        $('#bg-main').css({
            display: 'block',
            height: $(window).height()
        });
        $('.navbar').css({
            position: 'absolute',
            width: '100%',
            backgroundColor: 'transparent',
            boxShadow: 'none'
        });
        $('.navbar-menu').css({
            backgroundColor: 'transparent'
        });
        $('.navbar-logo').children('img').attr('src', '/img/logo_white.png');
        $('.navbar-main .navbar-item').css({
            color: '#fff'
        });
        $('.section').css({
            position: 'rerative'
        });
    }
}());
