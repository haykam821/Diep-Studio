const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

const xPosDOM = document.getElementById("xPos");
const yPosDOM = document.getElementById("yPos");

const sidebar = document.getElementById("sidebar");

let slotSize, gridBGColor, gridColor, objects, camX, camY;

function setValues() {
    slotSize = 24;
    gridBGColor = "#cdcdcd";
    gridColor = "#c0c0c0";

    objects = [];

    camX = 0;
    camY = 0;
};
setValues();

objects.push({
    x: 0,
    y: 0,
    name: "Origin"
});

const camMoveInterval = slotSize;

function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    sidebar.style.width = window.innerWidth / 5 > 232 ? window.innerWidth / 5 : 232;
    sidebar.style.height = window.innerHeight;
}

window.addEventListener("resize", updateCanvasSize);
window.addEventListener("load", updateCanvasSize);

canvas.addEventListener("mousemove", (event) => {
    xPosDOM.innerHTML = event.clientX + camX;
    yPosDOM.innerHTML = event.clientY + camY;
});

window.addEventListener("keydown", (event) => {
    if (document.activeElement.tagName === "TEXTAREA") {
        return;
    }

    switch (event.code) {
        case "KeyW":
        case "ArrowUp":
            camY -= camMoveInterval;
            break;
        case "KeyS":
        case "ArrowDown":
            camY += camMoveInterval;
            break;
        case "KeyA":
        case "ArrowLeft":
            camX -= camMoveInterval;
            break;
        case "KeyD":
        case "ArrowRight":
            camX += camMoveInterval;
            break;
    }
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
document.getElementById("sidebar").addEventListener("click", (event) => {
    switch (event.target.id) {
        case "reset":
            setValues();
            break;
        case "jumpCenter":
            camX = camY = 0;
            break;
        case "gridLineColor":
            gridColor = event.target.value;
            break;
    }
    console.log(event.target)
});

function exportScene() {
    return {
        objects: objects,
        grid: {
            backgroundColor: gridBGColor,
            lineColor: gridColor,
            lineWidth: null,
            size: slotSize
        }
    }
}
alert(JSON.stringify(exportScene(), null, 4))

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

function drawText(text, x, y, ctxt) {
    var ctxtmp = document.getElementById(ctxt);
    var ctxx = ctxtmp.getContext('2d');
    ctxx.lineJoin = "round";

    ctxx.save();
    ctxx.lineWidth = 5;
    ctxx.textAlign = "center";
    ctxx.translate(x, y);
    ctxx.strokeStyle = "#555555";
    ctxx.strokeText(text, 0, 0, 2000000);
    ctxx.fillStyle = "#ffffff";
    ctxx.fillText(text, 0, 0, 2000000);
    ctxx.restore();


};

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = gridBGColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(0, 0, canvas.width, canvas.height, slotSize, gridColor, "mainCanvas");

    for (let item of objects) {
        drawText(item.name, item.x - camX, item.y - camY, "mainCanvas");
    }

    // Again!
    window.requestAnimationFrame(draw);
}

// Start drawing!
window.requestAnimationFrame(draw);