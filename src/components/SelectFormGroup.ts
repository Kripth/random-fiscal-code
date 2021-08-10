import h from "../utils/element";
import FormGroup from "./FormGroup";

export default function SelectFormGroup(label: string, name: string, empty = false, options: Record<string, string>) {
	return FormGroup(label, name, false, h("select", { class: "form-input" },
			empty && h("option"),
		...Object.entries(options).map(([ value, label ]) => h("option", { value }, label))
	));
}
