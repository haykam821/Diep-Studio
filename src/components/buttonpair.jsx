const React = require("react");

class ButtonPair extends React.Component {
	render() {
		return <div className="buttonPair" style={{
			display: "flex",
			...this.props.style,
		}}>
			{this.props.children}
		</div>;
	}
}
module.exports = ButtonPair;