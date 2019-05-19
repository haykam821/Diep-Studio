const Paragraph = require("./paragraph.js");

class SidebarSection extends React.Component {
	constructor(properties) {
		super(properties);
		this.state = {
			expanded: this.props.expanded || true,
		};
	}

	render() {
		return elem("div", {
			children: [
				elem("div", {
					children: [
						elem("button", {
							children: elem("i", {
								class: "fas fa-angle-" + (this.state.expanded ? "down" : "up"),
							}),
							style: {
								background: "none",
								border: "none",
								width: "initial",
								height: "initial",
								padding: 5,
								fontSize: 18,
								color: "white",
								outline: "none",
							},
							onClick: () => {
								this.setState({
									expanded: !this.state.expanded,
								});
							},
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
					],
				}),
			],
		});
	}
}
module.exports = SidebarSection;