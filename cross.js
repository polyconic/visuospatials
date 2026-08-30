(function () {
    const marks = document.querySelectorAll('.cross');
    if (!marks.length) return;

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Three lines wandering around the sandwich they started as. Each has its own
       slow drift, so they cross at angles that never repeat. Hover resolves them
       into three evenly spaced parallel diagonals. */
    const DIAGONAL = -0.7854;
    const LINES = [
        { amp: 0.85, w: 0.29, p: 0.0, seat: 1, ow: 0.21 },
        { amp: 0.60, w: 0.18, p: 2.1, seat: 0, ow: 0.16 },
        { amp: 0.78, w: 0.24, p: 4.2, seat: -1, ow: 0.27 }
    ];

    marks.forEach(function (el) {
        const size = Math.round(el.getBoundingClientRect().width);
        if (!size) return;

        const canvas = el.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        const dpr = Math.min(2, devicePixelRatio || 1);
        const c = size / 2;
        const reach = size * 0.30;
        let t = Math.random() * 40;
        let hover = 0;
        let want = 0;

        canvas.width = size * dpr;
        canvas.height = size * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.lineCap = 'round';
        ctx.lineWidth = 2;

        function frame() {
            t += 0.004;
            hover += (want - hover) * 0.09;

            ctx.clearRect(0, 0, size, size);
            ctx.strokeStyle = 'rgba(242, 242, 239, ' + (0.82 + hover * 0.18) + ')';

            LINES.forEach(function (l) {
                const drift = Math.sin(t * l.w + l.p) * l.amp;
                const a = drift + (DIAGONAL - drift) * hover;
                const wander = l.seat * size * 0.15 + Math.sin(t * l.ow + l.p) * size * 0.06;
                const o = wander + (l.seat * size * 0.19 - wander) * hover;

                const cx = c - Math.sin(a) * o;
                const cy = c + Math.cos(a) * o;
                const dx = Math.cos(a) * reach;
                const dy = Math.sin(a) * reach;

                ctx.beginPath();
                ctx.moveTo(cx - dx, cy - dy);
                ctx.lineTo(cx + dx, cy + dy);
                ctx.stroke();
            });

            if (!still) requestAnimationFrame(frame);
        }

        el.addEventListener('pointerenter', function () { want = 1; });
        el.addEventListener('pointerleave', function () { want = 0; });
        el.addEventListener('focus', function () { want = 1; });
        el.addEventListener('blur', function () { want = 0; });

        frame();
    });
})();
