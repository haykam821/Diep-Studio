const React = require("react");
const styled = require("styled-components").default;

class ButtonPairUnstyled extends React.Component {
	render() {
		return <div className={this.props.className}>
			{this.props.children}
		</div>;
	}
}
ButtonPairUnstyled.propTypes = {

};

const ButtonPair = styled(ButtonPairUnstyled)`
	display: flex;

	& > * {
		flex-grow: 100;
		margin: 2px;
		padding: 3px;
	}
`;
module.exports = ButtonPair;
