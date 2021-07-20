import * as data from "./_data";
import { encodeName, encodeDate, checksum } from "./encoding";
import { Data, DataEntry } from "./types";

type Gender = "M" | "F";

type Options = {
	firstName: string | null;
	lastName: string | null;
	gender: Gender | null;
	birthdate: Date | string | null;
	birthplace: string | null;
};

function pick({ total, entries }: Data): DataEntry {
	const seed = Math.floor(Math.random() * total);
	let min = 0;
	let max = entries.length - 1;
	while(true) {
		const i = min + Math.floor((max - min) / 2);
		const entry = entries[i];
		if(seed < entry.min) {
			max = i - 1;
		} else if(seed >= entry.max) {
			min = i + 1;
		} else {
			return entry;
		}
	}
}

function pickIf(value: string | null, data: Data) {
	if(value) {
		return [ value, encodeName(value) ];
	} else {
		const { value, encoded } = pick(data);
		return [ value, encoded ];
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

	const birthplace = options.birthplace ?? pick(data.comuni).value;

	const encoded = encodedLastName + encodedFirstName + encodedBirthdate + birthplace;
	const fiscalCode = encoded + checksum(encoded);

	return { fiscalCode, firstName, lastName, gender, birthdate, birthplace };

}
