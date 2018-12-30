const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

const xPosDOM = document.getElementById("xPos");
const yPosDOM = document.getElementById("yPos");

const sidebar = document.getElementById("sidebar");

const config = new Proxy({}, {
	set: (object, property, value) => {
		const relatedElem = document.getElementById("config-" + property);
		if (relatedElem) {
			relatedElem.value = value;
			relatedElem.placeholder = defaults[value] || "";
		}

		return object[property] = relatedElem && relatedElem.type === "number" ? parseInt(value) : value;
	},
});

const defaults = {
	objects: [],
	backgroundColor: "#cdcdcd",
	gridSize: 24,
	gridLineColor: "#c0c0c0",
	gridLineWidth: 1,
};

let camX, camY;

function setValues() {
	// Set camera values to middle
	camY = window.innerHeight / 2 * -1;
	camX = (window.innerWidth + parseInt(sidebar.style.width)) / 2 * -1;

	// Apply defaults
	Object.entries(defaults).forEach(entry => {
		config[entry[0]] = entry[1];
	});
};

function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    sidebar.style.width = window.innerWidth / 5 > 232 ? window.innerWidth / 5 : 232;
    sidebar.style.height = window.innerHeight;
}

window.addEventListener("resize", updateCanvasSize);
window.addEventListener("load", () => {
    updateCanvasSize();
    setValues();

    let saved = localStorage.getItem("saved");
    if (saved) {
        let savedData = JSON.parse(saved);

        importScene(savedData);
        document.getElementById("dataBox").value = JSON.stringify(exportScene(), null, 4);
    }
    
    // Start drawing!
    window.requestAnimationFrame(draw);
});

canvas.addEventListener("mousemove", (event) => {
    xPosDOM.innerHTML = event.clientX + camX;
	yPosDOM.innerHTML = event.clientY + camY;
});

window.addEventListener("keydown", (event) => {
    if (["TEXTAREA", "INPUT"].indexOf(document.activeElement.tagName) === -1) {
        switch (event.code) {
            case "KeyW":
            case "ArrowUp":
                camY -= config.gridSize;
                break;
            case "KeyS":
            case "ArrowDown":
				camY += config.gridSize;
                break;
            case "KeyA":
            case "ArrowLeft":
				camX -= config.gridSize;
                break;
            case "KeyD":
            case "ArrowRight":
				camX += config.gridSize;
                break;
        }
    }
});

document.getElementById("sidebar").addEventListener("input", event => {
	if (event.target.id.startsWith("config-")) {
		const configId = event.target.id.replace("config-", "");
		config[configId] = event.target.value;
	}
});
document.getElementById("sidebar").addEventListener("click", (event) => {
    switch (event.target.id) {
        case "reset":
            setValues();
            break;
        case "jumpCenter":
            setCamToCenter();
            break;
        case "jumpSceneStart":
            camX = sceneStartX;
            camY = sceneStartY;
            break;
        case "gridLineColor":
            gridColor = event.target.value;
            break;
        case "export":
            let output = JSON.stringify(config, null, 4);
            document.getElementById("dataBox").value = output;
            localStorage.setItem("saved", output);

            break;
        case "import":
            importScene(JSON.parse(document.getElementById("dataBox").value));
            break;
    }
});

function drawGrid(x = 0, y = 0, width, height, gridSize = 24, lineColor = "#c0c0c0", ctxt) {
    var ctxtmp = document.getElementById(ctxt);
    var ctxx = ctxtmp.getContext('2d');

    ctxx.save();
    ctxx.translate(x, y);
    ctxx.beginPath();
	ctxx.strokeColor = config.gridLineColor;
    ctxx.lineWidth = config.gridLineWidth;

    for (var i = 0; i < width || i < height; i += config.gridSize) {
        ctxx.moveTo(0, i);
        ctxx.lineTo(width, i);
        ctxx.moveTo(i, 0);
        ctxx.lineTo(i, height);
    };
	ctxx.strokeStyle = config.gridLineColor;
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

    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(0, 0, canvas.width, canvas.height, config.gridSize, config.gridColor, "mainCanvas");

    config.objects.forEach(item => drawText(item.name, item.x - camX, item.y - camY, "mainCanvas"));

    // Again!
    window.requestAnimationFrame(draw);
}