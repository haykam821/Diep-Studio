const debug = location.protocol === "file:";
const debugElem = document.getElementById("debug");

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
						elem("button", {
							class: "dbtn-red",
							children: "Reload",
							onClick: () => location.reload(),
						}),
						elem("button", {
							class: "dbtn-blue",
							children: "Render",
							onClick: () => render(),
						}),
					],
				}),
			],
		});
	}
}

function debugRender() {
	ReactDOM.render(elem(Debug), debugElem);
}