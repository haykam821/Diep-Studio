const React = require("react");

class Notification extends React.Component {
	render() {
		return <div width={50} style={{
			backgroundColor: "white",
			borderRadius: 8,
			margin: 8,
			padding: 8,
			textAlign: "center",
		}}>
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
}
Notification.defaultProps = {
	header: "Notification",
};
module.exports = Notification;