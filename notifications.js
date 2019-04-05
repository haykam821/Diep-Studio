const notifs = [];

function renderNotifs() {
	ReactDOM.render(notifs, document.getElementById("notifications"));
}
renderNotifs();

function notify(header, text, opts = {}) {
	notifs.push(elem(Notification, {
		header,
		text,
		...opts,
	}));
	renderNotifs();
}
