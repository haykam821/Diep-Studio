const React = require("react");
const elem = React.createElement;

const configInput = require("./../hoc/configinput.js");

const formStyles = require("./../utils/form-styles.js");

const Input = configInput(class extends React.Component {
	render() {
		return elem("input", {
			onChange: event => {
				this.setState({
					value: event.target.value,
					source: "inputUpdate",
				});
			},
			...this.props,
			value: this.props.value || this.state.value,
			style: {
				...formStyles,
				padding: this.props.type === "color" ? 0 : 2,
				...this.props.style,
			},
		});
	}
});
module.exports = Input;