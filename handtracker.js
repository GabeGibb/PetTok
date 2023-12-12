
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
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.7,    // confidence threshold for predictions.
}

// Load the model.
handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel
    // updateNote.innerText = "Loaded Model!"
    // trackButton.disabled = false
    toggleVideo()
});


function startVideo() {
    handTrack.startVideo(video).then(function (status) {
        // console.log("video started", status);
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
        }

        // These are just a few options! What about one hand open and one hand closed!?

        if (openhands > 1) detectedGesture = "Two Open";
        else if(openhands == 1) detectedGesture = "Open";
        
        if (closedhands > 1) detectedGesture = "Two Closed";
        else if(closedhands == 1) detectedGesture = "Closed";
        
        if (pointing > 1) detectedGesture = "Two Pointing";
        else if(pointing == 1) detectedGesture = "Pointing";

        if (pointing == 1 && closedhands == 1) detectedGesture = "Closed Pointing"
        if (openhands == 1 && closedhands == 1) detectedGesture = "Open Closed"
        if (openhands == 1 && pointing == 1) detectedGesture = "Open Pointing"
        
        // if (pinching > 1) detectedGesture = "Two Hands Pinching";
        // else if(pinching == 1) detectedGesture = "Hand Pinching";

        if (openhands == 0 && closedhands == 0 && pointing == 0)
            detectedGesture = "None";
        
        // let newPredictions = []
        // for (let b of boxes){
        //     let dict = {}
        //     dict['bbox'] = b;
        //     dict['label'] = detectedGesture;
        //     dict['class'] = 5
        //     dict['score'] = 0.9
        //     newPredictions.push(dict);
        // }

        if (detectedGesture != 'None'){
            document.getElementById('gesture').innerText = detectedGesture;
        }
        
        model.renderPredictions([], canvas, context, video);
        doAction(detectedGesture);

        if (isVideo) {
            requestAnimationFrame(runDetection);
        }
    });
}

let postsDivs = document.getElementById('posts').getElementsByClassName('post');
let currentPostNum = 0;

let pastGesture = ''
let shouldWait = false;
function doAction(gesture){
    if (pastGesture == gesture || shouldWait){
        return;
    }else{
        pastGesture = gesture
    }
    // console.log(first)
    let scrollSettings = { behavior: "smooth", block: "center", inline: "nearest"};
    if (gesture == 'Closed'){ //Scroll down
        let index = getCurrentPostNum() + 1;
        index = Math.min(index, postsDivs.length-1)
        postsDivs[index].scrollIntoView(scrollSettings)
    }
    else if (gesture == 'Pointing'){//Scroll up
        let index = getCurrentPostNum() - 1;
        index = Math.max(index, 0)
        postsDivs[index].scrollIntoView(scrollSettings)
    }
    else if (gesture == 'Open'){//STOP / DO NOTHING
        return; 
    }
    else if (gesture == 'Open Pointing'){//LIKE
        let index = getCurrentPostNum();
        let curPost = postsDivs[index]
        curPost.getElementsByClassName('interactions')[0].children[0].click()
    }
    else if (gesture == 'Open Closed'){//VIEW PROFILE
        let index = getCurrentPostNum();
        let curPost = postsDivs[index]
        curPost.children[0].click()
    }
    else if (gesture == 'Two Open'){//TOGGLE COMMENTS
        let index = getCurrentPostNum();
        let curPost = postsDivs[index]
        curPost.getElementsByClassName('interactions')[0].children[1].click()
    }
    else if (gesture == 'Closed Pointing'){//GO TO MAIN PAGE
        window.location.href = 'index.html'
    }
    shouldWait = true;
    setTimeout(() => {
        shouldWait = false;
    }, 500);

}

function getCurrentPostNum(){
    let currentPostNum = 0;
    for(let i = 0; i < postsDivs.length; i++){
        var someDiv = postsDivs[i];
        var distanceToTop = someDiv.getBoundingClientRect().top;
        if (distanceToTop >= 0){
            currentPostNum = i;
            break;
        }
    }
    return currentPostNum;
}

// window.addEventListener('scroll', function(ev) {
    
//     var someDiv = postsDivs[0];
//     var distanceToTop = someDiv.getBoundingClientRect().top;
 
//     console.log(distanceToTop);
//  });
