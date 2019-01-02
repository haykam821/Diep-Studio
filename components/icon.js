class Icon extends React.Component {
	render() {
		return elem("a", {
			children: elem("i", {
				class: "fab " + this.props.icon,
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
}