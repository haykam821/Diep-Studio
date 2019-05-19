const React = require("react");
const elem = React.createElement;

const configInput = require("./../hoc/configinput.js");
const Input = require("./input.js");

const Select = configInput(class extends React.Component {
	render() {
		return elem("select", {
			...this.props,
			children: this.props.options.map(option => {
				return elem("option", {
					children: option[0],
					value: option[1],
				});
			}),
			onChange: event => {
				this.setState({
					value: event.target.value,
					source: "selectUpdate",
				});
			},
			value: this.state.value,
		});
	}
});
module.exports = Select;