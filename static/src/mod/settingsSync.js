// This is in no way secure
function init() {
	window.onmessage = (e) => {
		try {
			const settings = JSON.parse(e.data);
			
		} catch {
			console.error('Failed to parse message');
		}
		if (e.data == 'hello') {
			alert('It works!');
		}
	};
}
