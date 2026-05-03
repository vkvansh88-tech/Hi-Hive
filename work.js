// 1. DATA: 5 Workspaces
const workData = {
    "Office Group": { imgId: 12, msgs: [
        { type: "received", text: "Meeting at 4 PM" },
        { type: "sent", text: "Noted 👍" }
    ]},
    "Ananya": { imgId: 48, msgs: [
        { type: "received", text: "I sent the final UI assets 📎" },
        { type: "sent", text: "Checking them now." }
    ]},
    "Arjun": { imgId: 7, msgs: [
        { type: "received", text: "Project Hi-Hive is finalized." },
        { type: "sent", text: "Excellent news!" }
    ]},
    "Manager": { imgId: 18, msgs: [
        { type: "received", text: "Review the quarterly report." },
        { type: "sent", text: "I will have it ready by EOD." }
    ]},
    "HR Team": { imgId: 25, msgs: [
        { type: "received", text: "Update your profile info." },
        { type: "sent", text: "Doing it right away." }
    ]}
};

let currentChat = "Office Group";

// 2. RENDER WORK LIST (Sidebar)
function renderWorkList(filter = "") {
    const list = document.getElementById("workList");
    if (!list) return;
    list.innerHTML = "";

    Object.keys(workData).forEach(name => {
        if (name.toLowerCase().includes(filter.toLowerCase())) {
            const active = name === currentChat ? 'active' : '';
            const data = workData[name];
            const lastMsg = data.msgs[data.msgs.length - 1];
            const snippet = lastMsg.audio ? "🎤 Voice Update" : (lastMsg.image ? "🖼️ Image" : lastMsg.text);

            list.innerHTML += `
                <div class="contact ${active}" onclick="selectWork('${name}')">
                    <img src="https://i.pravatar.cc/40?img=${data.imgId}">
                    <div class="contact-info">
                        <h4>${name}</h4>
                        <p>${snippet}</p>
                    </div>
                </div>`;
        }
    });
}

// 3. SELECT & RENDER
function selectWork(name) {
    currentChat = name;
    document.getElementById("chatName").innerText = name;
    document.getElementById("chatAvatar").src = `https://i.pravatar.cc/40?img=${workData[name].imgId}`;
    renderWorkList();
    renderMessages();
}

function renderMessages() {
    const box = document.getElementById("messages");
    if (!box) return;
    box.innerHTML = "";
    
    workData[currentChat].msgs.forEach(msg => {
        const div = document.createElement("div");
        div.className = "message " + msg.type;
        
        if (msg.audio) {
            const audio = document.createElement("audio");
            audio.controls = true; audio.src = msg.audio;
            div.appendChild(audio);
        } else if (msg.image) {
            const img = document.createElement("img");
            img.src = msg.image; 
            img.style.maxWidth = "200px";
            img.style.borderRadius = "12px";
            div.appendChild(img);
        } else {
            div.innerText = msg.text;
        }
        box.appendChild(div);
    });
    box.scrollTop = box.scrollHeight;
}

// 4. MESSAGING
function sendMessage() {
    const input = document.getElementById("msgInput");
    if (!input.value.trim()) return;
    
    workData[currentChat].msgs.push({type: "sent", text: input.value});
    input.value = "";
    renderMessages();
    renderWorkList();
}

// 5. BRIDGE: This function is called by voicerecording.js
function sendAudioMessage(url) {
    workData[currentChat].msgs.push({type: "sent", audio: url});
    renderMessages();
    renderWorkList();
}

// 6. MEDIA UPLOAD
document.getElementById("fileInput").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(event) {
        workData[currentChat].msgs.push({type: "sent", image: event.target.result});
        renderMessages();
        renderWorkList();
    };
    reader.readAsDataURL(file);
});

// 7. UTILITIES
function handleKey(e) { if(e.key === "Enter") sendMessage(); }
function toggleMenu() { document.getElementById("chatMenu").classList.toggle("open"); }
function openVideoCall() { window.open(`videocall.html?name=${currentChat}&imgId=${workData[currentChat].imgId}`, "_blank", "width=900,height=650"); }
function openVoiceCall() { window.open(`voicecall.html?name=${currentChat}&imgId=${workData[currentChat].imgId}`, "_blank", "width=400,height=600"); }
function filterWork() { renderWorkList(document.getElementById("workSearch").value); }

window.onload = () => {
    selectWork(currentChat);
};