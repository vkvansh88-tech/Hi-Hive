const callData = [
    { name: "Aarav", imgId: 11, time: "2m ago", status: "incoming" },
    { name: "Priya", imgId: 5, time: "15m ago", status: "missed" },
    { name: "Rohan", imgId: 12, time: "1h ago", status: "incoming" },
    { name: "Ananya", imgId: 9, time: "3h ago", status: "incoming" },
    { name: "Kabir", imgId: 13, time: "4h ago", status: "missed" },
    { name: "Meera", imgId: 19, time: "Yesterday", status: "incoming" },
    { name: "Arjun", imgId: 14, time: "Yesterday", status: "incoming" },
    { name: "Isha", imgId: 2, time: "Yesterday", status: "missed" },
    { name: "Siddharth", imgId: 1, time: "2 days ago", status: "incoming" },
    { name: "Zoya", imgId: 44, time: "2 days ago", status: "incoming" },
    { name: "Vikram", imgId: 18, time: "3 days ago", status: "missed" },
    { name: "Sanya", imgId: 10, time: "3 days ago", status: "incoming" },
    { name: "Karan", imgId: 33, time: "4 days ago", status: "incoming" },
    { name: "Diya", imgId: 38, time: "4 days ago", status: "incoming" },
    { name: "Rishi", imgId: 7, time: "5 days ago", status: "missed" },
    { name: "Tara", imgId: 21, time: "1 week ago", status: "incoming" },
    { name: "Aditya", imgId: 22, time: "1 week ago", status: "incoming" },
    { name: "Nisha", imgId: 39, time: "1 week ago", status: "missed" },
    { name: "Varun", imgId: 51, time: "2 weeks ago", status: "incoming" },
    { name: "Riya", imgId: 26, time: "2 weeks ago", status: "incoming" }
];

function renderCalls(filterText = "") {
    const list = document.getElementById("callList");
    list.innerHTML = "";

    const filtered = callData.filter(call =>
        call.name.toLowerCase().includes(filterText.toLowerCase())
    );

    filtered.forEach(call => {
        const icon = call.status === "incoming"
            ? '<i class="fa-solid fa-arrow-down-left status-incoming"></i>'
            : '<i class="fa-solid fa-arrow-up-right status-missed"></i>';

        list.innerHTML += `
            <div class="contact">
                <img src="https://i.pravatar.cc/40?img=${call.imgId}" alt="${call.name}">
                <div class="contact-info">
                    <h4>${call.name}</h4>
                    <div class="call-meta">
                        ${icon}
                        <span>${call.status === "incoming" ? "Received" : "Missed"} • ${call.time}</span>
                    </div>
                </div>
                <div class="call-actions">
                    <button onclick="startVoiceCall('${call.name}', ${call.imgId})">
                        <i class="fa-solid fa-phone"></i>
                    </button>
                    <button onclick="startVideoCall('${call.name}', ${call.imgId})">
                        <i class="fa-solid fa-video"></i>
                    </button>
                </div>
            </div>
        `;
    });
}

function filterCalls() {
    const term = document.getElementById("callSearch").value;
    renderCalls(term);
}

function startVoiceCall(name, imgId) {
    window.open(`voicecall.html?name=${encodeURIComponent(name)}&imgId=${imgId}`, "_blank", "width=450,height=600,top=100,left=100");
}

function startVideoCall(name, imgId) {
    window.open(`videocall.html?name=${encodeURIComponent(name)}&imgId=${imgId}`, "_blank", "width=900,height=650,top=50,left=50");
}

window.onload = () => renderCalls();