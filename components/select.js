class Select extends React.Component {
	render() {
		return elem("select", {
			...this.props,
			children: this.props.options.map(option => {
				return elem("option", {
					children: option[0],
					value: option[1],
				});
			}),
		});
	}
}