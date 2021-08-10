import { Options, Result } from "../../lib/types";
import generate from "../../lib/index";
import "spectre.css/dist/spectre.min.css";

export default function(callback: (result: Result) => any) {

	const form = document.getElementById("form") as HTMLFormElement;

	form.addEventListener("submit", (event: Event) => {
		event.preventDefault();
		// @ts-ignore
		const entries = [...new FormData(form).entries()];
		const options = Object.fromEntries(entries.filter(([, value]) => value)) as Options;
		const result = generate(options);
		for(const [ key, value ] of Object.entries(result)) {
			(document.getElementById(key) as HTMLInputElement).value = value;
		}
		callback(result);
	});

	document.getElementById("reset").addEventListener("click", () => {
		form.querySelectorAll<any>("form [name]").forEach(element => {
			element.value = "";
		});
		callback(null as Result);
	});

}
