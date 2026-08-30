(function () {
    const ROOMS = [
        ['01', 'Halftone', 'Dot · dither · ascii', '/lab/halftone.html'],
        ['02', 'Moiré', 'Interference fields', '/lab/moire.html'],
        ['03', 'Type', 'Kinetic specimen', '/lab/type.html'],
        ['04', 'Poster', 'Generative grid', '/lab/poster.html'],
        ['05', 'The Lab', 'All rooms', '/lab/'],
        ['06', 'Studio/About', 'The idea', '/studio.html']
    ];

    const here = location.pathname.replace(/index\.html$/, '');

    const nav = document.createElement('nav');
    nav.className = 'vs-menu';
    nav.setAttribute('aria-hidden', 'true');
    nav.tabIndex = -1;
    nav.innerHTML = '<h2>Visuospatials &mdash; index</h2><ol>' + ROOMS.map(function (r) {
        const current = r[3] === here ? ' aria-current="page"' : '';
        return '<li><a href="' + r[3] + '"' + current + '><span class="n">' + r[0] +
               '</span><span class="t">' + r[1] + '</span><span class="d">' + r[2] + '</span></a></li>';
    }).join('') + '</ol><p class="close">Esc to close &middot; there is more than this</p>';
    document.body.appendChild(nav);

    let lastFocus = null;

    function open() {
        if (nav.classList.contains('on')) return;
        lastFocus = document.activeElement;
        nav.classList.add('on');
        document.body.classList.add('menu-open');
        flag(true);
        nav.setAttribute('aria-hidden', 'false');
        // Focus the panel, not its first link: focusing a link reads as "selected".
        nav.focus();
    }

    function close() {
        if (!nav.classList.contains('on')) return;
        nav.classList.remove('on');
        document.body.classList.remove('menu-open');
        flag(false);
        nav.setAttribute('aria-hidden', 'true');
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    window.VSMenu = {
        open: open,
        close: close,
        toggle: function () { nav.classList.contains('on') ? close() : open(); },
        isOpen: function () { return nav.classList.contains('on'); }
    };

    const mark = document.querySelector('.menumark');
    if (mark) mark.addEventListener('click', function (e) { e.preventDefault(); window.VSMenu.toggle(); });

    function flag(on) { if (mark) mark.setAttribute('aria-expanded', String(on)); }

    nav.addEventListener('click', function (e) { if (e.target === nav) close(); });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') close();
    });
})();
