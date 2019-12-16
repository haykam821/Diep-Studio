const React = require("react");
const styled = require("styled-components").default;

const formStyles = require("../form-styles.js");

class InputUnstyled extends React.Component {
	render() {
		return <input className={this.props.className} data-config={this.props.config} {...this.props} />;
	}
}
InputUnstyled.propTypes = {

};

const Input = styled(InputUnstyled)`
	${formStyles}
	padding: ${props => props.type === "color" ? 0 : 2};
`;
module.exports = Input;