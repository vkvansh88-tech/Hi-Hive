// 1. DATA: 5 Groups
const groupData = {
    "G-14 AIML": { imgId: 10, msgs: [
        {type:"received", text: "Rahul: Assignment submit today!"},
        {type:"sent", text: "Working on it"}
    ]},
    "Friends Forever": { imgId: 11, msgs: [
        {type:"received", text: "Kabir: Party kab? 😂"},
        {type:"sent", text: "Soon bro 🔥"}
    ]},
    "Office Team": { imgId: 12, msgs: [
        {type:"received", text: "Manager: Meeting at 4PM"},
        {type:"sent", text: "Noted 👍"}
    ]},
    "Design Squad": { imgId: 13, msgs: [
        {type:"received", text: "Meera: Check the new logo."},
        {type:"sent", text: "Looks clean!"}
    ]},
    "Hackathon 2026": { imgId: 14, msgs: [
        {type:"received", text: "Aditya: Finalizing the PPT."},
        {type:"sent", text: "I'll handle the backend."}
    ]}
};

let currentChat = "G-14 AIML";

// 2. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    selectGroup(currentChat);
});

// 3. RENDER GROUP LIST (Sidebar)
function renderGroupList(filter = "") {
    const list = document.getElementById("groupList");
    if (!list) return;
    list.innerHTML = "";
    
    Object.keys(groupData).forEach(name => {
        if (name.toLowerCase().includes(filter.toLowerCase())) {
            const active = name === currentChat ? 'active' : '';
            const group = groupData[name];
            const lastMsg = group.msgs[group.msgs.length - 1];
            
            // Sidebar snippet logic
            let snippet = lastMsg.audio ? "🎤 Voice Note" : (lastMsg.image ? "🖼️ Media" : lastMsg.text);
            
            list.innerHTML += `
                <div class="contact ${active}" onclick="selectGroup('${name}')">
                    <img src="https://i.pravatar.cc/40?img=${group.imgId}">
                    <div class="contact-info">
                        <h4>${name}</h4>
                        <p>${snippet}</p>
                    </div>
                </div>`;
        }
    });
}

// 4. SELECT GROUP
function selectGroup(name) {
    currentChat = name;
    document.getElementById("groupName").innerText = name;
    document.getElementById("groupAvatar").src = `https://i.pravatar.cc/40?img=${groupData[name].imgId}`;
    
    renderGroupList();
    renderMessages();
}

// 5. RENDER MESSAGES (Supports Text, Audio, Images)
function renderMessages() {
    const box = document.getElementById("messages");
    if (!box) return;
    box.innerHTML = "";

    groupData[currentChat].msgs.forEach(msg => {
        const div = document.createElement("div");
        div.className = "message " + msg.type;
        
        if (msg.audio) {
            const audio = document.createElement("audio");
            audio.controls = true; 
            audio.src = msg.audio;
            div.appendChild(audio);
        } else if (msg.image) {
            const img = document.createElement("img");
            img.src = msg.image; 
            img.style.maxWidth = "200px";
            img.style.borderRadius = "10px";
            div.appendChild(img);
        } else {
            div.innerText = msg.text;
        }
        box.appendChild(div);
    });
    box.scrollTop = box.scrollHeight;
}

// 6. SEND TEXT MESSAGE
function sendMessage() {
    const input = document.getElementById("msgInput");
    if (!input || !input.value.trim()) return;
    
    groupData[currentChat].msgs.push({type: "sent", text: input.value.trim()});
    input.value = "";
    
    renderMessages();
    renderGroupList();
}

// 7. BRIDGE: Called by voicerecording.js
function sendAudioMessage(url) {
    groupData[currentChat].msgs.push({type: "sent", audio: url});
    renderMessages();
    renderGroupList();
}

// 8. MEDIA UPLOAD (Triggered by fileInput change)
document.getElementById("fileInput").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        groupData[currentChat].msgs.push({type: "sent", image: event.target.result});
        renderMessages();
        renderGroupList();
    };
    reader.readAsDataURL(file);
});

// 9. UTILITIES
function handleKey(e) { if(e.key === "Enter") sendMessage(); }
function toggleMenu() { document.getElementById("chatMenu").classList.toggle("open"); }
function filterGroups() { renderGroupList(document.getElementById("groupSearch").value); }

function openVideoCall() {
    window.open(`videocall.html?name=${encodeURIComponent(currentChat)}&imgId=${groupData[currentChat].imgId}`, "_blank", "width=900,height=650");
}

function openVoiceCall() {
    window.open(`voicecall.html?name=${encodeURIComponent(currentChat)}&imgId=${groupData[currentChat].imgId}`, "_blank", "width=400,height=600");
}