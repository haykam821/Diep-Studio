class Paragraph extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
		};
	}

	static getDerivedStateFromError() {
		return {
			error: true,
		};
	}

	render() {
		return elem("p", {
			children: this.state.error ? "Oh no! An error occurred!" : this.props.text,
			style: {
				color: this.state.error ? "#ff9699" : "white",
				textAlign: "center",
				fontSize: this.props.size || 16,
				margin: 5,
				...this.props.style,
			},
		});
	}
}