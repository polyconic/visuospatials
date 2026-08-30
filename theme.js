(function () {
    const KEY = 'vs-theme';
    const root = document.documentElement;
    const btn = document.querySelector('.themetoggle');
    if (!btn) return;

    function label() {
        const light = root.classList.contains('light');
        btn.setAttribute('aria-label', light ? 'Switch to dark' : 'Switch to light');
        btn.setAttribute('aria-pressed', String(light));
    }

    btn.addEventListener('click', function () {
        const light = root.classList.toggle('light');
        try { localStorage.setItem(KEY, light ? 'light' : 'dark'); } catch (e) {}
        label();
        // Canvas rooms paint their own ground and cannot read a class change.
        window.dispatchEvent(new CustomEvent('vs-theme', { detail: { light: light } }));
    });

    label();
})();
