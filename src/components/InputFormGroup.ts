import h from "../utils/element";
import FormGroup from "./FormGroup";

export default function InputFormGroup(label: string, name: string, disabled = false, type?: string, pattern?: string) {
	return FormGroup(label, name, disabled, h("input", { class: "form-input", type, pattern } ));
}
