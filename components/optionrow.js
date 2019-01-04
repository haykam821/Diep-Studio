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
			style: {
				display: "flex",
			},
			children: [
				elem("span", {
					style: {
						whiteSpace: "nowrap",
					},
					children: truncate(this.props.label + ":", 11),
				}),
				control,
			]
		});
	}
}