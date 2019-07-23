const React = require("react");
const configInput = require("../hoc/configinput.js");

const Select = configInput(class Select extends React.Component {
	render() {
		return <select {...this.props} value={this.state.value} onChange={event => {
			this.setState({
				source: "selectUpdate",
				value: event.target.value,
			});
		}}>
			{this.props.options.map(option => {
				return <option value={option[1]} key={option[1]}>
					{option[0]}
				</option>;
			})}
		</select>;
	}
});
module.exports = Select;