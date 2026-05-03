// Function to open the terms modal
function openTerms() {
    document.getElementById("termsModal").style.display = "flex";
}

// Function to close the terms modal
function closeTerms() {
    document.getElementById("termsModal").style.display = "none";
}

// Function to handle acceptance
function acceptTerms() {
    alert("You accepted Hi-Hive Terms & Conditions");
    closeTerms();
}

window.onclick = function(event) {
    const modal = document.getElementById("termsModal");
    if (event.target == modal) {
        closeTerms();
    }
}