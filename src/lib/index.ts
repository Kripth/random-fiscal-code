import * as data from "./data";
import { encodeFirstName, encodeLastName, encodeDate, checksum } from "./encoding";
import { Data, DataEntry, DateRange, Options, Result } from "./types";

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

/**
 * Returns a random value from an array.
 */
function pickIn(value: string[]): string {
	return value[Math.floor(Math.random() * value.length)];
}

function pickIf(value: string | string[] | null, data: Data, encode: (value: string) => string) {
	if(value) {
		if(Array.isArray(value)) {
			// pick one from give options
			value = pickIn(value);
		}
		return [ value, encode(value) ];
	} else {
		const { value, encoded } = pick(data);
		return [ value, encoded ];
	}
}

function parseISODate(value: string): Date | null {
	const date = new Date(
		+value.substr(0, 4),
		+value.substr(5, 2) - 1,
		+value.substr(8, 2)
	);
	return isNaN(date.getTime()) ? null : date;
}

function generateDate(options: Options, isMale: boolean) {
	const value = options.birthdate;
	if(value instanceof Date) {
		return generateDateFromObject(value, isMale);
	} else if(typeof value === "string") {
		// parse ISO-8601 string
		const date = parseISODate(value);
		if(date) {
			return generateDateFromObject(date, isMale);
		}
	} else if(value) {
		// from defined range
		const parse = (value: Date | string | null) => typeof value === "string" ? parseISODate(value) : value;
		return generateDateFromRange(parse(value.min), parse(value.max), isMale);
	}
	return generateDateFromRange(null, null, isMale);
}

function generateDateFromRange(min: Date | null, max: Date | null, isMale: boolean) {
	if(!min) {
		min = new Date();
		min.setFullYear(min.getFullYear() - 88);
	}
	if(!max) {
		max = new Date();
		max.setFullYear(max.getFullYear() - 18);
	}
	return generateDateFromObject(new Date(min.getTime() + Math.floor(Math.random() * (max.getTime() - min.getTime()))), isMale);
}

function generateDateFromObject(date: Date, isMale: boolean) {
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();
	const pad = (value: number, length: number) => value.toString().padStart(length, "0");
	return [
		`${pad(year, 4)}-${pad(month + 1, 2)}-${pad(day, 2)}`,
		encodeDate([year, month, day], isMale)
	];
}

function generateBirthplace(value: string | string[] | null): string {
	if(value) {
		return Array.isArray(value) ? pickIn(value) : value;
	} else {
		return pick(data.comuni).value;
	}
}

export default function generate(options: Options): Result {

	const gender = options.gender ?? (Math.random() >= .5 ? "M" : "F");
	const isMale = gender === "M";

	const [ firstName, encodedFirstName ] = pickIf(options.firstName, isMale ? data.firstNamesM : data.firstNamesF, encodeFirstName);
	const [ lastName, encodedLastName ] = pickIf(options.lastName, data.lastNames, encodeLastName);

	const [ birthdate, encodedBirthdate ] = generateDate(options, isMale);

	const birthplace = generateBirthplace(options.birthplace);

	const encoded = encodedLastName + encodedFirstName + encodedBirthdate + birthplace;
	const fiscalCode = encoded + checksum(encoded);

	return { fiscalCode, firstName, lastName, gender, birthdate, birthplace };

}
