class Notification extends React.Component {
	render() {
		return elem("div", {
			children: [
				elem("h3", {
					style: {
						fontSize: "initial",
						fontWeight: "bold",
						margin: 0,
					},
				}, this.props.header),
				this.props.text && elem("p", {
					style: {
						margin: 0,
					},
				}, this.props.text),
			],
			style: {
				borderRadius: 8,
				backgroundColor: "white",
				margin: 8,
				padding: 8,
				textAlign: "center",
			},
			width: 50,
		});
	}
}
Notification.defaultProps = {
	header: "Notification",
};
module.exports = Notification;