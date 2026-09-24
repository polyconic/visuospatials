(function () {
    const btn = document.querySelector('.stow');
    if (!btn) return;

    function set(on) {
        document.body.classList.toggle('stowed', on);
        btn.textContent = on ? 'Edit' : 'Hide';
        btn.setAttribute('aria-pressed', String(on));
    }

    btn.addEventListener('click', function () {
        set(!document.body.classList.contains('stowed'));
    });

    document.addEventListener('keydown', function (e) {
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        if (e.target instanceof Element && e.target.matches('input[type=text], input:not([type]), textarea')) return;
        if (e.key.toLowerCase() === 'h') set(!document.body.classList.contains('stowed'));
        if (e.key === 'Escape' && document.body.classList.contains('stowed')) set(false);
    });

    set(false);
})();
