const friendData = {
    "Aarav": { imgId: 11, messages: [{ type: "received", text: "Hey! Did you finish the demo?" }] },
    "Priya": { imgId: 5, messages: [{ type: "received", text: "The gold theme looks great." }] },
    "Rohan": { imgId: 12, messages: [{ type: "received", text: "Check the Legion specs!" }] },
    "Ananya": { imgId: 9, messages: [{ type: "received", text: "Logo is ready! 📎" }] },
    "Kabir": { imgId: 13, messages: [{ type: "received", text: "Call me later." }] },
    "Meera": { imgId: 19, messages: [{ type: "received", text: "Good morning ☀️" }] }
};

let currentChat = "Aarav";

/* ---------------- FRIEND LIST ---------------- */
function renderFriendList(filter = "") {
    const list = document.getElementById("friendList");
    if (!list) return;

    list.innerHTML = "";

    Object.keys(friendData).forEach(name => {
        if (name.toLowerCase().includes(filter.toLowerCase())) {
            const friend = friendData[name];
            const lastMsg = friend.messages[friend.messages.length - 1]?.text || "Media";

            list.innerHTML += `
                <div class="contact ${name === currentChat ? 'active' : ''}" onclick="selectFriend('${name}')">
                    <img src="https://i.pravatar.cc/40?img=${friend.imgId}">
                    <div class="contact-info">
                        <h4>${name}</h4>
                        <p>${lastMsg}</p>
                    </div>
                </div>`;
        }
    });
}

/* ---------------- MESSAGES ---------------- */
function renderMessages() {
    const box = document.getElementById("messages");
    if (!box) return;

    box.innerHTML = "";

    friendData[currentChat].messages.forEach(msg => {
        const div = document.createElement("div");
        div.className = `message ${msg.type}`;

        if (msg.audio) {
            const audio = document.createElement("audio");
            audio.controls = true;
            audio.src = msg.audio;
            div.appendChild(audio);

        } else if (msg.image) {
            const img = document.createElement("img");
            img.src = msg.image;
            img.style.maxWidth = "200px";
            div.appendChild(img);

        } else {
            div.innerText = msg.text;
        }

        box.appendChild(div);
    });

    // auto scroll
    setTimeout(() => {
        box.scrollTop = box.scrollHeight;
    }, 50);
}

/* ---------------- SEND MESSAGE ---------------- */
function sendMessage() {
    const input = document.getElementById("msgInput");
    if (!input) return;

    const text = input.value.trim();
    if (text === "") return;

    if (!friendData[currentChat].messages) {
        friendData[currentChat].messages = [];
    }

    friendData[currentChat].messages.push({
        type: "sent",
        text: text
    });

    input.value = "";

    renderMessages();
    renderFriendList();
}

/* ---------------- SELECT FRIEND ---------------- */
function selectFriend(name) {
    currentChat = name;

    const nameEl = document.getElementById("chatName");
    const avatarEl = document.getElementById("chatAvatar");

    if (nameEl) nameEl.innerText = name;
    if (avatarEl) avatarEl.src = `https://i.pravatar.cc/40?img=${friendData[name].imgId}`;

    renderFriendList();
    renderMessages();
}

/* ---------------- CALL FEATURES ---------------- */
function openVideoCall() {
    const id = friendData[currentChat].imgId;
    window.open(
        `videocall.html?name=${encodeURIComponent(currentChat)}&imgId=${id}`,
        "_blank",
        "width=900,height=650"
    );
}

function openVoiceCall() {
    const id = friendData[currentChat].imgId;
    window.open(
        `voicecall.html?name=${encodeURIComponent(currentChat)}&imgId=${id}`,
        "_blank",
        "width=450,height=600"
    );
}

/* ---------------- KEY HANDLER ---------------- */
function handleKey(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }
}

/* ---------------- SEARCH ---------------- */
function filterFriends() {
    const input = document.getElementById("friendSearch");
    renderFriendList(input ? input.value : "");
}

/* ---------------- MENU ---------------- */
function toggleMenu() {
    const menu = document.getElementById("chatMenu");
    if (menu) menu.classList.toggle("open");
}

/* ---------------- INIT ---------------- */
document.addEventListener("DOMContentLoaded", () => {
    renderFriendList();
    selectFriend("Aarav");

    // SAFEST Enter key handling (no HTML dependency)
    const input = document.getElementById("msgInput");
    if (input) {
        input.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});

function sendAudioMessage(url) {
    // 1. Save the audio URL to the current friend's data
    friendData[currentChat].messages.push({ 
        type: "sent", 
        audio: url 
    });
    
    // 2. Refresh the UI immediately
    renderMessages();
    renderFriendList(); // Refreshes the "Voice Note" snippet in sidebar
    
    console.log("Audio sent to:", currentChat);
}


/* ---------------- SEND MEDIA MESSAGE ---------------- */
function sendMediaMessage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // 1. Push the image data to your friendData object
            friendData[currentChat].messages.push({ 
                type: "sent", 
                image: e.target.result 
            });
            
            // 2. Refresh the UI
            renderMessages();
            renderFriendList(); // Updates the "Media" text in sidebar
        };
        
        // 3. Convert image to Base64 and trigger onload
        reader.readAsDataURL(input.files[0]);
    }
}