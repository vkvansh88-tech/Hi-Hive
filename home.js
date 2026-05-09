// Mobile Navbar Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Auto-Typing Hero Interaction
const heroChat = document.getElementById('heroChat');
const chatScript = [
    { text: "Yo! Welcome to the Hi-Hive.", side: "received" },
    { text: "Bro! this is the best chat app, ever seen", side: "sent" },
    { text: "Yes the theme and colors are awesome too!", side: "received" },
    { text: "Love the gold accents!", side: "sent" }
];

let i = 0;
function playChat() {
    if (i < chatScript.length) {
        const msg = chatScript[i];
        const div = document.createElement('div');
        div.className = `bubble ${msg.side}`;
        div.innerText = msg.text;
        
        div.style.opacity = "0";
        div.style.transform = "translateY(10px)";
        div.style.transition = "0.5s ease all";
        
        heroChat.appendChild(div);
        
        setTimeout(() => {
            div.style.opacity = "1";
            div.style.transform = "translateY(0)";
        }, 50);

        i++;
        setTimeout(playChat, 200);
    }
}

window.onload = () => {
    playChat();
};

// Scroll Reveal Effect
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .step').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "0.8s ease out";
    observer.observe(el);
});
