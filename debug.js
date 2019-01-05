const debug = location.protocol === "file:";
const debugElem = document.getElementById("debug");

class RenderTest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
		};
	}

	static getDerivedStateFromError() {
		return {
			error: true,
		};
	}

	render() {
		return elem("p", {
			children: this.state.error ? "Oh no! An error occurred!" : [
				"This number randomizes upon each render: ",
				elem("span", null, Math.round(Math.random() * 500)),
			],
			style: {
				color: this.state.error ? "#ff9699" : "white",
				textAlign: "center",
				fontSize: 12,
				margin: 3,
			}
		});
	}
}

class Debug extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			errors: [],
		};
		window.onerror = error => {
			this.setState({
				errors: this.state.errors.concat(error),
			});
			return true;
		};
	}

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
				elem(RenderTest),
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