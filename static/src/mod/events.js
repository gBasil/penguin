/**
 * Callback function that returns data
 * @callback eventCallback
 * @param {any} data
 */

/**
 * Handle events being sent from the other page
 * @param {string} event 
 * @param {eventCallback} callback 
 */
function handleEvent(event, callback) {
	window.document.addEventListener(event, e => callback(e.detail), false);
}

/**
 * Send a message between the iframe and parent
 * @param {string} event The name/key of the event
 * @param {any} data The data to send
 * @param {boolean} [self=false]
 */
function sendEvent(key, data, self = false) {
	const event = new CustomEvent(key, { detail: data ?? null });

	// If we send it to both, we don't need logic
	if (self) {
		document.querySelector('santa-gameloader')._activeFrame.contentDocument.dispatchEvent(event);
		window.parent.document.dispatchEvent(event);
		return;
	}

	// Determine if we're sending parent -> iframe or iframe -> parent
	if (window.parent === window) {
		document.querySelector('santa-gameloader')._activeFrame.contentDocument.dispatchEvent(event);
	} else {
		window.parent.document.dispatchEvent(event);
	}
}

export { handleEvent, sendEvent };