const React = require("react");

const styled = require("styled-components").default;

const Notification = styled(class Notification extends React.Component {
	render() {
		return <div width={50} className={this.props.className}>
			<h3 style={{
				fontSize: "initial",
				fontWeight: "bold",
				margin: 0,
			}}>
				{this.props.header}
			</h3>
			{this.props.text && <p style={{ margin: 0 }}>
				{this.props.text}
			</p>}
		</div>;
	}
})`
	background-color: white;
	border-radius: 8px,
	margin: 8px;
	padding: 8px;
	text-align: center;
`;
Notification.defaultProps = {
	header: "Notification",
};
module.exports = Notification;