import h from "../utils/element";
import InputFormGroup from "./InputFormGroup";
import SelectFormGroup from "./SelectFormGroup";
import { LanguageGroup } from "../utils/lang";

export default function GeneratorForm(lang: LanguageGroup) {
	return h("form", { id: "form", class: "form-horizontal", style: "margin:0" },
		InputFormGroup({ lang, label: lang.firstName, name: "firstName", action: "clear" }),
		InputFormGroup({ lang, label: lang.lastName, name: "lastName", action: "clear" }),
		SelectFormGroup({ lang, label: lang.gender, name: "gender", empty: true, options: { "M": lang.male, "F": lang.female }, action: "clear"}),
		InputFormGroup({ lang, label: lang.birthdate, name: "birthdate", type: "date", action: "clear" }),
		InputFormGroup({ lang, label: lang.birthplace, name: "birthplace", pattern: "[A-Z][0-9]{3}", action: "clear" }),
		InputFormGroup({ lang, label: lang.fiscalCode, name: "fiscalCode", disabled: true, action: "copy" }),
		h("div", { class: "form-group buttons", style: "justify-content:flex-end" },
			h("div", { class: "col" },
				h("button", { type: "button", id: "reset", class: "btn" }, lang.reset),
				h("button", { type: "submit", class: "btn btn-primary", style: "margin-left:.4rem" }, lang.generate)
			)
		)
	);
}
