const Input = configInput(class extends React.Component {
	render() {
		return elem("input", {
			onChange: event => {
				this.setState({
					value: event.target.value,
					source: "inputUpdate",
				});
			},
			...this.props,
			value: this.props.value || this.state.value,
			style: {
				backgroundColor: "#f8f8f8",
				color: "black",
				resize: "both",
				lineHeight: 14,
				font: "12px/16px Ubuntu, sans-serif",
				fontWight: "normal",
				border: "2px solid black",
				borderRadius: 3,
				userSelect: "text",
				padding: this.props.type === "color" ? 0 : 2,
				outline: "none",
				...this.props.style,
			},
		});
	}
});