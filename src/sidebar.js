const Paragraph = require("./components/paragraph.js");
const SidebarSection = require("./components/sidebar-section.js");
const ImportBox = require("./components/import-box.js");
const ButtonPair = require("./components/buttonpair.js");
const Button = require("./components/button.js");
const OptionRow = require("./components/optionrow.js");
const Input = require("./components/input.js");
const ColorPicker = require("./components/colorpicker.js");
const Select = require("./components/select.js");
const Icon = require("./components/icon.js");

const { notify } = require("./notifications.js");
const { debugRender } = require("./debug.js");

function render() {
	ReactDOM.render(elem("div", {
		style: {
			width: "20%",
			minWidth: 232,
			height: "100%",
			position: "absolute",
			top: 0,
			left: 0,
			backgroundColor: "rgba(0, 0, 0, 0.5)",
			color: "white",
			fontFamily: "Ubuntu",
			userSelect: "none",
			overflowY: "auto",
			overflowX: "hidden",
		},
		children: [
			elem("h1", {
				style: {
					textAlign: "center",
					marginBottom: 5,
				},
				children: "Diep Studio",
			}),
			elem(Paragraph, {
				text: "Welcome to Diep Studio! It is currently in beta; please send haykam any questions or concerns you may have. Thanks!",
			}),
			elem("div", {
				style: {
					margin: 12,
				},
				onInput: event => {
					if (event.target.id.startsWith("config-")) {
						const configId = event.target.id.replace("config-", "");
						config[configId] = event.target.value;
					}
				},
				children: [
					elem(SidebarSection, {
						header: "Manage",
						children: [
							elem(ImportBox, {
								placeholder: "Paste your scene here",
								id: "dataBox",
							}),
							elem(ButtonPair, {
								children: [
									elem(Button, {
										id: "import",
										color: "statBulletSpeed",
										title: "Imports a Diep Studio or DSM scene.",
										label: "Import",
										onClick: () => {
											const boxValue = document.querySelector("#dataBox").value;
											if (boxValue) {
												try {
													setValues(JSON.parse(boxValue));
												} catch (_) {
													notify("Import", "Your Diep Studio code is broken.");
												}
											}
										},
									}),
									elem(Button, {
										id: "importSaved",
										color: "statBulletSpeed",
										title: "This will replace the current scene with the one you last saved.",
										label: "Import Saved",
									}),
								],
							}),
							elem(ButtonPair, {
								children: [
									elem(Button, {
										color: "statReload",
										title: "Saves and exports as JSON.",
										label: "Save & Export",
										onClick: () => {
											const output = JSON.stringify(config);
											document.querySelector("#dataBox").value = output;
											localStorage.setItem("saved", output);
										},
									}),
								],
							}),
							elem(ButtonPair, {
								children: [
									elem(Button, {
										color: "statBulletDamage",
										title: "This will remove all progress on the current scene!",
										label: "Clear",
										onClick: () => setValues(),
									}),
								],
							}),
						],
					}),
					elem(SidebarSection, {
						header: "Camera",
						children: [
							elem(ButtonPair, {
								children: [
									elem(Button, {
										color: "statBulletDamage",
										label: "Go to Center",
										onClick: () => setCamValues(),
									}),
								],
							}),
							elem(ButtonPair, {
								children: [
									elem(Button, {
										color: "statBulletSpeed",
										label: "Zoom Out",
										onClick: () => setZoom(-1),
									}),
									elem(Button, {
										color: "statBulletSpeed",
										label: "Zoom In",
										onClick: () => setZoom(1),
									}),
								],
							}),
						],
					}),
					elem(SidebarSection, {
						header: "Toolbox",
						description: "You can use the digit keys to easily switch between the first 10 tools.",
						children: [
							elem("select", {
								id: "toolSelect",
								onChange: event => setTool(event.target.value),
							}),
						],
					}),
					elem(SidebarSection, {
						header: "Grid Settings",
						children: [
							elem(OptionRow, {
								label: "Grid Size",
								control: elem(Input, {
									config: "gridSize",
									type: "number",
									min: 2,
								}),
							}),
							elem(OptionRow, {
								label: "Line Size",
								control: elem(Input, {
									config: "gridLineWidth",
									type: "number",
									min: 1,
								}),
							}),
							elem(OptionRow, {
								label: "Grid Background",
								control: elem(ColorPicker, {
									config: "backgroundColor",
								}),
							}),
							elem(OptionRow, {
								label: "Grid Color",
								control: elem(ColorPicker, {
									config: "gridLineColor",
								}),
							}),
						],
					}),
					elem(SidebarSection, {
						header: "Border Settings",
						children: [
							elem(OptionRow, {
								label: "Border Style",
								control: elem(Select, {
									config: "borderStyle",
									options: [
										["Diep.io", "newDiep"],
										["Old Diep.io (single color)", "oldDiep"],
										["Arras.io (this may be wrong)", "arras"],
									],
								}),
							}),
						],
					}),
				],
			}),
			elem("div", {
				children: [
					elem(Icon, {
						title: "Reddit",
						icon: "fa-reddit",
						link: "https://www.reddit.com/r/DiepStudio/",
					}),
					elem(Icon, {
						title: "GitHub",
						icon: "fa-github",
						link: "https://github.com/haykam821/Diep-Studio",
					}),
					elem(Icon, {
						title: "Discord",
						icon: "fa-discord",
						link: "https://discord.gg/5yDRQdf",
					}),
				],
				style: {
					textAlign: "center",
					position: "relative",
					marginLeft: "auto",
					marginRight: "auto",
					left: 0,
					right: 0,
					bottom: 10,
					paddingTop: 30,
				},
			}),
		],
	}), document.querySelector("#sidebar"));

	if (debug) {
		debugRender();
	}
}
module.exports = render;