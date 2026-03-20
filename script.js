document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const uName = params.get("name") || "Friend";

    const target = document.getElementById("targetName");
    if (target) {
        target.innerText = uName;
        gsap.from(".wish-content", { duration: 1, y: 30, opacity: 0, ease: "back.out" });
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }

    const startBtn = document.getElementById("startBtn");
    if (startBtn) {
        startBtn.onclick = () => {
            const val = document.getElementById("nameInput").value.trim();
            if (val) window.location.href = `wish.html?name=${encodeURIComponent(val)}`;
            else gsap.to("#nameInput", { x: 10, repeat: 5, yoyo: true, duration: 0.05 });
        };
    }

    const modal = document.getElementById("nameModal");
    const openEd = document.getElementById("openEditor");
    const apply = document.getElementById("applyName");

    if (openEd) openEd.onclick = () => modal.style.display = "flex";
    if (document.getElementById("closeModal")) {
        document.getElementById("closeModal").onclick = () => modal.style.display = "none";
    }

    if (apply) {
        apply.onclick = () => {
            const newN = document.getElementById("userEditName").value.trim();
            if (newN) {
                document.getElementById("targetName").style.display = "none";
                document.getElementById("wish-title").innerText = "Eid-ul-Fitr Mubarak";
                document.getElementById("senderName").innerText = newN;
                document.getElementById("tag-text").innerText = "WISHES FROM";
                modal.style.display = "none";
                openEd.style.display = "none";
                document.getElementById("downloadBtn").style.display = "block";
                confetti({ particleCount: 100, colors: ['#ffd700', '#ffffff'] });
            }
        };
    }

    // THE ULTIMATE BOX-REMOVAL DOWNLOAD SCRIPT
    const dlBtn = document.getElementById("downloadBtn");
    if (dlBtn) {
        dlBtn.onclick = () => {
            const area = document.getElementById("capture-area");
            dlBtn.innerText = "Saving...";

            html2canvas(area, {
                useCORS: true,
                backgroundColor: "#020617",
                scale: 3,
                logging: false,
                onclone: (clonedDoc) => {
                    // Forcefully change gradient to Solid Gold in the image clone to prevent the black boxes
                    const rainbowTexts = clonedDoc.querySelectorAll('.rainbow-text, .rainbow-text-alt');
                    rainbowTexts.forEach(t => {
                        t.style.background = "none";
                        t.style.webkitBackgroundClip = "unset";
                        t.style.backgroundClip = "unset";
                        t.style.webkitTextFillColor = "#d4af37"; // Solid gold for the pic
                        t.style.color = "#d4af37";
                    });
                }
            }).then(canvas => {
                const link = document.createElement('a');
                link.download = `Eid_Card_by_Muhammad_Aamir.png`;
                link.href = canvas.toDataURL("image/png");
                link.click();
                dlBtn.innerText = "Download 📥";
            });
        };
    }
});