import h, { Element } from "../utils/element";

export default function FormGroup(label: string, name: string, disabled = false, child: Element) {
	const id = name;
	return h("div", { class: "form-group" },
		h("div", { class: "col-4" },
			h("label", { class: "form-label", for: id }, label)
		),
		h("div", { class: "col-8" }, child.assign({ name, id, disabled }))
	);
}