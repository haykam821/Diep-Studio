const React = require("react");
const ReactDOM = require("react-dom");

const Notification = require("./components/notification.jsx");

const notifs = [];

function renderNotifs() {
	ReactDOM.render(notifs, document.querySelector("#notifications"));
}
module.exports.renderNotifs = renderNotifs;

function notify(header, text, options = {}) {
	notifs.push(<Notification header={header} text={text} {...options} />);
	renderNotifs();
}
module.exports.notify = notify;