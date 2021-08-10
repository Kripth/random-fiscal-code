import GeneratorForm from "../components/GeneratorForm";
import { en } from "../utils/lang";
import h from "../utils/element";

export default function Extension() {

	//const lang = typeof window === "object" && window.navigator.language.substr(0, 2) === "it" ? it : en;

	return {
		"popup.html": h("html", {},
			h("head", {},
				h("title", {}, "Random Fiscal Code"),
				h("meta", { charset: "UTF-8" }),
				h("link", { rel: "stylesheet", href: "main.css" })
			),
			h("body", {},
				h("div", { style: "width:400px;margin:16px" },
					h("div", { style: "text-align:center" },
						h("h5", {}, "Generate (random) fiscal codes")
					),
					GeneratorForm(en),
					h("div", { class: "form-group", style: "text-align:right" },
						h("button", { id: "inject", type: "button", class: "btn btn-success", disabled: true }, "Inject")
					)
				),
				h("script", { src: "bundle.js" })
			)
		).toString()
	};

}
