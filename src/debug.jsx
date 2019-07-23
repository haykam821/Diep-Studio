const React = require("react");

const Paragraph = require("./components/paragraph.js");
const ButtonPair = require("./components/buttonpair.js");
const Button = require("./components/button.js");
const Input = require("./components/input.js");

const cornerStyles = require("./utils/corner-styles.js");

const debug = location.protocol === "file:";
module.exports.debug = debug;

class EvalBar extends React.Component {
	render() {
		return <Input placeholder="Evaluate JavaScript" onKeyDown={event => {
			if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
				/* eslint-disable-next-line no-eval */
				eval(event.target.value);
				event.target.value = "";
			}
		}} style={{
			fontFamily: [
				"Ubuntu Mono",
				"monospace",
			],
			width: "100%",
		}} />;
	}
}

class DebugMenu extends React.Component {
	render() {
		return <div style={{
			...cornerStyles,
			borderBottomLeftRadius: 8,
			right: 0,
			top: 0,
			width: 150,
		}}>
			<p style={{
				color: "white",
				fontWeight: "bold",
				margin: 5,
				textAlign: "center",
			}}>Debug Mode</p>
			<Paragraph size={12} text={"This number randomizes upon each render: " + Math.round(Math.random() * 500)} />
			<EvalBar />
			<ButtonPair>
				<Button color="statBulletDamage" label="Reload" onClick={() => location.reload()} />
				<Button color="teamBlue" label="Render" onClick={() => this.props.render()} />
			</ButtonPair>
		</div>;
	}
}
module.exports.DebugMenu = DebugMenu;