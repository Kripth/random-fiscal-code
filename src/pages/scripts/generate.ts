import { Options, Result } from "../../lib/types";
import generate from "../../lib/index";
import "spectre.css/dist/spectre.min.css";
import "spectre.css/dist/spectre-icons.min.css";

export default function(callback: (result: Result) => any) {

	const form = document.getElementById("form") as HTMLFormElement;

	const toast = document.querySelector(".toast") as HTMLElement;

	const hideToast = () => toast.style.display = "none";

	let toastTimeout: any = null;

	form.addEventListener("submit", (event: Event) => {
		event.preventDefault();
		const data = new FormData(form);
		const get = (name: string): any => {
			const value = data.get(name) as string;
			if(value) {
				const splitted = value.split(",");
				if(splitted.length > 1) {
					return splitted.map(v => v.trim());
				}
				return value;
			}
			return null;
		};
		const result = generate({
			firstName: get("firstName"),
			lastName: get("lastName"),
			gender: get("gender"),
			birthdate: get("birthdate"),
			birthplace: get("birthplace")
		} as Options);
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

	document.querySelectorAll<HTMLButtonElement>("[data-action]").forEach(element => {
		element.addEventListener("click", () => {
			const input = element.previousElementSibling as HTMLInputElement;
			if(element.dataset.action === "clear") {
				input.value = "";
			} else {
				const value = input.value;
				if(value) {
					// copy to clipboard
					navigator.clipboard.writeText(input.value);
					if(toastTimeout) {
						clearTimeout(toastTimeout);
					}
					toastTimeout = setTimeout(hideToast, 2000);
					toast.style.display = "";
				}
			}
		});
	});

	toast.querySelector(".btn-clear").addEventListener("click", hideToast);

}
