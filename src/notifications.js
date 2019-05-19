const Notification = require("./components/notification.js");

const notifs = [];

function renderNotifs() {
	ReactDOM.render(notifs, document.getElementById("notifications"));
}
module.exports.renderNotifs = renderNotifs;

function notify(header, text, opts = {}) {
	notifs.push(elem(Notification, {
		header,
		text,
		...opts,
	}));
	renderNotifs();
}
module.exports.notify = notify;