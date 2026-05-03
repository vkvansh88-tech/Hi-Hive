function editProfile() {

    let newUsername = prompt("Enter new username");
    let newBio = prompt("Enter new bio");

    if (newUsername) {
        document.getElementById("profileUsername").innerText = newUsername;
        localStorage.setItem("hihiveUsername", newUsername); // ✅ SAVE
    }

    if (newBio) {
        document.getElementById("profileBio").innerText = newBio;
        localStorage.setItem("hihiveBio", newBio); // ✅ SAVE
    }

}

function changePhoto() {
    document.getElementById("photoInput").click();
}

document.getElementById("photoInput").addEventListener("change", function () {

    let file = this.files[0];

    if (file && file.type.startsWith("image/")) {

        let reader = new FileReader();

        reader.onload = function (e) {

            let imageData = e.target.result;

            // ✅ Save only valid image data
            if (imageData.startsWith("data:image")) {
                document.getElementById("profileImage").src = imageData;
                localStorage.setItem("hihiveProfilePic", imageData);
            }

        };

        reader.readAsDataURL(file);

    } else {
        alert("Please select a valid image file.");
    }
});

function logout() {

    alert("Logged Out");

    window.location.href = "login.html";

}

window.onload = function () {

    let savedBio = localStorage.getItem("hihiveBio");
    let savedUsername = localStorage.getItem("hihiveUsername");
    let savedImage = localStorage.getItem("hihiveProfilePic");

    if (savedBio) {
        document.getElementById("profileBio").innerText = savedBio;
    }

    if (savedUsername) {
        document.getElementById("profileUsername").innerText = savedUsername;
    }

    let profileImg = document.getElementById("profileImage");

    // ✅ FIX: Validate image before using it
    if (savedImage && savedImage.startsWith("data:image")) {
        profileImg.src = savedImage;
    } else {
        profileImg.src = "user.png"; // fallback image
    }
};