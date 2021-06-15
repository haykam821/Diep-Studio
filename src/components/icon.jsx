const React = require("react");
const styled = require("styled-components").default;

const FontAwesome = require("@fortawesome/react-fontawesome").FontAwesomeIcon;

class IconUnstyled extends React.Component {
	render() {
		return <a href={this.props.link} title={this.props.title} className={this.props.className}>
			<FontAwesome size={this.props.size} icon={this.props.icon} />
		</a>;
	}
}
IconUnstyled.propTypes = {

};

const Icon = styled(IconUnstyled)`
	color: white;
	font-size: 25px;
	padding: 3px;
	text-decoration: none;
	transition: 0.2s;
`;
module.exports = Icon;
