class SidebarSection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: this.props.expanded || true,
		};
	}
	
	render() {
		return elem("div", {
			children: [
				elem("button", {
					children: [
						elem("i", {
							class: "fas fa-angle-" + (this.state.expanded ? "down" : "up"),
							style: {
								padding: 5,
								fontSize: 18,
							}
						}),
						elem("h2", {
							style: {
								display: "inline-block",
								marginBottom: 5,
							},
							children: this.props.header,
						}),
					],
					style: {
						textAlign: "center",
						background: "none",
						border: "none",
						width: "initial",
						height: "initial",
					},
					onClick: () => {
						this.setState({
							expanded: !this.state.expanded,
						});
					},
				}),
				this.state.expanded && elem("div", {
					children: [
						this.props.description && elem(Paragraph, {
							text: this.props.description,
						}),
						elem("div", {
							children: this.props.children,
						}),
					]
				}),
			],
		});
	}
}