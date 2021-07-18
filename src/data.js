import { readFile, writeFile } from "fs";

// create data from csv

let counter = 0;
let file = `import { List } from "./types";

const m = (name: string, encoded: string, weight: number) => <List>({name, encoded, weight});

`;

function readImpl(fname, varname) {
	counter++;
	readFile(`data/${fname}.csv`, "utf-8", (error, data) => {
		if(error) {
			console.error(error);
		} else {
			let total = 0;
			const value = data.split("\n").slice(1).map(row => {
				const [ name, enc, weight ] = row.split(",");
				total += +weight;
				return `m("${name}","${enc}",${weight})`;
			}).join(",");
			file += `export const ${varname}: [List[], number] = [[${value}], ${total}];\n`;
		}
		if(--counter === 0) {
			writeFile("src/_data.ts", file, () => {});
		}
	});
}

readImpl("first_names_m", "firstNamesM");
readImpl("first_names_f", "firstNamesF");
readImpl("last_names", "lastNames");
readImpl("comuni", "comuni");
