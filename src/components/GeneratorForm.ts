import h from "../utils/element";
import InputFormGroup from "./InputFormGroup";
import SelectFormGroup from "./SelectFormGroup";
import { LanguageGroup } from "../utils/lang";

export default function GeneratorForm(lang: LanguageGroup) {
	return h("form", { id: "form", class: "form-horizontal", style: "margin:0" },
		InputFormGroup(lang.firstName, "firstName"),
		InputFormGroup(lang.lastName, "lastName"),
		SelectFormGroup(lang.gender, "gender", true, { "M": lang.male, "F": lang.female }),
		InputFormGroup(lang.birthdate, "birthdate", false, "date"),
		InputFormGroup(lang.birthplace, "birthplace", false, null,"[A-Z][0-9]{3}"),
		InputFormGroup(lang.fiscalCode, "fiscalCode",true),
		h("div", { class: "form-group buttons", style: "justify-content:flex-end" },
			h("div", { class: "col" },
				h("button", { type: "button", id: "reset", class: "btn" }, lang.reset),
				h("button", { type: "submit", class: "btn btn-primary", style: "margin-left:.4rem" }, lang.generate)
			)
		)
	);
}
