const Icon = errorBoundary(class extends React.Component {
	render() {
		return elem("a", {
			children: elem("i", {
				class: "fab " + (this.state.error ? "exclamation-triangle" : this.props.icon),
			}),
			title: this.props.title,
			href: this.props.link,
			target: "_blank",
			style: {
				fontSize: 25,
				color: "white",
				textDecoration: "none",
				transition: "0.2s",
				padding: 3,
			}
		});
	}
});