import { LanguageGroup } from "../utils/lang";
import h from "../utils/element";

export default function Toast(lang: LanguageGroup) {
	return h("div", { class: "toast", style: "display:none;position:fixed;top:16px;width:300px;left:50%;transform:translateX(-50%)" },
		h("button", { type: "button", class: "btn btn-clear float-right" }),
		"Copied to clipboard"
	);
}
