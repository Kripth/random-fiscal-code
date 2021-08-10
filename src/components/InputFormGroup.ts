import h from "../utils/element";
import FormGroup, { FormGroupProps } from "./FormGroup";

interface InputFormGroupProps extends FormGroupProps {
	type?: string;
	pattern?: string;
}

export default function InputFormGroup(props: InputFormGroupProps) {
	const { type, pattern } = props;
	return FormGroup(props, h("input", { class: "form-input", type, pattern } ));
}
