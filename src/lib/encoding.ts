const months = "ABCDEHLMPRST".split("");

const odds = [1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 2, 4, 18, 20, 11, 3, 6, 8, 12, 14, 16, 10, 22, 25, 24, 23];

export function encodeName(value: string) {
	return (value.replace(/[ ']/g, "").replace(/[AEIOU]/gi, "") + value.replace(/[^AEIOU]/gi, "") + "XX")
		.substr(0, 3).toUpperCase();
}

export function encodeDate([y, m, d]: [number, number, number], isMale: boolean) {
	return y.toString().slice(-2) +
		months[m] +
		(d + (isMale ? 0 : 40)).toString().padStart(2, "0");
}

export function checksum(value: string) {
	let control = 0;
	value.split("").forEach((letter, i) => {
		const c = letter.charCodeAt(0);
		const v = c - (c >= 48 && c <= 58 ? 48 : 65);
		if(i % 2 === 1) {
			control += v;
		} else {
			control += odds[v];
		}
	});
	return String.fromCharCode(65 + control % 26);
}
