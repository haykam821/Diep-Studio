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

class Render {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;

		this.data = arguments;
	}

	toJSON() {
		return [
			this.constructor.name,
			...this.data,
		];
	}

	render(context, x, y) {
		context.fillRect(x, y, 5, 5);
	}
}

const renders = {
	Render,
	Text: class extends Render {
		constructor(_, __, text) {
			super(...arguments);
			this.text = text;
		}

		render(context, x, y) {
			drawText(this.text, x, y, context);
		}
	}
};

function setCamValues() {
	// Set camera values to middle
	camY = window.innerHeight / 2 * -1;
	camX = (window.innerWidth + parseInt(sidebar.style.width)) / 2 * -1;
}

function deserialize(obj) {
	return new renders[obj[0]](...obj.slice(1));
}

function setValues(data = defaults) {
	setCamValues();

	// Apply defaults
	Object.entries(data).forEach(entry => {
		if (entry[0] === "objects") {
			config.objects = entry[1].map(deserialize);
		} else {
			config[entry[0]] = entry[1];
		}
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
	config.objects = config.objects.concat(new renders.Text(50, 50, "hi"));

    let saved = localStorage.getItem("saved");
    if (saved) {
        let savedData = JSON.parse(saved);

        //importScene(savedData);
       // document.getElementById("dataBox").value = JSON.stringify(exportScene(), null, 4);
    }
    
    // Start drawing!
    window.requestAnimationFrame(draw);
});

let lastAction;
function addRender(whatItIs) {
	lastAction = deserialize(whatItIs.toJSON());
	config.objects = config.objects.concat(whatItIs);
}

canvas.addEventListener("mousemove", (event) => {
	xPosDOM.innerText = Math.round(event.clientX + camX);
	yPosDOM.innerText = Math.round(event.clientY + camY);
});

const toolSelect = document.getElementById("toolSelect");
let tool = "pan";
toolSelect.addEventListener("change", event => tool = event.target.value);

const tools = {
	pan: {
		name: "Pan",
		description: "Move the camera around by dragging",
		mousemove: event => {
			if (event.buttons === 1) {
				camX -= event.movementX;
				camY -= event.movementY;
			}
		},
	},
	text: {
		name: "Text Placer",
		description: "Place text",
		mousedown: event => {
			addRender(new renders.Text(event.x + camX, event.y + camY, "Hello there!"));
		}
	},
	clone: {
		name: "Clone",
		description: "Places a copy of the last placed object.",
		mousedown: event => {
			if (lastAction instanceof Render) {
				// Update last placed object to new coordinates
				lastAction.x = event.x + camX;
				lastAction.y = event.y + camY;

				// And place it
				addRender(lastAction);
			}
		}
	},
	test: {
		name: "Testing Tool",
		description: "Debug the tool system",
		mousedown: () => alert("It works!"),
		hidden: true,
	},
};

Object.entries(tools).forEach(entry => {
	if (!entry[1].hidden) {
		const opt = document.createElement("option");

		opt.value = entry[0];
		opt.innerText = `${entry[1].name} (${entry[1].description})`;
		
		toolSelect.appendChild(opt);
	}
});

function registerToolEvent(type) {
	canvas.addEventListener(type, event => {
		if (tools[tool] && tools[tool][type]) {
			return tools[tool][type](event);
		}
	});
}
registerToolEvent("mousedown");
registerToolEvent("mousemove");

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
            setCamValues();
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
			const boxVal = document.getElementById("dataBox").value;
			if (boxVal) {
				try {
					setValues(JSON.parse(boxVal));
				} catch (_) {
					alert("Your Diep Studio code is broken.");
				}
			}
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

function drawText(text, x, y, context = ctx) {
	context.save();
	context.translate(x, y);

	// Variables
    context.lineJoin = "round";
    context.lineWidth = 3;
	context.textAlign = "center";
	
	// Stroke
    context.strokeStyle = "#555555";
	context.strokeText(text, 0, 0, 2000000);
	
	// Fill
    context.fillStyle = "#ffffff";
	context.fillText(text, 0, 0, 2000000);
	
    context.restore();
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
	drawGrid(-camX % canvas.width % config.gridSize, -camY % canvas.height % config.gridSize, canvas.width, canvas.height, config.gridSize, config.gridColor, "mainCanvas");

	config.objects.forEach(item => item.render(ctx, item.x - camX, item.y - camY));

    // Again!
    window.requestAnimationFrame(draw);
}