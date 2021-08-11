import h, { Element } from "../utils/element";
import { LanguageGroup, Translation } from "../utils/lang";

type Action = "clear" | "copy";

export interface FormGroupProps {
	lang: LanguageGroup,
	label: Translation;
	name: string;
	disabled?: boolean;
	action?: Action;
}

function toIcon(action: Action) {
	return `icon icon-${action === "clear" ? "cross" : "copy"}`;
}

export default function FormGroup({ lang, label, name, disabled, action }: FormGroupProps, child: Element) {
	const id = name;
	child.assign({ name, id, disabled });
	return h("div", { class: "form-group" },
		h("div", { class: "col-4" },
			h("label", { class: "form-label", for: id }, label)
		),
		h("div", { class: "col-8" }, action ?
			h("div", { class: "input-group" }, child,
				h("button", { type: "button", class: "btn btn-primary tooltip tooltip-left", tabindex: -1, "data-action": action, "data-tooltip": action === "clear" ? lang.clear : lang.copy },
					h("i", { class: toIcon(action) })
				)
			) :
			child
		)
	);
}
