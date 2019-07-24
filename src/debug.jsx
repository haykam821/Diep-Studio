const React = require("react");

const Paragraph = require("./components/paragraph.jsx");
const ButtonPair = require("./components/buttonpair.jsx");
const Button = require("./components/button.jsx");
const Input = require("./components/input.jsx");

const styled = require("styled-components").default;
const cornerStyles = require("./utils/corner-styles.js");

const debug = location.protocol === "file:";
module.exports.debug = debug;

const EvalBar = styled(class EvalBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			/**
			 * Whether the previous evaluation errored.
			 */
			pastDidError: false,
		};
	}

	render() {
		return <Input className={this.props.className} placeholder="Evaluate JavaScript" onKeyDown={event => {
			if (event.key.length === 1 || event.keyCode === 8 || event.keyCode === 46) {
				this.setState({
					pastDidError: false,
				});
			}

			if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
				try {
					/* eslint-disable-next-line no-eval */
					eval(event.target.value);

				} catch (error) {
					this.setState({
						pastDidError: true,
					});
				}
			}
		}} style={{
			color: this.state.pastDidError && "red",
		}} />;
	}
})`
	font-family: "Ubuntu Mono", monospace;
	width: 100%;
`;

const DebugMenu = styled(class DebugMenu extends React.Component {
	render() {
		return <div className={this.props.className}>
			<p>Debug Mode</p>
			<Paragraph size={12} text={"This number randomizes upon each render: " + Math.round(Math.random() * 500)} />
			<EvalBar />
			<ButtonPair>
				<Button color="statBulletDamage" label="Reload" onClick={() => location.reload()} />
				<Button color="teamBlue" label="Render" onClick={() => this.props.render()} />
			</ButtonPair>
		</div>;
	}
})`
	${cornerStyles}
	border-bottom-left-radius: 8px;
	right: 0;
	top: 0;
	width: 150px;

	& > p {
		color: white;
		font-weight: bold;
		margin: 5px;
		text-align: center;
	}
`;
module.exports.DebugMenu = DebugMenu;