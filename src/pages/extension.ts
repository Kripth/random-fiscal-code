import GeneratorForm from "../components/GeneratorForm";
import Toast from "../components/Toast";
import { en, it } from "../utils/lang";
import h from "../utils/element";

export default function Extension() {

	//const lang = typeof window === "object" && window.navigator.language.substr(0, 2) === "it" ? it : en;

	return {
		"popup.html": h("html", {},
			h("head", {},
				h("title", {}, en.title),
				h("meta", { charset: "UTF-8" }),
				h("link", { rel: "stylesheet", href: "main.css" })
			),
			h("body", {},
				h("div", { style: "width:400px;margin:16px" },
					h("div", { style: "text-align:center" },
						h("h5", {}, en.title)
					),
					GeneratorForm(en),
					h("div", { class: "form-group", style: "text-align:right" },
						h("button", { id: "inject", type: "button", class: "btn btn-success", disabled: true }, "Inject")
					)
				),
				Toast(en),
				h("script", { src: "bundle.js" })
			)
		).encode(true),
		"/_locales/en/messages.json": en.toMessages(),
		"/_locales/it/messages.json": it.toMessages()
	};

}
