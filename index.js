const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

const sidebar = document.getElementById("sidebar");

function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    sidebar.style.width = window.innerWidth / 5;
    sidebar.style.height = window.innerHeight;
}

window.addEventListener("resize", updateCanvasSize);
window.addEventListener("load", updateCanvasSize);

function drawGrid(x, y, width, height, slotSize, lineColor, ctxt) {
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

    ctx.fillStyle = "#cdcdcd";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGrid(0, 0, canvas.width, canvas.height, 24, "#c0c0c0", "mainCanvas")

    // Again!
    window.requestAnimationFrame(draw);
}

// Start drawing!
window.requestAnimationFrame(draw);