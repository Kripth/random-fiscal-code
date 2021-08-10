/** @global chrome */
import { Result } from "../../lib/types";
import generate from "./generate";

const button = document.getElementById("inject") as HTMLButtonElement;

let result = null as Result;

generate(newResult => {
	result = newResult;
	button.disabled = !result;
});

function inject(result: Result) {
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
				// @ts-ignore
				element.value = result[key];
				break;
			}
		}
	}
}

button.addEventListener("click", () => {
	// @ts-ignore
	chrome.tabs.query({active: true, currentWindow: true}, tab => {
		// @ts-ignore
		chrome.tabs.executeScript(tab.id, {
			code: `(${inject})(${JSON.stringify(result)});`
		});
	});
});
