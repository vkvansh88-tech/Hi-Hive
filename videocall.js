let stream;

// 1. GET DATA FROM URL
const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get('name') || "User";
const imgId = urlParams.get('imgId') || "1"; 

// 2. UPDATE UI ACCORDINGLY
document.getElementById("username").innerText = userName;
document.getElementById("avatar").src = `https://i.pravatar.cc/150?img=${imgId}`;

// 3. INITIALIZE CAMERA
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(s => {
        stream = s;
        document.getElementById("remoteVideo").srcObject = stream;
        
        // Optional: Update status once connected
        const status = document.getElementById("callStatus");
        if(status) status.innerText = "00:01"; 
    })
    .catch(err => {
        console.error("Camera access denied", err);
        const status = document.getElementById("callStatus");
        if(status) status.innerText = "Camera Error";
    });

// --- TOGGLE FUNCTIONS ---
function toggleMic() {
    let audioTrack = stream.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    const btn = document.getElementById("micBtn");
    btn.classList.toggle("btn-off");
    btn.innerHTML = audioTrack.enabled ? '<i class="fas fa-microphone"></i>' : '<i class="fas fa-microphone-slash"></i>';
}

function toggleCamera() {
    let videoTrack = stream.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    const btn = document.getElementById("camBtn");
    btn.classList.toggle("btn-off");
    btn.innerHTML = videoTrack.enabled ? '<i class="fas fa-video"></i>' : '<i class="fas fa-video-slash"></i>';
}

function toggleSpeaker() {
    alert("Speaker volume adjusted.");
}

function endCall() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    window.close();
}