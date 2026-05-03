// 1. DATA CONFIGURATION: Mapping Names to your specific Avatar IDs
const avatarMap = {
    "Aarav": 11, "Priya": 5, "Rohan": 12, "Ananya": 9, "Kabir": 13,
    "Meera": 19, "Arjun": 14, "Isha": 2, "Siddharth": 1, "Zoya": 44,
    "Vikram": 18, "Sanya": 10, "Karan": 33, "Diya": 38, "Rishi": 7,
    "Tara": 21, "Aditya": 22, "Nisha": 39, "Varun": 51, "Riya": 26
};

// 2. UNIQUE DATABASE FOR 20 PERSONS
const chats = {
    "Aarav": [
        { type: "received", text: "Hey! Did you finish the glassmorphism login box?" },
        { type: "sent", text: "Almost! Just tweaking the background blur." }
    ],
    "Priya": [
        { type: "received", text: "The gold #b5a36a really pops against the cream." },
        { type: "received", text: "Should we use it for the buttons too?" }
    ],
    "Rohan": [
        { type: "received", text: "Check the specs for the Lenovo Legion 5i. Is it Gen 10?" },
        { type: "sent", text: "Yeah, Gen 10 for sure. It's a beast." }
    ],
    "Ananya": [
        { type: "received", text: "Sent the Peerlance logo assets. Check your mail! 📎" },
        { type: "sent", text: "Got them. They look super professional." }
    ],
    "Kabir": [
        { type: "received", text: "Are you coming to the college hackathon tomorrow?" },
        { type: "received", text: "We need a frontend lead." }
    ],
    "Meera": [
        { type: "received", text: "Good morning! ☀️ Don't forget the Vastu tips for your study desk." },
        { type: "sent", text: "Thanks for the reminder, Meera!" }
    ],
    "Arjun": [
        { type: "received", text: "Project Hi-Hive is going viral on campus!" },
        { type: "received", text: "When are we launching the beta?" }
    ],
    "Isha": [
        { type: "received", text: "See you at the hive. Bring your laptop! 💻" },
        { type: "sent", text: "Sure, see you in 10." }
    ],
    "Siddharth": [
        { type: "received", text: "Did you see the gold prices today? Market is crazy." },
        { type: "sent", text: "I know, international conflicts are driving it up." }
    ],
    "Zoya": [
        { type: "received", text: "The sidebar icons are so clean. Great job." },
        { type: "received", text: "Maybe make the hover effect slightly faster?" }
    ],
    "Vikram": [
        { type: "received", text: "Is the permanent license application done?" },
        { type: "sent", text: "Applying this week, the 30-day wait is finally over." }
    ],
    "Sanya": [
        { type: "received", text: "Let's grab coffee at the cafeteria at 4." },
        { type: "sent", text: "I'm in. Need a break from coding anyway." }
    ],
    "Karan": [
        { type: "received", text: "Can you review my JS validation logic? It's buggy." },
        { type: "received", text: "It keeps throwing errors on empty fields." }
    ],
    "Diya": [
        { type: "received", text: "The animation on the signup card is butter smooth." },
        { type: "sent", text: "Thanks Diya! Worked hard on those transitions." }
    ],
    "Rishi": [
        { type: "received", text: "Check the group chat. We are planning a trip to Patran." },
        { type: "sent", text: "Sounds fun, let me check." }
    ],
    "Tara": [
        { type: "received", text: "Happy Birthday! 🎂 Hope you have a great one." },
        { type: "sent", text: "Thank you so much, Tara!" }
    ],
    "Aditya": [
        { type: "received", text: "Meeting in 5 mins. Are you ready with the demo?" },
        { type: "received", text: "The principal is joining today." }
    ],
    "Nisha": [
        { type: "received", text: "I'll send the file for the ICICI rewards structure now." },
        { type: "sent", text: "Perfect, I need to check those 3337 points." }
    ],
    "Varun": [
        { type: "received", text: "Great job on Peerlance! The freelancer flow is solid." },
        { type: "received", text: "Let's pitch it to the incubation center." }
    ],
    "Riya": [
        { type: "received", text: "Are we still on for the movie today?" },
        { type: "sent", text: "Yeah, let's meet at 6." }
    ]
};

// 3. APP STATE
let currentChat = "Aarav";
let searchTerm = "";

// 4. RENDER CONTACT LIST (With Search Logic and Correct Avatars)
function renderContacts() {
    const list = document.getElementById("contactList");
    list.innerHTML = "";

    const filteredNames = Object.keys(chats).filter(name =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredNames.length === 0) {
        list.innerHTML = `<p style="text-align:center; padding:20px; opacity:0.5; font-size:0.9rem;">No result found...</p>`;
        return;
    }

    filteredNames.forEach((name) => {
        const activeClass = name === currentChat ? "active" : "";
        const history = chats[name];
        const lastMsg = history[history.length - 1].text;
        const imgId = avatarMap[name]; // Get the specific ID from your updated map

        list.innerHTML += `
            <div class="contact ${activeClass}" onclick="selectChat('${name}', ${imgId})">
                <img src="https://i.pravatar.cc/40?img=${imgId}" alt="${name}">
                <div class="contact-info">
                    <h4>${name}</h4>
                    <p>${lastMsg}</p>
                </div>
                <span class="time">${Math.floor(Math.random() * 59)}m</span>
            </div>
        `;
    });
}

// 5. SEARCH LOGIC
function filterContacts() {
    const searchInput = document.getElementById("contactSearch");
    searchTerm = searchInput.value;
    renderContacts();
}

// 6. SELECT A CHAT
function selectChat(name, imgId) {
    currentChat = name;

    // Update Header
    document.getElementById("chatName").innerText = name;
    document.getElementById("chatAvatar").src = `https://i.pravatar.cc/40?img=${imgId}`;

    // UI Cleanup
    document.getElementById("chatMenu").classList.remove("open");

    renderContacts();
    renderMessages();
}

// 7. RENDER MESSAGES (Updated to handle images)
function renderMessages() {
    const msgArea = document.getElementById("messages");
    msgArea.innerHTML = "";

    if (chats[currentChat]) {
        chats[currentChat].forEach(m => {
            const msgDiv = document.createElement("div");
            msgDiv.className = `message ${m.type}`;

            // Check content type BEFORE rendering
            if (m.image) {
                const img = document.createElement("img");
                img.src = m.image;
                img.style.maxWidth = "200px";
                img.style.borderRadius = "12px";
                msgDiv.appendChild(img);
            } else if (m.audio) {
                const audio = document.createElement("audio");
                audio.controls = true;
                audio.src = m.audio;
                msgDiv.appendChild(audio);
            } else {
                // Only render text if it exists
                msgDiv.innerText = m.text;
            }
            msgArea.appendChild(msgDiv);
        });
    }
    msgArea.scrollTop = msgArea.scrollHeight;
}

// 8. SEND MESSAGE
function sendMessage() {
    const input = document.getElementById("msgInput");
    const text = input.value.trim();

    // Prevent sending empty messages
    if (text === "") return;

    // 1. Push to the data object
    if (!chats[currentChat]) chats[currentChat] = []; // Safety check
    chats[currentChat].push({ type: "sent", text: text });

    // 2. Clear the input and focus back on it
    input.value = "";
    input.focus();

    // 3. Update the UI
    renderMessages();
    renderContacts();
}

// 9. KEYBOARD HANDLING
function handleKey(e) {
    // "Enter" key code check
    if (e.key === "Enter") {
        e.preventDefault(); // Prevents a newline in the input
        sendMessage();
    }
}
// Close menu click outside
window.onclick = function (event) {
    if (!event.target.closest('.chat-actions')) {
        const menu = document.getElementById("chatMenu");
        if (menu) menu.classList.remove("open");
    }
}

// 10. INITIALIZE
window.onload = () => {
    renderContacts();
    renderMessages();
};

function openVideoCall() {
    // currentChat is the name, avatarMap[currentChat] is the ID
    const name = currentChat;
    const imgId = avatarMap[name];

    window.open(
        `videocall.html?name=${encodeURIComponent(name)}&imgId=${imgId}`,
        "_blank",
        "width=900,height=650,top=50,left=50"
    );
}
function startVideoCall(name, imgId) {

    window.open(
        `videocall.html?name=${encodeURIComponent(name)}&imgId=${imgId}`,
        "_blank",
        "width=900,height=650,top=50,left=50"
    );
}
function launchVoiceCall() {
    // Uses your existing state variables
    const name = currentChat;
    const imgId = avatarMap[name];

    window.open(
        `voicecall.html?name=${encodeURIComponent(name)}&imgId=${imgId}`,
        "_blank",
        "width=450,height=600,top=100,left=100"
    );
}
// Inside your existing toggleRecording function, modify onstop:
mediaRecorder.onstop = () => {
    let blob = new Blob(audioChunks, { type: "audio/mp3" });
    let url = URL.createObjectURL(blob);

    // FIX: Push object with 'audio' key
    chats[currentChat].push({ type: "sent", audio: url });

    // Re-render
    renderMessages();
    renderContacts();
};

function sendMediaMessage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Push object with 'image' key, NOT just the string
            chats[currentChat].push({ type: "sent", image: e.target.result });
            renderMessages();
            renderContacts();
        };
        reader.readAsDataURL(input.files[0]);
    }
}
// Updated toggleMenu
function toggleMenu(event) {
    // Stop the click from bubbling up to the window listener
    if (event) event.stopPropagation();

    const menu = document.getElementById("chatMenu");
    menu.classList.toggle("open");
}

// Updated window click listener
window.onclick = function (event) {
    // Only close if the click is NOT inside the menu
    const menu = document.getElementById("chatMenu");
    const actions = document.querySelector(".chat-actions");

    if (menu && !actions.contains(event.target)) {
        menu.classList.remove("open");
    }
};
function sendAudioMessage(url) {
    chats[currentChat].push({ type: "sent", audio: url });
    renderMessages();
    renderContacts();
}