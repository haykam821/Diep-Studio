const React = require("react");
const elem = React.createElement;

const Paragraph = require("./components/paragraph.js");
const ButtonPair = require("./components/buttonpair.js");
const Button = require("./components/button.js");
const Input = require("./components/input.js");

const cornerStyles = require("./utils/corner-styles.js");

const { render } = require(".");

const debug = location.protocol === "file:";
module.exports.debug = debug;

class DebugMenu extends React.Component {
	render() {
		return elem("div", {
			children: [
				elem("p", {
					children: "Debug Mode",
					style: {
						color: "white",
						fontWeight: "bold",
						margin: 5,
						textAlign: "center",
					},
				}),
				elem(Paragraph, {
					size: 12,
					text: [
						"This number randomizes upon each render: ",
						elem("span", null, Math.round(Math.random() * 500)),
					],
				}),
				elem(Input, {
					onKeyDown: event => {
						if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
							/* eslint-disable-next-line no-eval */
							eval(event.target.value);
							event.target.value = "";
						}
					},
					placeholder: "Evaluate JavaScript",
					style: {
						fontFamily: [
							"Ubuntu Mono",
							"monospace",
						],
						width: "100%",
					},
				}),
				elem(ButtonPair, {
					children: [
						elem(Button, {
							color: "statBulletDamage",
							label: "Reload",
							onClick: () => location.reload(),
						}),
						elem(Button, {
							color: "teamBlue",
							label: "Render",
							onClick: () => render(),
						}),
					],
				}),
			],
			style: {
				...cornerStyles,
				borderBottomLeftRadius: 8,
				right: 0,
				top: 0,
				width: 150,
			},
		});
	}
}
module.exports.DebugMenu = DebugMenu;