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
