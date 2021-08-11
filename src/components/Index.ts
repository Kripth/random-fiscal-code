import GeneratorForm from "./GeneratorForm";
import Toast from "./Toast";
import { LanguageGroup } from "../utils/lang";
import h from "../utils/element";

export default function Index(lang: LanguageGroup) {

	const url = "https://fiscalcode.krpt.cc/";

	const isEnglish = lang.code.value === "en";

	const canonical = (isEnglish: boolean) => isEnglish ? url : url + "it";

	return h("html", { lang: lang.code },
		h("head", {},
			h("title", {}, lang.title),
			h("meta", { charset: "UTF-8" }),
			h("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
			h("meta", { name: "description", content: lang.description }),
			h("link", { rel: "canonical", href: canonical(isEnglish) }),
			h("link", { rel: "alternate", hreflang: isEnglish ? "it" : "en", href: canonical(!isEnglish) }),
			!isEnglish && h("link", { rel: "alternate", hreflang: "x-default", href: url }),
			h("link", { rel: "stylesheet", href: "main.css" })
		),
		h("body", {},
			h("div", { style: "text-align:center;margin:1rem 0" },
				h("h3", { style: "margin-bottom:.25rem" }, lang.title),
				h("div", { style: "font-size:.75rem" },
					h("a", { href: "https://github.com/Kripth/random-fiscal-code", target: "_blank" }, "GitHub"),
					h("a", { href: isEnglish ? "./it" : "./", style: "margin-left:.4rem" }, isEnglish ? "Questa pagina in italiano" : "This page in english"),
				)
			),
			h("div", { style: "margin:0 auto;max-width:800px" },
				GeneratorForm(lang)
			),
			Toast(lang),
			h("script", { src: "bundle.js" })
		)
	);

}
