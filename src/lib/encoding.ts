const months = "ABCDEHLMPRST".split("");

const odds = [1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 2, 4, 18, 20, 11, 3, 6, 8, 12, 14, 16, 10, 22, 25, 24, 23];

export function encodeFirstName(value: string) {
	const consonants = value.toUpperCase().replace(/[ ']/g, "").replace(/[AEIOU]/g, "");
	if(consonants.length > 3) {
		return consonants.charAt(0) + consonants.substr(2, 2);
	} else {
		return encodeLastName(value);
	}
}

export function encodeLastName(value: string) {
	const upper = value.toUpperCase();
	return (upper.replace(/[ ']/g, "").replace(/[AEIOU]/g, "") + upper.replace(/[^AEIOU]/g, "") + "XX")
		.substr(0, 3);
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
