let mediaRecorder;
let audioChunks = [];
let isRecording = false;

async function toggleRecording() {
    const btn = document.getElementById("micBtn");

    if (!isRecording) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
            
            mediaRecorder.start();
            isRecording = true;
            btn.classList.add("recording-active");
            btn.innerHTML = '<i class="fa-solid fa-stop"></i>'; // Visual feedback

            mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
            
            mediaRecorder.onstop = () => {
                const blob = new Blob(audioChunks, { type: "audio/mp3" });
                const url = URL.createObjectURL(blob);
                
                // THE BRIDGE: 
                // This looks for a function on the current page called sendAudioMessage
                if (typeof sendAudioMessage === 'function') {
                    sendAudioMessage(url);
                } else {
                    console.error("sendAudioMessage function is missing on this page!");
                }
            };
        } catch (err) {
            alert("Microphone access denied.");
        }
    } else {
        mediaRecorder.stop();
        isRecording = false;
        btn.classList.remove("recording-active");
        btn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
    }
}