const React = require("react");
const styled = require("styled-components").default;

class ConfigFieldUnstyled extends React.Component {
	constructor(props) {
		super(props);
		this.handleInput = this.handleInput.bind(this);
	}

	handleInput({ target }) {
		const config = target.dataset.config;
		if (config) {
			const parsed = target.type === "number" ? parseInt(target.value) : target.value;
			this.props.changeConfig(config, parsed);
		}
	}

	render() {
		return <div className={this.props.className} onChange={this.handleInput} style={this.props.style}>
			{this.props.children}
		</div>;
	}
}
ConfigFieldUnstyled.propTypes = {

};

const ConfigField = styled(ConfigFieldUnstyled)``;
module.exports = ConfigField;
