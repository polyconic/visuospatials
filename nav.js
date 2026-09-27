(function () {
    /* Chromium browsers load a page as soon as a pointer settles on its link, so
       the fade opens onto a finished page instead of waiting on the network.
       Browsers without speculation rules ignore this. */
    if (window.HTMLScriptElement && HTMLScriptElement.supports &&
        HTMLScriptElement.supports('speculationrules')) {
        const rules = document.createElement('script');
        rules.type = 'speculationrules';
        rules.textContent = JSON.stringify({
            prerender: [{ where: { href_matches: '/*' }, eagerness: 'moderate' }]
        });
        document.head.append(rules);
    }

    /* Phones hide the .exit bar's links (base.css) and get them as a drop from a
       two-bar mark in the top right. It is copied from the bar, so the bar
       stays the one place the sections are listed. */
    const bar = document.querySelector('.exit');
    const corner = document.querySelector('.corner');
    if (bar && corner) {
        const drop = document.createElement('nav');
        drop.className = 'drop';
        drop.id = 'drop';
        drop.setAttribute('aria-label', 'Menu');
        for (const item of bar.children) {
            if (!item.matches('.spacer, .copy')) drop.append(item.cloneNode(true));
        }

        const mark = document.createElement('button');
        mark.className = 'menumark';
        mark.type = 'button';
        mark.setAttribute('aria-label', 'Menu');
        mark.setAttribute('aria-controls', 'drop');
        mark.setAttribute('aria-expanded', 'false');
        mark.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' +
            '<rect x="3" y="7.5" width="18" height="3"/>' +
            '<rect x="3" y="13.5" width="18" height="3"/></svg>';
        corner.append(mark);
        document.body.append(drop);

        const set = function (open) {
            drop.classList.toggle('on', open);
            mark.setAttribute('aria-expanded', String(open));
        };
        mark.addEventListener('click', function () {
            set(!drop.classList.contains('on'));
        });
        document.addEventListener('click', function (e) {
            if (drop.classList.contains('on') && e.target instanceof Element &&
                !e.target.closest('.drop, .menumark')) set(false);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && drop.classList.contains('on')) {
                set(false);
                mark.focus();
            }
        });
        /* A page restored from the back/forward cache comes back closed. */
        window.addEventListener('pageshow', function () { set(false); });
    }

    /* The arrow goes back a page, but only within the site. history.length counts
       entries from anywhere, so testing it alone would walk visitors out to
       whatever they arrived from. No same-origin referrer, and the href takes
       over and sends them to the front. */
    const back = document.querySelector('.backmark');
    if (!back) return;

    back.addEventListener('click', function (e) {
        let internal = false;
        try {
            internal = !!document.referrer &&
                new URL(document.referrer).origin === location.origin;
        } catch (err) {}
        if (internal && history.length > 1) {
            e.preventDefault();
            history.back();
        }
    });
})();
