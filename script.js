document.addEventListener("DOMContentLoaded", () => {
    // 1. Navigation Logic
    const startBtn = document.getElementById("startBtn");
    if (startBtn) {
        startBtn.onclick = () => {
            const val = document.getElementById("nameInput").value.trim();
            if (val) window.location.href = `wish.html?name=${encodeURIComponent(val)}`;
            else gsap.to("#nameInput", { x: 10, repeat: 5, yoyo: true, duration: 0.05 });
        };
    }

    // 2. Wish Page Logic
    const targetName = document.getElementById("targetName");
    if (targetName) {
        targetName.innerText = new URLSearchParams(window.location.search).get("name") || "Friend";
        
        // Heavy Entrance
        gsap.from(".wish-content", { duration: 1.5, scale: 0.8, opacity: 0, ease: "expo.out" });

        // Continuous Fireworks
        const celebrate = () => {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#d4af37', '#ffffff', '#ff0000'] });
        };
        celebrate();
        setInterval(celebrate, 4000); // Repeat every 4 seconds
    }
});