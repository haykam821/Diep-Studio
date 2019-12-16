const React = require("react");
const styled = require("styled-components").default;

class ParagraphUnstyled extends React.Component {
	render() {
		return <p className={this.props.className}>
			{this.props.children}
		</p>;
	}
}
ParagraphUnstyled.propTypes = {

};

const Paragraph = styled(ParagraphUnstyled)`
	color: white;
	font-size: ${props => props.size || 16};
	margin: 5px;
	text-align: center;
`;
module.exports = Paragraph;