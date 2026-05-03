function openOTPModal(event) {
    event.preventDefault();
    document.getElementById('phoneModal').style.display = 'flex';
}

function closePhoneModal() {
    document.getElementById('phoneModal').style.display = 'none';
    
    // Reset the modal state for the next use
    const btn = document.getElementById('sendBtn');
    const input = document.getElementById('modalPhoneNumber');
    btn.innerText = "Register Now";
    btn.disabled = false;
    input.value = "";
}

function simulateSignup() {
    const phone = document.getElementById('modalPhoneNumber').value;
    const btn = document.getElementById('sendBtn');

    if (phone.length < 10) {
        alert("Please enter a valid 10-digit phone number");
        return;
    }

    // Visual feedback: simulate backend processing
    btn.innerText = "Processing...";
    btn.disabled = true;

    setTimeout(() => {
        // Success feedback
        alert("Success! Account created for " + phone + ".");
        
        // Simply close the modal after the alert is dismissed
        closePhoneModal();
    }, 1200);
}

// Close on outside click
window.onclick = function(event) {
    const modal = document.getElementById('phoneModal');
    if (event.target == modal) closePhoneModal();
}