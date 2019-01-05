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
				children: "Diep Studio"
			}),
			elem("p", null, "Welcome to Diep Studio! It is currently in beta; please send haykam any questions or concerns you may have. Thanks!"),
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
					elem(OptionsSection, {
						header: "Data Management",
						children: [
							elem("textarea", {
								style: {
									fontFamily: [
										"Ubuntu Mono",
										"monospace",
									],
								},
								rows: 8,
								placeholder: "Paste your scene here",
								id: "dataBox",
							}),
							elem(ButtonPair, {
								children: [
									elem("button", {
										id: "import",
										className: "dbtn-blue",
										title: "Imports a Diep Studio or DSM scene.",
										children: "Import",
										onClick: () => {
											const boxVal = document.getElementById("dataBox").value;
											if (boxVal) {
												try {
													setValues(JSON.parse(boxVal));
												} catch (_) {
													alert("Your Diep Studio code is broken.");
												}
											}
										},
									}),
									elem("button", {
										id: "importSaved",
										className: "dbtn-blue",
										title: "his will replace the current scene with the one you last saved.",
										children: "Import Saved",
									}),
								]
							}),
							elem(ButtonPair, {
								children: [
									elem("button", {
										className: "dbtn-green",
										title: "Saves and exports as JSON.",
										children: "Save & Export",
										onClick: () => {
											let output = JSON.stringify(config);
											document.getElementById("dataBox").value = output;
											localStorage.setItem("saved", output);
										},
									}),
								]
							}),
							elem(ButtonPair, {
								children: [
									elem("button", {
										className: "dbtn-red",
										title: "This will remove all progress on the current scene!",
										children: "Clear",
										onClick: () => setValues(),
									}),
								]
							}),
						],
					}),
					elem(OptionsSection, {
						header: "Camera",
						children: [
							elem(ButtonPair, {
								children: [
									elem("button", {
										class: "dbtn-red",
										children: "Go to Center",
										onClick: () => setCamValues(),
									}),
								]
							}),
							elem(ButtonPair, {
								children: [
									elem("button", {
										class: "dbtn-blue",
										children: "Zoom Out",
										onClick: () => setZoom(-1),
									}),
									elem("button", {
										class: "dbtn-blue",
										children: "Zoom In",
										onClick: () => setZoom(1),
									}),
								]
							}),
						],
					}),
					elem(OptionsSection, {
						header: "Toolbox",
						children: [
							elem("p", null, "You can use the digit keys to easily switch between the first 10 tools."),
							elem("select", {
								id: "toolSelect",
								onChange: event => setTool(event.target.value),
							}),
						],
					}),
					elem(OptionsSection, {
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
					elem(OptionsSection, {
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
	}), document.getElementById("sidebar"));

	if (debug) {
		debugRender();
	}
}
render();