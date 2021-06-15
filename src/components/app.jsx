const React = require("react");
const styled = require("styled-components").default;

const Scene = require("./scene.jsx");
const Sidebar = require("./sidebar.jsx");

/**
 * Gets the saved config from local storage.
 * @returns The saved config.
 */
function getSavedConfig() {
	try {
		const parsed = JSON.parse(localStorage.getItem("diep-studio:saved"));

		if (parsed === null) {
			return {};
		}
		return parsed;
	} catch (error) {
		/* eslint-disable-next-line no-console */
		console.warn("Saved config error:", error);
		return {};
	}
}

class AppUnstyled extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			config: getSavedConfig(),
			tool: "pan",
		};

		this.changeConfig = this.changeConfig.bind(this);
	}

	changeConfig(key, value) {
		this.setState(state => {
			state.config[key] = value;
			return state;
		});
		localStorage.setItem("diep-studio:saved", JSON.stringify(this.state.config));
	}

	render() {
		return <div className={this.props.className}>
			<Sidebar config={this.state.config} changeConfig={this.changeConfig} />
			<Scene config={this.state.config} changeConfig={this.changeConfig} />
		</div>;
	}
}
AppUnstyled.propTypes = {
};

const App = styled(AppUnstyled)`
	width: 100%;
	height: 100%;

	background: pink;
`;
module.exports = App;
