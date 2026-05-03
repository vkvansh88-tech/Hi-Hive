function changeSettings(element, sectionId) {

    // move white box
    const items = document.querySelectorAll(".menu-item");
    items.forEach(item => item.classList.remove("active"));

    element.classList.add("active");

    // change content
    const sections = document.querySelectorAll(".section");
    sections.forEach(sec => sec.classList.remove("active-section"));

    document.getElementById(sectionId).classList.add("active-section");

}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}
function saveAccount() {

    let username = document.getElementById("username").value;
    let bio = document.getElementById("bio").value;

    /* Check if empty */
    if (username === "" && bio === "") {
        showTopAlert("No changes made.");
        return;
    }

    /* Save data */
    localStorage.setItem("hihiveUsername", username);
    localStorage.setItem("userBio", bio);

    /* Show success alert */
    showTopAlert("Account settings updated successfully!");

}

function deleteAccount() {

    let confirmDelete = confirm("Are you sure you want to delete your account? This action cannot be undone.");

    if (confirmDelete) {
        showTopAlert("Account deleted successfully!");

        // wait for alert animation to finish
        setTimeout(() => {
            window.location.href = "sign_up.html";
        }, 800);
    }

}


function logout() {
    let confirmLogout = confirm("Are you sure you want to log out?");

    if (confirmLogout) {
        alert("You have been logged out.");
        window.location.href = "login.html";
    }
}


function saveNotifications() {

    let newSettings = {
        enableNotif: document.getElementById("enableNotif").checked,
        messageAlert: document.getElementById("messageAlert").checked,
        groupNotif: document.getElementById("groupNotif").checked,
        previewNotif: document.getElementById("previewNotif").checked,
        soundNotif: document.getElementById("soundNotif").checked,
        dndMode: document.getElementById("dndMode").checked
    };

    let oldSettings = JSON.parse(localStorage.getItem("hihiveNotifications"));

    if (oldSettings && JSON.stringify(oldSettings) === JSON.stringify(newSettings)) {
        showTopAlert("No changes made.");
        return;
    }

    localStorage.setItem("hihiveNotifications", JSON.stringify(newSettings));

    showTopAlert("Notification settings updated successfully!");
}

/* Load saved settings */

window.addEventListener("load", function () {

    let saved = localStorage.getItem("hihiveNotifications");

    if (saved) {

        let settings = JSON.parse(saved);

        document.getElementById("enableNotif").checked = settings.enableNotif;
        document.getElementById("messageAlert").checked = settings.messageAlert;
        document.getElementById("groupNotif").checked = settings.groupNotif;
        document.getElementById("previewNotif").checked = settings.previewNotif;
        document.getElementById("soundNotif").checked = settings.soundNotif;
        document.getElementById("dndMode").checked = settings.dndMode;

    }

});


function saveChatSettings() {

    let settings = {
        enterSend: document.getElementById("enterSend").checked,
        typingIndicator: document.getElementById("typingIndicator").checked,
        readReceipts: document.getElementById("readReceipts").checked,
        autoImages: document.getElementById("autoImages").checked,
        autoVideos: document.getElementById("autoVideos").checked
    };

    localStorage.setItem("hihiveChatSettings", JSON.stringify(settings));

    alert("Chat settings saved!");

}

function backupChats() {

    alert("Your chats have been backed up successfully!");

}

function clearChats() {

    let confirmClear = confirm("Are you sure you want to delete all chats?");

    if (confirmClear) {
        localStorage.removeItem("hihiveChats");
        alert("Chat history cleared!");
    }

}

/* Load saved settings */

window.addEventListener("load", function () {

    let saved = localStorage.getItem("hihiveChatSettings");

    if (saved) {

        let settings = JSON.parse(saved);

        document.getElementById("enterSend").checked = settings.enterSend;
        document.getElementById("typingIndicator").checked = settings.typingIndicator;
        document.getElementById("readReceipts").checked = settings.readReceipts;
        document.getElementById("autoImages").checked = settings.autoImages;
        document.getElementById("autoVideos").checked = settings.autoVideos;

    }

});
function saveSecuritySettings() {

    let settings = {
        twoFactor: document.getElementById("twoFactor").checked,
        loginAlerts: document.getElementById("loginAlerts").checked,
        deviceActivity: document.getElementById("deviceActivity").checked,
        autoLogout: document.getElementById("autoLogout").checked,

    };

    localStorage.setItem("hihiveSecuritySettings", JSON.stringify(settings));

    showTopAlert("Security settings updated successfully!");

}


function logoutAllDevices() {

    let confirmLogout = confirm("Logout from all devices?");

    if (confirmLogout) {

        showTopAlert("Logged out from all devices successfully!");

        // Optional redirect after logout
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);

    }

}

/* Load saved settings */

window.addEventListener("load", function () {

    let saved = localStorage.getItem("hihiveSecuritySettings");

    if (saved) {

        let settings = JSON.parse(saved);

        document.getElementById("twoFactor").checked = settings.twoFactor;
        document.getElementById("loginAlerts").checked = settings.loginAlerts;
        document.getElementById("deviceActivity").checked = settings.deviceActivity;
        document.getElementById("autoLogout").checked = settings.autoLogout;

    }

});
function saveDataSettings() {

    let settings = {
        images: document.getElementById("dataImages").checked,
        videos: document.getElementById("dataVideos").checked,
        docs: document.getElementById("dataDocs").checked,
        lowData: document.getElementById("lowData").checked
    };

    localStorage.setItem("hihiveDataSettings", JSON.stringify(settings));

    alert("Data & Storage settings saved!");

}

function clearCache() {

    let confirmClear = confirm("Clear cached data?");

    if (confirmClear) {
        localStorage.removeItem("hihiveChats");
        alert("Cached data cleared!");
    }

}

function exportChatData() {

    alert("Your chat data export has started.");

}

function calculateStorage() {

    let used = JSON.stringify(localStorage).length / 1024;

    document.getElementById("storageUsed").innerText = used.toFixed(2) + " KB";

}

window.addEventListener("load", function () {

    let saved = localStorage.getItem("hihiveDataSettings");

    if (saved) {

        let settings = JSON.parse(saved);

        document.getElementById("dataImages").checked = settings.images;
        document.getElementById("dataVideos").checked = settings.videos;
        document.getElementById("dataDocs").checked = settings.docs;
        document.getElementById("lowData").checked = settings.lowData;

    }

    calculateStorage();

});
function saveLanguage() {

    let selectedLanguage = document.getElementById("languageSelect").value;

    localStorage.setItem("hihiveLanguage", selectedLanguage);

    alert("Language preference saved!");

}

/* Load saved language */

window.addEventListener("load", function () {

    let savedLanguage = localStorage.getItem("hihiveLanguage");

    if (savedLanguage) {

        document.getElementById("languageSelect").value = savedLanguage;

    }

});


function openPasswordPopup() {
    document.getElementById("passwordPopup").style.display = "flex";
}

function closePasswordPopup() {
    document.getElementById("passwordPopup").style.display = "none";
}

function changePassword() {

    let pass = document.getElementById("newPassword").value;
    let confirm = document.getElementById("confirmNewPassword").value;

    if (pass === "" || confirm === "") {
        alert("Please fill both fields");
        return;
    }

    if (pass !== confirm) {
        alert("Passwords do not match!");
        return;
    }

    localStorage.setItem("hihivePassword", pass);

    alert("Password changed successfully!");

    closePasswordPopup();

}
function goBack() {
    window.location.href = "chat.html";
}
function openEmailPopup() {
    document.getElementById("emailPopup").style.display = "flex";
}

function closeEmailPopup() {
    document.getElementById("emailPopup").style.display = "none";
}

function changeEmail() {

    let oldEmail = document.getElementById("oldEmail").value;
    let newEmail = document.getElementById("newEmail").value;
    let confirmEmail = document.getElementById("confirmEmail").value;

    if (oldEmail === "" || newEmail === "" || confirmEmail === "") {
        alert("Please fill all fields");
        return;
    }

    if (newEmail !== confirmEmail) {
        alert("New emails do not match!");
        return;
    }

    /* Optional: check old email (if stored) */
    let savedEmail = localStorage.getItem("hihiveEmail");

    if (savedEmail && oldEmail !== savedEmail) {
        alert("Old email is incorrect!");
        return;
    }

    /* Save new email */
    localStorage.setItem("hihiveEmail", newEmail);

    alert("Email changed successfully!");

    closeEmailPopup();

}
function showTopAlert(message) {
    let alertBox = document.getElementById("topAlert");

    alertBox.innerText = message;
    alertBox.classList.add("show");

    setTimeout(() => {
        alertBox.classList.remove("show");
    }, 2500);
}
function saveBio() {
    let bio = document.getElementById("bio").value;

    // Save to localStorage
    localStorage.setItem("userBio", bio);

    alert("Bio updated successfully!");
}