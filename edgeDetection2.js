const w = 1366/6;
const h = 768/6;
var rangeslider1 = document.getElementById("0SliderRange");
var rangeslider2 = document.getElementById("1SliderRange");
var output = document.getElementById("demo0");
var output2 = document.getElementById("demo1");
var LowThr = parseInt(rangeslider1.value);
var UpThr = parseInt(rangeslider2.value);
const sliderN = {LOWTHR: {50,0,200}, UPTHR : {100, 0, 200}, FPMS : 42, WIDTH: 1366/5, HEIGHT: 768/5};
/*
const div = document.createElement('div');
for(let item in sliderN){
    let newSlider = document.createElement('input');
    newSlider.setAttribute('type', "range");
    newSlider.setAttribute('min', '0');
    newSlider.setAttribute('max', '200');
    newSlider.setAttribute('value',sliderN[item]);
    newSlider.setAttribute('class', "myslider");
    newSlider.setAttribute('id',`out${item}`);
    div.appendChild(newSlider);
    let Pvalue = document.createElement('p');
    
    newSlider.oninput = function() {
        if(Number.isSafeInteger(parseInt(this.value))){
            Pvalue.innerHTML = this.value;
            LowThr = parseInt(this.value);
        }
    }
    
}
const currentDiv = document.getElementById("streamCanvas");
document.body.insertBefore(div, currentDiv);
*/




output.innerHTML = rangeslider1.value;
output2.innerHTML = rangeslider2.value;

rangeslider1.oninput = function() {
    if(Number.isSafeInteger(parseInt(this.value))){
        output.innerHTML = this.value;
        LowThr = parseInt(this.value);
    }
    //output.innerHTML = this.value;
}
rangeslider2.oninput = function() {
    if(Number.isSafeInteger(parseInt(this.value))){
        output2.innerHTML = this.value;
        UpThr = parseInt(this.value);
    }
}


// Set a variable for the video tag
const video = document.getElementById("video");

const constraints = {
    // no audio is required
    audio: false,
    // Set the video size
    video: {
        width: w, height: h
    }
};

// Function to stream video from the web cam
async function streamVideo() {
    // Set video parameters
    /*try {
        let canvas = getElementByClass("canva");
        let ctx = canvas.getContext("2d");
        ctx.width = 1366/3;
        ctx.height = 768/3;
    } catch(){}
    */
    try {
        // Get the video stream
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        window.stream = stream;
        video.srcObject = stream; 
        
         
    } catch (e) {
        alert("An error occurred while accessing the web cam.");
    }   
}
// Function to draw a video frame onto the canvas
function drawCanvas() {
    // Get context and draw frame from video element
    var canvas = document.getElementById("streamCanvas")
    var ctx = canvas.getContext('2d');
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(video, 0, 0); 

}
function edgeDetection() {
    
    // Start video stream
    streamVideo();
    // Set interval to repeat function every 42 milliseconds
    setInterval(() => {
        // Draw frame to the intermediate canvas
        drawCanvas();
        
        // Get the current frame from the intermediate canvas
        var src = cv.imread("streamCanvas");
        cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
        cv.Canny(src, src, LowThr, UpThr, 3, false);
        cv.imshow("edgeDetectionCanvas", src);
        src.delete();
    }, 40);
}

// main function to clean up
function main() {
    // Hide the video tag
    video.style.display = "none";
    // Run edge detection
    edgeDetection();
}
// Load main
main();