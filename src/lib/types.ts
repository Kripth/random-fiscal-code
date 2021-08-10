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

export type Options = {
	firstName: string | null;
	lastName: string | null;
	gender: Gender | null;
	birthdate: Date | string | null;
	birthplace: string | null;
};

export interface Result {
	firstName: string;
	lastName: string;
	gender: Gender;
	birthdate: string;
	birthplace: string;
	fiscalCode: string;
}
