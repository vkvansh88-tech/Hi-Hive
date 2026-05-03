// --- FORGOT PASSWORD MODAL LOGIC ---

const modal = document.getElementById('forgotModal');
const forgotLink = document.querySelector('.forgot-link');
const closeBtn = document.getElementById('closeModal');
const forgotForm = document.getElementById('forgotForm');
const resetContent = document.getElementById('resetContent');
const successContent = document.getElementById('successContent');

// Function to open modal
forgotLink.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent page refresh
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
});

// Function to close modal
function closeForgotModal() {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        // Reset contents for next time
        resetContent.style.display = 'block';
        successContent.style.display = 'none';
        forgotForm.reset();
    }, 300);
}

closeBtn.addEventListener('click', closeForgotModal);

// Close if clicking outside the card
window.addEventListener('click', (e) => {
    if (e.target === modal) closeForgotModal();
});

// Form Submission Simulation
forgotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('resetEmail').value;

    if (email) {
        // Change button to loading state
        const btn = forgotForm.querySelector('button');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        setTimeout(() => {
            resetContent.style.display = 'none';
            successContent.style.display = 'block';
        }, 1500);
    }
});