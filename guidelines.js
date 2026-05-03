document.addEventListener('DOMContentLoaded', () => {

    // Scroll Reveal Animation
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }

    window.addEventListener('scroll', reveal);
    // Trigger once on load
    reveal();

    // Subtle parallax for circles
    window.addEventListener('scroll', () => {
        const circle1 = document.querySelector('.circle-1');
        const circle2 = document.querySelector('.circle-2');
        let value = window.scrollY;

        circle1.style.top = -100 + value * 0.2 + 'px';
        circle2.style.bottom = -50 + value * 0.1 + 'px';
    });

    // Smooth scroll for internal links if added later
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});