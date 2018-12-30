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

let camX = 0;
let camY = 0;

let zoom = 1;
const zoomRate = 0.1;

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

	// Reset zoom value
	zoom = 1;
}

function deserialize(obj) {
	return new renders[obj[0]](...obj.slice(1));
}

function setValues(data = defaults) {
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

const loading = document.getElementById("loading");
window.addEventListener("load", () => {
	updateCanvasSize();
	
	setValues();
	setCamValues();

	config.objects = config.objects.concat(new renders.Text(50, 50, "hi"));

    let saved = localStorage.getItem("saved");
    if (saved) {
        let savedData = JSON.parse(saved);

        //importScene(savedData);
       // document.getElementById("dataBox").value = JSON.stringify(exportScene(), null, 4);
	}
	
	loading.style.opacity = 0;
	setTimeout(() => {
		loading.remove();
	}, 1000);
    
    // Start drawing!
    window.requestAnimationFrame(draw);
});

let lastAction;
function addRender(whatItIs) {
	lastAction = deserialize(whatItIs.toJSON());
	config.objects = config.objects.concat(whatItIs);
}

function getCoords(event) {
	return {
		x: Math.round((event.clientX - canvas.offsetLeft) * (1 / zoom) + camX),
		y: Math.round((event.clientY - canvas.offsetTop) * (1 / zoom) + camY),
	};
}

window.addEventListener("mousemove", event => {
	const coords = getCoords(event);
	xPosDOM.innerText = coords.x;
	yPosDOM.innerText = coords.y;
});

function setZoom(direction = 1) {
	if (direction === -1) {
		return zoom = Math.max(1, zoom - zoomRate);
	} else if (direction === 1) {
		return zoom = Math.min(2, zoom + zoomRate);
	} else {
		return zoom;
	}
}

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
		mousedown: (event, x, y) => {
			addRender(new renders.Text(x, y, "Hello there!"));
		}
	},
	clone: {
		name: "Clone",
		description: "Places a copy of the last placed object",
		mousedown: (event, x, y) => {
			if (lastAction instanceof Render) {
				// Update last placed object to new coordinates
				lastAction.x = x;
				lastAction.y = y;

				// And place it
				addRender(lastAction);
			}
		}
	},
	zoom: {
		name: "Zoom",
		description: "Zoom with the mouse",
		mousedown: event => {
			if (event.buttons === 1) {
				// Left-click = zoom in
				setZoom(1);
			} else if (event.buttons === 2) {
				// Right-click = zoom out
				setZoom(-1);
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
			if (event.x && event.y) {
				const coords = getCoords(event);
				return tools[tool][type](event, coords.x, coords.y);
			} else {
				return tools[tool][type](event);
			}
		}
	});
}
registerToolEvent("mousedown");
registerToolEvent("mousemove");

// Disable right-click
canvas.addEventListener("contextmenu", event => event.preventDefault());

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
			case "Minus":
				// Minus = zoom out
				setZoom(-1);
				break;
			case "Equal":
				// Plus = zoom in
				setZoom(1);
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
		case "zoomOut":
			// Click zoom out button = zoom out
			setZoom(-1);
			break;
		case "zoomIn":
			// Click zoom in button = zoom in
			setZoom(1);
    }
});

function drawGrid(x = 0, y = 0, width, height, gridSize = 24, lineColor = "#c0c0c0", context = ctx) {
    context.save();
    context.translate(x, y);
    context.beginPath();
	context.strokeColor = config.gridLineColor;
    context.lineWidth = config.gridLineWidth;

    for (var i = 0; i < width || i < height; i += config.gridSize) {
        context.moveTo(0, i);
        context.lineTo(width, i);
        context.moveTo(i, 0);
        context.lineTo(i, height);
    };
	context.strokeStyle = config.gridLineColor;
    context.stroke();
    context.closePath();
    context.restore();
};

function drawText(text, x, y, context = ctx) {
	context.save();
	context.translate(x, y);

	// Variables
    context.lineJoin = "round";
    context.lineWidth = 3;
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.font = "30px Ubuntu";
	
	// Stroke
    context.strokeStyle = "#555555";
	context.strokeText(text, 0, 0, 2000000);
	
	// Fill
    context.fillStyle = "#ffffff";
	context.fillText(text, 0, 0, 2000000);
	
    context.restore();
};

function draw() {
	ctx.save();

	ctx.scale(zoom, zoom);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
	drawGrid(-camX % canvas.width % config.gridSize, -camY % canvas.height % config.gridSize, canvas.width, canvas.height, config.gridSize, config.gridColor);

	config.objects.forEach(item => item.render(ctx, item.x - camX, item.y - camY));

	ctx.restore();

    // Again!
    window.requestAnimationFrame(draw);
}