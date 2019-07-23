const React = require("react");
const Paragraph = require("./paragraph.jsx");

class SidebarSection extends React.Component {
	constructor(properties) {
		super(properties);
		this.state = {
			expanded: this.props.expanded || true,
		};
	}

	render() {
		return <div>
			<div style={{ textAlign: "center " }}>
				<button onClick={() => {
					this.setState({
						expanded: !this.state.expanded,
					});
				}} style={{
					background: "none",
					border: "none",
					color: "white",
					fontSize: 18,
					height: "initial",
					outline: "none",
					padding: 5,
					width: "initial",
				}} >
					<i className={"fas fa-angle-" + (this.state.expanded ? "down" : "up")}></i>
				</button>
				<h2 style={{
					display: "inline-block",
					marginBottom: 5,
				}}>
					{this.props.header}
				</h2>
			</div>
			{this.state.expanded && <div>
				{this.props.description && <Paragraph text={this.props.description} />}
				<div>{this.props.children}</div>
			</div>}
		</div>;
	}
}
module.exports = SidebarSection;