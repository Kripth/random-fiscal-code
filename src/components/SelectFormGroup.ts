import FormGroup, { FormGroupProps } from "./FormGroup";
import h from "../utils/element";
import { Translation } from "../utils/lang";

interface SelectFormGroupProps extends FormGroupProps {
	empty?: boolean;
	options: Record<string, string | Translation>;
}

export default function SelectFormGroup(props: SelectFormGroupProps) {
	return FormGroup(props, h("select", { class: "form-input" },
			props.empty && h("option"),
		...Object.entries(props.options).map(([ value, label ]) => h("option", { value }, label))
	));
}
