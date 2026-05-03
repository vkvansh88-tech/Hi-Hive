document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    const loginForm = document.getElementById('loginForm');

    // 1. Password Visibility Toggle
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Toggle icon class
        eyeIcon.classList.toggle('fa-eye');
        eyeIcon.classList.toggle('fa-eye-slash');
    });

    // 2. Login Logic
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const user = document.getElementById('username').value;
        const pass = passwordInput.value;
        const loginBtn = document.querySelector('.login-btn');

        // Simple Validation Check
        if (user === "vansh" && pass === "2007") {
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loging in...';
            loginBtn.style.opacity = "0.8";
            loginBtn.disabled = true;

            setTimeout(() => {
                window.location.href = "chat.html";
            }, 1200);
        } else {
            // Visual feedback for error
            loginBtn.classList.add('shake'); // You could add a shake animation in CSS
            alert("Invalid Hive Credentials. Please try again.");
            setTimeout(() => loginBtn.classList.remove('shake'), 500);
        }
    });
});