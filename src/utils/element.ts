import { Translation } from "./lang";

export class Element {

	constructor(
		private tagName: string,
		private attrs: {[key: string]: any},
		private children: (Element | string | Translation)[]
	) {}

	assign(attrs: {[key: string]: any}) {
		Object.assign(this.attrs, attrs);
		return this;
	}

	encode(keepLocale = false): string {
		let ret = "<" + this.tagName;
		if(this.attrs) {
			for(const [ name, value ] of Object.entries(this.attrs)) {
				if(value === true) {
					ret += ` ${name}`;
				} else if(value) {
					ret += ` ${name}="${value}"`;
					if(value instanceof Translation && keepLocale) {
						ret += ` data-locale="${value.key}" data-locale-attr="${name}"`;
					}
				}
			}
		}
		if(["meta", "link", "input"].includes(this.tagName)) {
			// self-closing
			return ret + "/>";
		}
		if(this.children.length === 1 && (this.children[0] instanceof Translation) && keepLocale) {
			const { key, value } = this.children[0];
			ret += ` data-locale="${key}">${value}`;
		} else {
			ret += ">";
			for(const child of this.children) {
				if(child instanceof Element) {
					ret += child.encode(keepLocale);
				} else if((child instanceof Translation) && keepLocale) {
					ret += `<span data-locale="${child.key}">${child.value}</span>`;
				} else {
					ret += child.toString()
						.replace(/</gm, "&lt;")
						.replace(/>/gm, "&gt;");
				}
			}
		}
		return `${ret}</${this.tagName}>`;
	}

}

export default function(tagName: string, attrs?: {[key: string]: any}, ...children: (Element | string | Translation | null)[]): Element {
	return new Element(tagName, attrs ?? {}, children.filter(e => e));
}
