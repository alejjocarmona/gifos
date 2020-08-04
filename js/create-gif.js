let backButton = document.getElementById("arrow");
video = document.getElementById("captureGif");
startCameraButton = document.getElementById("camera");
startRec = document.getElementById("startRec");
stopRec = document.getElementById("stopRec");
let recorder;
let recordedGif;

// Ir a página anterior
backButton.addEventListener("click", function () {
    window.location="index.html";
})

//permitir video
startCameraButton.addEventListener("click", function getStreamAndRecord () {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { width: 480, height: 360 }
    })
    .then((stream) => {
        video.srcObject = stream
        console.log(video);
    });
});

//GRABAR MALDI TASEA
startRec.addEventListener("click", function () {
    this.disabled = true;
    
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { width: 480, height: 360 }
    })
    .then(function(stream) {
        video.srcObject = stream;
        recorder = RecordRTC(stream, {
            type: 'gif',
            quality: 10,
            width: 480,
            height: 360,
            hidden: 240,
            frameRate: 1
        });

        recorder.startRecording();

        stopRec.disabled = false;
    });
});

stopRec.addEventListener("click", function() {
    video.srcObject = null;

    this.disabled = true;

    recorder.stopRecording(function (blob) {
        startRec.disabled = false;
    })
})