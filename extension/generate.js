let lastResult = null;

const populateButton = document.querySelector("#populate");

document.querySelector("form").addEventListener("submit", event => {
	event.preventDefault();
	const entries = [...new FormData(event.target).entries()];
	const options = Object.fromEntries(entries.filter(([, value]) => value));
	const result = generate.default(options);
	for(const [ key, value ] of Object.entries(result)) {
		document.getElementById(key).value = value;
	}
	lastResult = result;
	populateButton.disabled = false;
});

document.querySelector("#reset").addEventListener("click", () => {
	for(const element of document.querySelectorAll("form [name]")) {
		element.value = "";
	}
	populateButton.disabled = true;
});

populateButton.addEventListener("click", async () => {
	chrome.tabs.query({active: true, currentWindow: true}, tab => {
		chrome.tabs.executeScript(tab.id, {
			code: `(${injectResult})(${JSON.stringify(lastResult)});`
		});
	});
});

function injectResult(result) {
	// try to populate tab's document
	const aliases = {
		fiscalCode: ["fiscalCode", "fiscal-code", "fiscal_code", "codiceFiscale", "codice-fiscale", "codice_fiscale"],
		firstName: ["first-name", "first_name", "name", "nome"],
		lastName: ["last-name", "last_name", "surname", "cognome"],
		birthdate: ["birth-date", "birth", "bday", "dob"]
	};
	for(const [ key, values ] of Object.entries(aliases)) {
		for(const name of [key, ...values]) {
			const element = document.querySelector(`[name='${name}']`);
			if(element) {
				element.value = result[key];
				break;
			}
		}
	}
}
