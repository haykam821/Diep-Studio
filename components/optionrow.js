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
						display: "inline-flex",
					},
				}, this.props.label + ":"),
				control,
			]
		});
	}
}