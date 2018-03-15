const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

const xPosDOM = document.getElementById("xPos");
const yPosDOM = document.getElementById("yPos");

const sidebar = document.getElementById("sidebar");

let slotSize = 24;
let gridBGColor = "#cdcdcd";
let gridColor = "#c0c0c0";

function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    sidebar.style.width = window.innerWidth / 5;
    sidebar.style.height = window.innerHeight;
}

window.addEventListener("resize", updateCanvasSize);
window.addEventListener("load", updateCanvasSize);

canvas.addEventListener("mousemove", (event) => {
    xPosDOM.innerHTML = event.clientX;
    yPosDOM.innerHTML = event.clientY;
});

document.getElementById("sidebar").addEventListener("input", (event) => {
    switch (event.target.id) {
        case "gridSlotSize":
            slotSize = parseInt(event.target.value);
            break;
        case "gridBackgroundColor":
            gridBGColor = event.target.value;
            break;
        case "gridLineColor":
            gridColor = event.target.value;
            break;
    }
});

function drawGrid(x = 0, y = 0, width, height, slotSize = 24, lineColor = "#c0c0c0", ctxt) {
    var ctxtmp = document.getElementById(ctxt);
    var ctxx = ctxtmp.getContext('2d');

    ctxx.save();
    ctxx.translate(x, y);
    ctxx.beginPath();
    ctxx.strokeColor = lineColor;
    ctxx.lineWidth = 1;

    for (var i = 0; i < width || i < height; i += slotSize) {
        ctxx.moveTo(0, i);
        ctxx.lineTo(width, i);
        ctxx.moveTo(i, 0);
        ctxx.lineTo(i, height);
    };
    ctxx.strokeStyle = lineColor;
    ctxx.stroke();
    ctxx.closePath();
    ctxx.restore();
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = gridBGColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(0, 0, canvas.width, canvas.height, slotSize, gridColor, "mainCanvas");

    // Again!
    window.requestAnimationFrame(draw);
}

// Start drawing!
window.requestAnimationFrame(draw);