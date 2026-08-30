(function () {
    const holes = document.querySelectorAll('.hole');
    if (!holes.length) return;

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

    holes.forEach(function (el) {
        const size = Math.round(el.getBoundingClientRect().width);
        if (!size) return;

        const canvas = el.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        const horizon = size * 0.28;
        const dpr = Math.min(2, devicePixelRatio || 1);
        let pull = 0;

        canvas.width = size * dpr;
        canvas.height = size * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const dots = Array.from({ length: 34 }, function () {
            return { a: Math.random() * 6.2832, r: horizon + Math.random() * (size / 2 - horizon) };
        });

        function frame() {
            ctx.clearRect(0, 0, size, size);

            const c = size / 2;
            const rate = 1 + pull * 2.4;
            const reach = size / 2 - horizon;

            for (const d of dots) {
                d.a += (horizon / d.r) * 0.028 * rate;
                d.r -= 0.055 * rate;
                if (d.r <= horizon) { d.a = Math.random() * 6.2832; d.r = size / 2; }
                const t = (d.r - horizon) / reach;
                ctx.fillStyle = 'rgba(242, 242, 239, ' + (0.9 - t * 0.6) + ')';
                ctx.fillRect(c + Math.cos(d.a) * d.r, c + Math.sin(d.a) * d.r, 1.4, 1.4);
            }

            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(c, c, horizon, 0, 6.2832);
            ctx.fill();

            ctx.strokeStyle = pull > 0.02 ? 'rgba(255, 45, 0, 0.9)' : 'rgba(242, 242, 239, 0.5)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(c, c, horizon + 2, 0, 6.2832);
            ctx.stroke();

            if (!still) requestAnimationFrame(frame);
        }

        el.addEventListener('pointerenter', function () { pull = 1; });
        el.addEventListener('pointerleave', function () { pull = 0; });
        el.addEventListener('focus', function () { pull = 1; });
        el.addEventListener('blur', function () { pull = 0; });

        frame();
    });
})();
