
const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");

// let SAMPLERATE = 500; 

let detectedGesture = "None"
let width = "400"
let height = "400"

let runInterval = null;

let isVideo = false;
let model = null;

const modelParams = {
    flipHorizontal: false,   // flip e.g for video  
    maxNumBoxes: 4,        // maximum number of boxes to detect
    iouThreshold: 0.4,      // ioU threshold for non-max suppression
    scoreThreshold: 0.5,    // confidence threshold for predictions.
}

// Load the model.
handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel
    updateNote.innerText = "Loaded Model!"
    // trackButton.disabled = false
    toggleVideo()
});


function startVideo() {
    handTrack.startVideo(video).then(function (status) {
        console.log("video started", status);
        if (status) {
            updateNote.innerText = "Video started. Now tracking"
            isVideo = true
            runDetection()
        } else {
            updateNote.innerText = "Please enable video"
        }
    });
}

function toggleVideo() {
    if (!isVideo) {
        updateNote.innerText = "Starting video"
        startVideo();
    } else {
        updateNote.innerText = "Stopping video"
        handTrack.stopVideo(video)
        isVideo = false;
        updateNote.innerText = "Video stopped"
    }
}



function runDetection() {
    model.detect(video).then(predictions => {
        let openhands = 0;
        let closedhands = 0;
        let pointing = 0;
        let boxes = []

        for(let p of predictions){

            if(p.label == 'open') openhands++;
            if(p.label == 'closed') closedhands++;
            if(p.label == 'point') pointing++;
            // if(p.label == 'pinch') pinching++;
            
            
        }

        // These are just a few options! What about one hand open and one hand closed!?

        if (openhands > 1) detectedGesture = "Two Open Hands";
        else if(openhands == 1) detectedGesture = "Open Hand";
        
        if (closedhands > 1) detectedGesture = "Two Closed Hands";
        else if(closedhands == 1) detectedGesture = "Closed Hand";
        
        if (pointing > 1) detectedGesture = "Two Hands Pointing";
        else if(pointing == 1) detectedGesture = "Hand Pointing";
        
        // if (pinching > 1) detectedGesture = "Two Hands Pinching";
        // else if(pinching == 1) detectedGesture = "Hand Pinching";

        if (openhands == 0 && closedhands == 0 && pointing == 0)
            detectedGesture = "None";
        
        let newPredictions = []
        for (let b of boxes){
            let dict = {}
            dict['bbox'] = b;
            dict['label'] = detectedGesture;
            dict['class'] = 5
            dict['score'] = 0.9
            newPredictions.push(dict);
        }

        if (detectedGesture != 'None'){
            document.getElementById('gesture').innerText = detectedGesture;
        }
        
        model.renderPredictions(predictions, canvas, context, video);
        if (isVideo) {
            requestAnimationFrame(runDetection);
        }
    });
}
