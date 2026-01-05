document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Inquiry Sent! Our lead engineer will contact you shortly.");
    e.target.reset();
});

// Smooth scroll reveal logic
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.service-box, .project-card');
    reveals.forEach(el => {
        let windowHeight = window.innerHeight;
        let revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
            el.style.opacity = "1";
        }
    });
});