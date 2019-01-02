class OptionsSection extends React.Component {
	render() {
		return elem("div", {
			children: [
				elem("h2", {
					style: {
						textAlign: "center",
						marginBottom: 5,
					},
					children: this.props.header,
				}),
				elem("div", {
					children: this.props.children,
				}),
			],
		});
	}
}