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
	borderStyle: "newDiep",
};

let camX = 0;
let camY = 0;

let zoom = 1;
const zoomRate = 0.1;

let scale = 1;

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

function levelToRadius(level = 45) {
	return Math.round(25 * 1.01 ** level);
}

function degToRad(angle) {
	return angle * Math.PI / 180;
};
function radToDeg(angle) {
	return angle * 180 / Math.PI;
};

function borderDarken(hex, factor = 0.75) {
	return hex.replace(/[0-9a-f]{2}/g, channel => {
		return Math.round(parseInt(channel, 16) * factor).toString(16).padStart(2, '0');
	});
}

function borderColor(hex) {
	switch (config.borderStyle) {
		case "oldDiep":
			return "#525252";
		case "newDiep":
			return borderDarken(hex);
		case "arras":
			return borderDarken(hex, 0.65);
		default:
			return "#000000";
	}
}

function fillStrokeStyle(color, context = ctx) {
	context.fillStyle = color;
	context.strokeStyle = borderColor(color);

	return color;
}

class Tank extends Render {
	constructor(_, __, radius, angle, color, name, barrels) {
		super(...arguments);

		this.radius = radius;
		this.angle = 0;
		this.color = color;

		this.name = name || "";

		this.barrels = barrels || [];
		this.bodyType = 0;
	}

	static get displayName() {
		return "Tank";
	}

	render(context, x, y) {
		context.save();

		context.translate(x, y);
		context.lineWidth = 4 * scale;
		//context.scale(this.radius, this.radius);

		fillStrokeStyle("#999999", context);

		this.barrels.forEach(barrel => {
			context.save();
			context.beginPath();

			context.rotate(degToRad(this.angle + barrel.angle));
			context.translate(0, barrel.x * scale);

			const barrelLength = (barrel.length / 39) * this.radius * 2 * scale;
			const barrelWidth = (barrel.width / 39) * this.radius * 2 * scale;

			context.rect(0, -barrelWidth / 2, barrelLength, barrelWidth);

			context.fill();
			context.stroke();

			context.closePath();
			context.restore();
		});

		context.beginPath();
		fillStrokeStyle(this.color, context);

		// Body border
		context.arc(0, 0, this.radius * scale, 0, 2 * Math.PI);

		context.fill();
		context.stroke();
		
		context.closePath();
		context.restore();

		if (this.name) {
			const nameText = new renders.Text(x, y, this.name, true);
			nameText.render(context, x, y - (this.radius * 1.5 + 10) * scale);
		}
	}
}

function makeTankClass(internalName = "TankBasic", name = "Tank", barrels, bodyType = 0) {
	const tankClass = class extends Tank {
		constructor() {
			super(...arguments);

			this.barrels = barrels;
			this.bodyType = bodyType;
		}

		static get displayName() {
			return name;
		}
	}
	Object.defineProperty(tankClass, "name", {
		value: internalName,
	});

	return tankClass;
}

const tanks = {
	TankBasic: makeTankClass("TankBasic", "Basic Tank", [{
		type: 0,
		length: 35,
		width: 18,
		angle: 0,
		x: 0,
	}]),
	TankTwin: makeTankClass("TankTwin", "Twin", [{
		length: 35,
		width: 17,
		angle: 0,
		x: 20,
	}, {
		length: 35,
		width: 17,
		angle: 0,
		x: -20,
		}]),
	TankFlank: makeTankClass("TankFlank", "Flank Guard", [{
		type: 0,
		length: 35,
		width: 18,
		angle: 0,
		x: 0,
	}, {
		type: 0,
		length: 30,
		width: 18,
		angle: 180,
		x: 0,
	}]),
};

const renders = {
	Render,
	Text: class extends Render {
		constructor(_, __, text, bold) {
			super(...arguments);

			this.text = text;
			this.bold = bold;
		}

		render(context, x, y) {
			drawText(this.text, x, y, context, this.bold);
		}
	},
	Tank,
	...tanks,
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

function updateCanvasSize(customScale) {
	scale = customScale || window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * scale;
	canvas.height = window.innerHeight * scale;

    sidebar.style.width = window.innerWidth / 5 > 232 ? window.innerWidth / 5 : 232;
	sidebar.style.height = window.innerHeight;
}
window.addEventListener("resize", () => updateCanvasSize());

const loading = document.getElementById("loading");
window.addEventListener("load", () => {
	updateCanvasSize();
	
	setValues();
	setCamValues();

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

/**
 * Gets the angle of a target point from the origin.
 * @param {*} originX The X position of the origin.
 * @param {*} originY The Y position of the origin.
 * @param {*} targetX The X position of the target.
 * @param {*} targetY The Y position of the target.
 * @returns {number} The rotation, in degrees.
 */
function getAngleFromOrigin(originX, originY, targetX, targetY) {
	return radToDeg(Math.atan2(targetY - originY, targetX - originX));
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

const colorGroups = {
	team: "Teams",
	other: "Other",
};
const colors = [{
	id: "teamBlue", 
	name: "Blue Team",
	color: "#00b0e1", 
	group: "team",
}, {
	id: "teamRed",
	name: "Red Team",
	color: "#f04f54",
	group: "team",
}, {
	id: "teamGreen",
	name: "Green Team",
	color: "#00e06c",
	group: "team",
}, {
	id: "teamPurple",
	name: "Purple Team",
	color: "#be7ff5",
	group: "team",
}, {
	id: "teamBrown",
	name: "Brown Team",
	color: "#D48067",
	group: "other",
}, {
	id: "barrel",
	name: "Barrel",
	color: "#999999",
	group: "other",
}, {
	id: "outline",
	name: "Outline",
	color: "#525252",
	group: "other",
}];

function formPopup(x, y, form, msg = "Use Tool") {
	return new Promise((resolve, reject) => {
		canUseTool = false;

		const closePopupIcon = document.createElement("i");
		closePopupIcon.classList.add("fas", "fa-times");

		const closePopup = document.createElement("button");
		closePopup.classList.add("closePopup");
		closePopup.appendChild(closePopupIcon);

		const formSubmit = document.createElement("button");
		formSubmit.innerText = msg;
		formSubmit.classList.add("dbtn-green");

		const submitRow = document.createElement("div");
		submitRow.classList.add("buttonPair");
		submitRow.appendChild(formSubmit);

		form.classList.add("popupForm");

		const popupForm = document.createElement("div");
		popupForm.append(form, submitRow);

		const popup = document.createElement("div");
		popup.classList.add("popup");
		popup.appendChild(closePopup);
		popup.appendChild(popupForm);

		closePopup.addEventListener("click", () => {
			canUseTool = true;
			popup.remove();
		});

		function submit() {
			const results = {};

			Array.from(form.querySelectorAll(":scope *")).forEach(child => {
				if (child.name && child.value) {
					results[child.name] = child.value;
				}
			});

			canUseTool = true;
			resolve(results);
			popup.remove();
		}
		formSubmit.addEventListener("click", submit);

		popup.addEventListener("keydown", event => {
			if (event.code === "Escape") {
				canUseTool = true;
				popup.remove();
			} else if (event.code === "Enter" && (event.metaKey || event.ctrlKey)) {
				submit();
			}
		});

		document.body.appendChild(popup);

		// Give focus to popup
		popup.tabIndex = "-1";
		popup.focus();

		popup.style.top = y - popup.offsetHeight - 15;
		popup.style.left = x - popup.offsetWidth / 2;
	});
}

let staging = null;
let resolver = null;
canvas.addEventListener("mousemove", event => {
	if (staging instanceof Render) {
		staging.angle = getAngleFromOrigin(staging.x - camX, staging.y - camY, event.x, event.y);
	}
});

canvas.addEventListener("mousedown", () => {
	if (!staging) return;
	resolver(staging.angle);

	// This is hacky :(
	requestAnimationFrame(() => canUseTool = true);
	staging = null;
});

function stageRotation(thing) {
	return new Promise(resolve => {
		resolver = resolve;
		canUseTool = false;
		staging = thing;
	});
}

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
		cursor: "move",
	},
	text: {
		name: "Text Placer",
		description: "Place text",
		mousedown: (event, x, y) => {
			addRender(new renders.Text(x, y, "Hello there!"));
		},
		cursor: "text",
	},
	tank: {
		name: "Tank Placer",
		description: "Place tanks",
		mousedown: (event, x, y) => {
			const name = document.createElement("input");
			name.type = "text";
			name.placeholder = "Name";
			name.name = "name";

			const level = document.createElement("input");
			level.type = "number";
			level.placeholder = "Level";
			level.value = 45;
			level.name = "level";

			const diepSelect = document.createElement("select");
			colors.forEach(color => {
				const group = Array.from(diepSelect.children).find(val => val.id === color.group);
				const option = new Option(color.name, color.id);

				if (!color.group) {
					diepSelect.append(option);
				} else if (!group) {
					const newGroup = document.createElement("optgroup");

					newGroup.label = colorGroups[color.group];
					newGroup.id = color.group;
					
					newGroup.append(option);
					diepSelect.append(newGroup);
				} else {
					group.append(option);
				}
			});
			diepSelect.append(new Option("Custom", "custom"));

			this.colorPicker = document.createElement("input");
			this.colorPicker.type = "color";
			this.colorPicker.name = "color";
			this.colorPicker.value = "#00b0e1";

			// Event listeners
			diepSelect.addEventListener("change", () => {
				const color = colors.find(color => color.id === diepSelect.value);
				console.log(colors, color)
				if (diepSelect.value && color) {
					this.colorPicker.value = color.color;
				}
			});
			this.colorPicker.addEventListener("change", () => {
				diepSelect.value = "custom";
			});

			const container = document.createElement("div");
			container.classList.add("optionRow");
			container.append(diepSelect, this.colorPicker);

			const tankSelect = document.createElement("select");
			Object.entries(tanks).forEach(entry => {
				const option = document.createElement("option");

				option.value = entry[0];
				option.innerText = entry[1].displayName;

				tankSelect.append(option);
			});
			tankSelect.name = "tank";

			const form = document.createElement("div");
			form.append(name, level, container, tankSelect);

			formPopup(event.x, event.y, form, "Place Tank").then(response => {
				if (tanks[response.tank]) {
					const tank = new tanks[response.tank](x, y, levelToRadius(parseInt(response.level)), 0, response.color, response.name);
					stageRotation(tank).then(rotation => {
						tank.angle = rotation;
						addRender(tank);
					});
				}
			});
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
		},
		cursor: "copy",
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
		},
		cursor: "zoom-in",
	},
	test: {
		name: "Testing Tool",
		description: "Debug the tool system",
		mousedown: () => alert("It works!"),
		hidden: true,
		cursor: "help",
	},
};

const toolSelect = document.getElementById("toolSelect");
let tool;
let canUseTool = true;

function setTool(to = "pan") {
	if (typeof to === "number") {
		const selectChild = toolSelect.children[to];
		to = (selectChild && selectChild.value) || "pan";
	}

	tool = to;
	toolSelect.value = to;

	if (tools[tool].cursor) {
		canvas.style.cursor = tools[tool].cursor;
	} else {
		canvas.style.cursor = "auto";
	}
}
setTool("tank");
toolSelect.addEventListener("change", event => setTool(event.target.value));

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
		if (canUseTool && tools[tool] && tools[tool][type]) {
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
				break;
			case "Escape":
				// Escape from tool
				if (staging && resolver) {
					staging = null;
					resolver = null;
					canUseTool = true;
				}
				break;
			case "Digit0":
				setTool(10);
				break;
			default:
				if (event.code.startsWith("Digit")) {
					setTool(parseInt(event.key) - 1);
				}
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
            let output = JSON.stringify(config);
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
	const trueGridSize = gridSize * scale; 

    context.save();
    context.translate(x * scale, y * scale);
    context.beginPath();
	context.strokeColor = lineColor;
    context.lineWidth = config.gridLineWidth * scale;

	for (var i = 0; i < width || i < height; i += trueGridSize) {
        context.moveTo(0, i);
        context.lineTo(width, i);
        context.moveTo(i, 0);
        context.lineTo(i, height);
    };
	context.strokeStyle = lineColor;
    context.stroke();
    context.closePath();
    context.restore();
};

function drawText(text, x, y, context = ctx, bold = false) {
	context.save();
	context.translate(x, y);

	// Variables
    context.lineJoin = "round";
    context.lineWidth = 3 * scale;
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.font = `${bold ? "bold" : ""} ${30 * scale}px Ubuntu`;
	
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
	drawGrid(-camX % canvas.width % config.gridSize, -camY % canvas.height % config.gridSize, canvas.width, canvas.height, config.gridSize, config.gridLineColor);

	if (staging instanceof Render) {
		ctx.globalAlpha = 0.5;
		staging.render(ctx, (staging.x - camX) * scale, (staging.y - camY) * scale);
		ctx.globalAlpha = 1;
	}
	config.objects.forEach(item => item.render(ctx, (item.x - camX) * scale, (item.y - camY) * scale));

	ctx.restore();

    // Again!
    window.requestAnimationFrame(draw);
}