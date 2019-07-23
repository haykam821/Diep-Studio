const React = require("react");

const configInput = require("../hoc/configinput.js");

const formStyles = require("../utils/form-styles.js");

const Input = configInput(class Input extends React.Component {
	render() {
		return <input onChange={event => {
			this.setState({
				source: "inputUpdate",
				value: event.target.value,
			});
		}} {...this.props} style={{
			...formStyles,
			padding: this.props.type === "color" ? 0 : 2,
			...this.props.style,
		}} value={this.props.value || this.state.value} />;
	}
});
module.exports = Input;