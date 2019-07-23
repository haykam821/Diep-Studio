const React = require("react");
const elem = React.createElement;

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
							onClick: () => {
								this.setState({
									expanded: !this.state.expanded,
								});
							},
							style: {
								background: "none",
								border: "none",
								color: "white",
								fontSize: 18,
								height: "initial",
								outline: "none",
								padding: 5,
								width: "initial",
							},
						}),
						elem("h2", {
							children: this.props.header,
							style: {
								display: "inline-block",
								marginBottom: 5,
							},
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