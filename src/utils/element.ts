export class Element {

	constructor(
		private tagName: string,
		private attrs: {[key: string]: any},
		private children: (Element | string)[]
	) {}

	assign(attrs: {[key: string]: any}) {
		Object.assign(this.attrs, attrs);
		return this;
	}

	toString(): string {
		let ret = "<" + this.tagName;
		if(this.attrs) {
			for(const [ name, value ] of Object.entries(this.attrs)) {
				if(value === true) {
					ret += ` ${name}`;
				} else if(value) {
					ret += ` ${name}="${value}"`;
				}
			}
		}
		if(["meta", "link", "input"].includes(this.tagName)) {
			// self-closing
			return ret + "/>";
		}
		ret += ">";
		for(const child of this.children) {
			if(child instanceof Element) {
				ret += child.toString();
			} else {
				ret += child
					.replace(/</gm, "&lt;")
					.replace(/>/gm, "&gt;");
			}
		}
		return `${ret}</${this.tagName}>`;
	}

}

export default function(tagName: string, attrs?: {[key: string]: any}, ...children: (Element | string | null)[]): Element {
	return new Element(tagName, attrs ?? {}, children.filter(e => e));
}
