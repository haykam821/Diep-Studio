const React = require("react");
const styled = require("styled-components").default;

const Paragraph = require("./paragraph.jsx");

const Icon = require("./icon.jsx");
const { faAngleDown, faAngleRight } = require("@fortawesome/free-solid-svg-icons");

class SidebarSectionUnstyled extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			expanded: true,
		};

		this.toggleExpansion = this.toggleExpansion.bind(this);
	}

	toggleExpansion() {
		this.setState({
			expanded: !this.state.expanded,
		});
	}

	render() {
		return <div className={this.props.className}>
			<div className="header">
				<button onClick={this.toggleExpansion} >
					<Icon icon={this.state.expanded ? faAngleDown : faAngleRight} />
				</button>
				<h2>
					{this.props.header}
				</h2>
			</div>
			{this.state.expanded && <div>
				{this.props.description && <Paragraph>
					{this.props.description}
				</Paragraph>}
				<div>
					{this.props.children}
				</div>
			</div>}
		</div>;
	}
}
SidebarSectionUnstyled.propTypes = {

};

const SidebarSection = styled(SidebarSectionUnstyled)`
	.header {
		text-align: center;

		button {
			background: none;
			border: none;
			color: white;
			font-size: 18px;
			height: initial;
			outline: none;
			padding: 5px;
			width: initial;
		}

		h2 {
			display: inline-block;
			margin-bottom: 5px;
		}
	}
`;
module.exports = SidebarSection;
