const React = require("react");
const elem = React.createElement;

class ButtonPair extends React.Component {
	render() {
		return elem("div", {
			children: this.props.children,
			class: "buttonPair",
			style: {
				display: "flex",
				...this.props.style,
			},
		});
	}
}
module.exports = ButtonPair;