const React = require("react");
const elem = React.createElement;

const ReactDOM = require("react-dom");

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
const { debug, debugRender } = require("./debug.js");
const { setValues, setCamValues, setZoom, setTool } = require(".");

const { config } = require("./utils/config.js");

/**
 * Renders the sidebar.
 */
function render() {
	ReactDOM.render(elem("div", {
		children: [
			elem("h1", {
				children: "Diep Studio",
				style: {
					marginBottom: 5,
					textAlign: "center",
				},
			}),
			elem(Paragraph, {
				text: "Welcome to Diep Studio! It is currently in beta; please send haykam any questions or concerns you may have. Thanks!",
			}),
			elem("div", {
				children: [
					elem(SidebarSection, {
						children: [
							elem(ImportBox, {
								id: "dataBox",
								placeholder: "Paste your scene here",
							}),
							elem(ButtonPair, {
								children: [
									elem(Button, {
										color: "statBulletSpeed",
										id: "import",
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
										title: "Imports a Diep Studio or DSM scene.",
									}),
									elem(Button, {
										color: "statBulletSpeed",
										id: "importSaved",
										label: "Import Saved",
										title: "This will replace the current scene with the one you last saved.",
									}),
								],
							}),
							elem(ButtonPair, {
								children: [
									elem(Button, {
										color: "statReload",
										label: "Save & Export",
										onClick: () => {
											const output = JSON.stringify(config);
											document.querySelector("#dataBox").value = output;
											localStorage.setItem("saved", output);
										},
										title: "Saves and exports as JSON.",
									}),
								],
							}),
							elem(ButtonPair, {
								children: [
									elem(Button, {
										color: "statBulletDamage",
										label: "Clear",
										onClick: () => setValues(),
										title: "This will remove all progress on the current scene!",
									}),
								],
							}),
						],
						header: "Manage",
					}),
					elem(SidebarSection, {
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
						header: "Camera",
					}),
					elem(SidebarSection, {
						children: [
							elem("select", {
								id: "toolSelect",
								onChange: event => setTool(event.target.value),
							}),
						],
						description: "You can use the digit keys to easily switch between the first 10 tools.",
						header: "Toolbox",
					}),
					elem(SidebarSection, {
						children: [
							elem(OptionRow, {
								control: elem(Input, {
									config: "gridSize",
									min: 2,
									type: "number",
								}),
								label: "Grid Size",
							}),
							elem(OptionRow, {
								control: elem(Input, {
									config: "gridLineWidth",
									min: 1,
									type: "number",
								}),
								label: "Line Size",
							}),
							elem(OptionRow, {
								control: elem(ColorPicker, {
									config: "backgroundColor",
								}),
								label: "Grid Background",
							}),
							elem(OptionRow, {
								control: elem(ColorPicker, {
									config: "gridLineColor",
								}),
								label: "Grid Color",
							}),
						],
						header: "Grid Settings",
					}),
					elem(SidebarSection, {
						children: [
							elem(OptionRow, {
								control: elem(Select, {
									config: "borderStyle",
									options: [
										["Diep.io", "newDiep"],
										["Old Diep.io (single color)", "oldDiep"],
										["Arras.io (this may be wrong)", "arras"],
									],
								}),
								label: "Border Style",
							}),
						],
						header: "Border Settings",
					}),
				],
				onInput: event => {
					if (event.target.id.startsWith("config-")) {
						const configId = event.target.id.replace("config-", "");
						config[configId] = event.target.value;
					}
				},
				style: {
					margin: 12,
				},
			}),
			elem("div", {
				children: [
					elem(Icon, {
						icon: "fa-reddit",
						link: "https://www.reddit.com/r/DiepStudio/",
						title: "Reddit",
					}),
					elem(Icon, {
						icon: "fa-github",
						link: "https://github.com/haykam821/Diep-Studio",
						title: "GitHub",
					}),
					elem(Icon, {
						icon: "fa-discord",
						link: "https://discord.gg/5yDRQdf",
						title: "Discord",
					}),
				],
				style: {
					bottom: 10,
					left: 0,
					marginLeft: "auto",
					marginRight: "auto",
					paddingTop: 30,
					position: "relative",
					right: 0,
					textAlign: "center",
				},
			}),
		],
		style: {
			backgroundColor: "rgba(0, 0, 0, 0.5)",
			color: "white",
			fontFamily: "Ubuntu",
			height: "100%",
			left: 0,
			minWidth: 232,
			overflowX: "hidden",
			overflowY: "auto",
			position: "absolute",
			top: 0,
			userSelect: "none",
			width: "20%",
		},
	}), document.querySelector("#sidebar"));

	if (debug) {
		debugRender();
	}
}
module.exports = render;