import FormGroup from "./FormGroup";
import h from "../utils/element";
import { Translation } from "../utils/lang";

export default function SelectFormGroup(label: Translation, name: string, empty = false, options: Record<string, string | Translation>) {
	return FormGroup(label, name, false, h("select", { class: "form-input" },
			empty && h("option"),
		...Object.entries(options).map(([ value, label ]) => h("option", { value }, label))
	));
}
