const Paragraph = require("./components/paragraph.js");
const ButtonPair = require("./components/buttonpair.js");
const Button = require("./components/button.js");
const Input = require("./components/input.js");

const debug = location.protocol === "file:";
module.exports.debug = debug;

const debugElement = document.querySelector("#debug");

class Debug extends React.Component {
	render() {
		return elem("div", {
			style: {
				...cornerStyles,
				top: 0,
				right: 0,
				borderBottomLeftRadius: 8,
				width: 150,
			},
			children: [
				elem("p", {
					style: {
						margin: 5,
						fontWeight: "bold",
						textAlign: "center",
						color: "white",
					},
					children: "Debug Mode",
				}),
				elem(Paragraph, {
					text: [
						"This number randomizes upon each render: ",
						elem("span", null, Math.round(Math.random() * 500)),
					],
					size: 12,
				}),
				elem(Input, {
					placeholder: "Evaluate JavaScript",
					onKeyDown: event => {
						if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
							eval(event.target.value);
							event.target.value = "";
						}
					},
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
		});
	}
}

function debugRender() {
	ReactDOM.render(elem(Debug), debugElement);
}
module.exports.debugRender = debugRender;