document.addEventListener("DOMContentLoaded", () => {
    // 1. Particle Background Logic
    const canvas = document.getElementById("bg-canvas") || document.getElementById("bg-canvas-wish");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        let particles = [];
        for (let i = 0; i < 40; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 1.5,
                speed: Math.random() * 0.4 + 0.1
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(212, 175, 55, 0.4)";
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                p.y -= p.speed;
                if (p.y < 0) p.y = canvas.height;
            });
            requestAnimationFrame(animate);
        }
        animate();
    }

    // 2. Page Specific Logic
    const startBtn = document.getElementById("startBtn");
    if (startBtn) {
        gsap.from(".animate-entry", { duration: 1.2, y: 30, opacity: 0, ease: "power3.out" });
        startBtn.addEventListener("click", () => {
            const name = document.getElementById("nameInput").value.trim();
            if (name) {
                window.location.href = `wish.html?name=${encodeURIComponent(name)}`;
            } else {
                gsap.to("#nameInput", { x: 10, repeat: 5, yoyo: true, duration: 0.05 });
            }
        });
    }

    const targetName = document.getElementById("targetName");
    if (targetName) {
        const params = new URLSearchParams(window.location.search);
        targetName.innerText = params.get("name") || "Friend";

        const tl = gsap.timeline();
        tl.from(".content-container", { duration: 1, scale: 0.9, opacity: 0, ease: "power2.out" })
          .from(".anim-reveal", { y: 30, opacity: 0, stagger: 0.2, duration: 0.8, ease: "back.out(1.5)" }, "-=0.4");

        if (typeof confetti === "function") {
            setTimeout(() => {
                confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#d4af37', '#ffffff'] });
            }, 500);
        }
    }
});