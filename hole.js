(function () {
    const holes = document.querySelectorAll('.hole');
    if (!holes.length) return;

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Scattered holes land in a band above or below the middle, so they never
       sit on the wordmark. Re-rolled on every load, never on resize. */
    function scatter(el) {
        const s = el.offsetWidth;
        const x = (0.12 + Math.random() * 0.76) * innerWidth;
        const y = (Math.random() < 0.5 ? 0.14 + Math.random() * 0.16
                                       : 0.66 + Math.random() * 0.18) * innerHeight;
        el.style.left = Math.round(x - s / 2) + 'px';
        el.style.top = Math.round(y - s / 2) + 'px';
    }

    holes.forEach(function (el) {
        if (el.dataset.scatter !== undefined) scatter(el);

        const size = Math.round(el.getBoundingClientRect().width);
        if (!size) return;

        const canvas = el.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        const horizon = size * 0.16;
        const dpr = Math.min(2, devicePixelRatio || 1);
        let pull = 0;

        canvas.width = size * dpr;
        canvas.height = size * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const dots = Array.from({ length: Math.round(size * 1.4) }, function () {
            return { a: Math.random() * 6.2832, r: horizon + Math.random() * (size / 2 - horizon) };
        });

        function frame() {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.24)';
            ctx.fillRect(0, 0, size, size);

            const c = size / 2;
            const rate = 1 + pull * 1.9;
            const reach = size / 2 - horizon;

            for (const d of dots) {
                // Closer in, faster around and faster down. Nothing climbs back out.
                d.a += (horizon / d.r) * 0.28 * rate;
                d.r -= (size * 0.0008 + horizon * horizon * 0.0075 / (d.r * d.r)) * rate;
                if (d.r <= horizon) { d.a = Math.random() * 6.2832; d.r = size / 2 - Math.random() * 6; }
                const t = Math.min(1, (d.r - horizon) / reach);
                ctx.fillStyle = 'rgba(242, 242, 239, ' + (0.98 - t * 0.55) + ')';
                ctx.fillRect(c + Math.cos(d.a) * d.r, c + Math.sin(d.a) * d.r, 1.4, 1.4);
            }

            // A halo under the horizon so the hole reads on light and dark grounds alike.
            const halo = ctx.createRadialGradient(c, c, horizon * 0.9, c, c, horizon * 2.4);
            halo.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
            halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = halo;
            ctx.beginPath();
            ctx.arc(c, c, horizon * 2.4, 0, 6.2832);
            ctx.fill();

            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(c, c, horizon, 0, 6.2832);
            ctx.fill();

            ctx.strokeStyle = pull > 0.02 ? 'rgba(255, 45, 0, ' + (0.35 + pull * 0.65) + ')'
                                          : 'rgba(242, 242, 239, 0.5)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(c, c, horizon + 1.5, 0, 6.2832);
            ctx.stroke();

            if (!still) requestAnimationFrame(frame);
        }

        el.addEventListener('pointerenter', function () { pull = 1; });
        el.addEventListener('pointerleave', function () { pull = 0; });
        el.addEventListener('focus', function () { pull = 1; });
        el.addEventListener('blur', function () { pull = 0; });

        if (still) { for (let i = 0; i < 90; i++) frame(); } else frame();
    });
})();
