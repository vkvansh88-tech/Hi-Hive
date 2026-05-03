// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const answer = btn.nextElementSibling;
        const icon = btn.querySelector('i');

        // Close others
        document.querySelectorAll('.faq-answer').forEach(ans => {
            if (ans !== answer) ans.classList.remove('show');
        });

        // Toggle current
        answer.classList.toggle('show');
        
        // Rotate Icon
        icon.style.transform = answer.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
    });
});

// Contact Form
document.getElementById('supportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const message = document.getElementById('successMessage');

    message.innerText = "Request submitted! We'll buzz you back soon.";
    message.style.color = "#b5a36a";
    message.style.marginTop = "15px";
    message.style.fontWeight = "600";

    this.reset();
    setTimeout(() => { message.innerText = ""; }, 5000);
});

// Search
document.getElementById('searchBar').addEventListener('input', function () {
    const value = this.value.toLowerCase();
    const cards = document.querySelectorAll('.support-card');

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(value) ? "block" : "none";
    });
});