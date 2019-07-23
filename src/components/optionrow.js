const React = require("react");
const elem = React.createElement;

function truncate(text, limit = 20, truncator = "...") {
	if (text.length - truncator.length <= limit) {
		return text;
	} else {
		return text.slice(0, limit) + truncator;
	}
}
class OptionRow extends React.Component {
	render() {
		const control = React.cloneElement(this.props.control, {
			style: {
				display: "inline-flex",
				flexGrow: 100,
				marginLeft: 8,
			},
		});

		return elem("div", {
			children: [
				elem("span", {
					children: truncate(this.props.label + ":", 11),
					style: {
						whiteSpace: "nowrap",
					},
				}),
				control,
			],
			style: {
				display: "flex",
			},
		});
	}
}
module.exports = OptionRow;