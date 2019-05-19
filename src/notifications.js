const React = require("react");
const elem = React.createElement;

const ReactDOM = require("react-dom");

const Notification = require("./components/notification.js");

const notifs = [];

function renderNotifs() {
	ReactDOM.render(notifs, document.querySelector("#notifications"));
}
module.exports.renderNotifs = renderNotifs;

function notify(header, text, options = {}) {
	notifs.push(elem(Notification, {
		header,
		text,
		...options,
	}));
	renderNotifs();
}
module.exports.notify = notify;