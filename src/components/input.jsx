const React = require("react");

const configInput = require("../hoc/configinput.js");

const styled = require("styled-components").default;
const formStyles = require("../utils/form-styles.js");

const Input = styled(configInput(class Input extends React.Component {
	render() {
		return <input className={this.props.className} onChange={event => {
			this.setState({
				source: "inputUpdate",
				value: event.target.value,
			});
		}} {...this.props} value={(this.props.value !== undefined ? this.props.value : this.state.value) || ""} />;
	}
}))`
	${formStyles}
	padding: ${props => props.type === "color" ? 0 : 2};
`;
module.exports = Input;