export interface DataEntry {
	min: number;
	max: number;
	value: string;
	encoded?: string;
}

export interface Data {
	total: number;
	entries: DataEntry[];
}

export type Gender = "M" | "F";

export type DateRange = {
	min: Date | string | null;
	max: Date | string | null;
};

export type Options = {
	firstName: string | string[] | null;
	lastName: string | string[] | null;
	gender: Gender | null;
	birthdate: Date | string | DateRange | null;
	birthplace: string | string[] | null;
};

export interface Result {
	firstName: string;
	lastName: string;
	gender: Gender;
	birthdate: string;
	birthplace: string;
	fiscalCode: string;
}
