let stream;

// 1. GET DATA FROM URL
const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get('name') || "User";
const imgId = urlParams.get('imgId') || "1"; 

// 2. UPDATE UI
document.getElementById("username").innerText = userName;
document.getElementById("avatar").src = `https://i.pravatar.cc/150?img=${imgId}`;

// 3. INITIALIZE AUDIO
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(s => {
        stream = s;
        document.getElementById("callStatus").innerText = "Voice Call • In Progress";
    })
    .catch(err => {
        console.error("Mic access denied", err);
        document.getElementById("callStatus").innerText = "Microphone Error";
    });

function toggleMic() {
    let audioTrack = stream.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    const btn = document.getElementById("micBtn");
    btn.classList.toggle("btn-off");
    btn.innerHTML = audioTrack.enabled ? '<i class="fas fa-microphone"></i>' : '<i class="fas fa-microphone-slash"></i>';
}

function toggleSpeaker() {
    alert("Speaker toggled");
}

function endCall() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    window.close();
}