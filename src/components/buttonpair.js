const React = require("react");
const elem = React.createElement;

class ButtonPair extends React.Component {
	render() {
		return elem("div", {
			style: {
				display: "flex",
				...this.props.style,
			},
			class: "buttonPair",
			children: this.props.children,
		});
	}
}
module.exports = ButtonPair;