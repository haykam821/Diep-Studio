class ButtonPair extends React.Component {
	render() {
		return elem("div", {
			style: {
				display: "flex",
			},
			class: "buttonPair",
			children: this.props.children,
		});
	}
}