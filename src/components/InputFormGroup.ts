import h from "../utils/element";
import FormGroup from "./FormGroup";
import { Translation } from "../utils/lang";

export default function InputFormGroup(label: Translation, name: string, disabled = false, type?: string, pattern?: string) {
	return FormGroup(label, name, disabled, h("input", { class: "form-input", type, pattern } ));
}
