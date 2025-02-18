export function load() {
	const one = {
		moderationType: 'warning',
		note: 'Derogatory language and references of, are not allowed on Revilium. You have been warned.',
		actions: [
			{
				type: 'Derogatory Language',
				content: 'Chat Message: "N word lol am i right guys haha"'
			}
		]
	};

	const fourteenday = new Date();
	fourteenday.setDate(new Date().getDate() + 3);

	const two = {
		moderationType: 'ban',
		unbannedOn: fourteenday,
		note: 'Harassment is forbidden on Revilium. Repeat offenses will result in termination.',
		actions: [
			{
				type: 'Harassment',
				content: `Chat message on ${new Date().toLocaleDateString()} @ ${new Date().toLocaleTimeString()}: "fatty"`
			},
			{
				type: 'Harassment',
				content: 'Asset Name: "brandan is fat"<br>Asset ID: 1537'
			}
		]
	};

	const three = {
		moderationType: 'terminated',
		note: 'Adult content is forbidden on Revilium. Your account has been terminated.',
		actions: [
			{
				type: 'Adult Content',
				content: 'Asset Name: "porn"<br>Asset ID: 1535'
			},
			{
				type: 'Adult Content',
				content: 'Asset Name: "more porn"<br>Asset ID: 1536'
			}
		]
	};

	return two;
}
