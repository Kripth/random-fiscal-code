import GeneratorForm from "./GeneratorForm";
import { Lang } from "../utils/lang";
import h from "../utils/element";

export default function Index(lang: Lang) {

	//TODO add language switch
	//TODO add footer

	return h("html", { lang: lang.code },
		h("head", {},
			h("title", {}, "Random Fiscal Code"),
			h("meta", { charset: "UTF-8" }),
			h("link", { rel: "stylesheet", href: "main.css" })
		),
		h("body", {},
			h("div", { style: "margin:0 auto;max-width:800px" },
				GeneratorForm(lang)
			),
			h("script", { src: "bundle.js" })
		)
	);

}
