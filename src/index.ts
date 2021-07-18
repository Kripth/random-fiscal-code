import * as data from "./_data";
import { encodeName, encodeDate, checksum } from "./encoding";
import { List } from "./types";

type Gender = "M" | "F";

type Options = {
	firstName: string | null;
	lastName: string | null;
	gender: Gender | null;
	birthdate: Date | string | null;
	birthplace: string | null;
};

type Pool = {
	list: List[];
	total: number;
};

function pick([list, total]: [list: List[], total: number]): [string, string] {
	let seed = Math.random() * total;
	for(const {name, encoded, weight} of list) {
		if(weight > seed) {
			return [name, encoded ?? encodeName(name)];
		}
		seed -= weight;
	}
	throw new Error("Oops");
}

function pickIf(value: string | null, pool: [list: List[], total: number]) {
	if(value) {
		return [value, encodeName(value)];
	} else {
		return pick(pool);
	}
}

function generateDate(options: Options, isMale: boolean) {
	const value = options.birthdate;
	if(value instanceof Date) {
		return generateDateImpl(value, isMale);
	} else if(typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
		// parse ISO-8601 string
		return [
			value,
			encodeDate([+value.substr(0, 4), +value.substr(5, 2) - 1, +value.substr(8, 2)], isMale)
		];
	} else {
		// generate random date
		return generateDateImpl(new Date(Math.random() * 1076886000000), isMale);
	}
}

function generateDateImpl(date: Date, isMale: boolean) {
	const arr = [date.getFullYear(), date.getMonth(), date.getDate()];
	const pad = (i: number, length: number) => arr[i].toString().padStart(length, "0");
	return [
		`${pad(0, 4)}-${pad(1, 2)}-${pad(2, 2)}`,
		encodeDate([date.getFullYear(), date.getMonth(), date.getDate()], isMale)
	];
}

export default function generate(options: Options) {

	const gender = options.gender ?? Math.random() >= .5 ? "M" : "F";
	const isMale = gender === "M";

	const [ firstName, encodedFirstName ] = pickIf(options.firstName, isMale ? data.firstNamesM : data.firstNamesF);
	const [ lastName, encodedLastName ] = pickIf(options.lastName, data.lastNames);

	const [ birthdate, encodedBirthdate ] = generateDate(options, isMale);

	const birthplace = options.birthplace ?? pick(data.comuni)[0];

	const encoded = encodedLastName + encodedFirstName + encodedBirthdate + birthplace;
	const fiscalCode = encoded + checksum(encoded);

	return { fiscalCode, firstName, lastName, gender, birthdate, birthplace };

}
