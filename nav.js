(function () {
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
