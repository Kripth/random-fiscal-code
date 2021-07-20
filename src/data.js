import { readFile, writeFile } from "fs";

// create data from csv

let counter = 0;
let file = `import { Data, DataEntry } from "./types";

function parse(...pool: [number, string, string?][]) {
\tlet total = 0;
\tconst entries = pool.map(([ weight, value, encoded ]) => {
\t\tconst min = total;
\t\tconst max = total += weight;
\t\treturn { min, max, value, encoded };
\t});
\treturn { total, entries };
}

`;

function readImpl(fname, varname, encoded) {
	counter++;
	readFile(`data/${fname}.csv`, "utf-8", (error, data) => {
		if(error) {
			console.error(error);
		} else {
			let total = 0;
			const value = data.split("\n").slice(1)
				.map(row => {
					const [ name, enc, weight ] = row.split(",");
					return { name, enc, weight: +weight };
				})
				.sort((a, b) => b.weight - a.weight)
				.map(({ name, enc, weight }) => `[${total += weight},"${name}"${encoded ? `,"${enc}"` : ""}]`)
				.join(",");
			file += `export const ${varname} = parse(${value});\n`;
		}
		if(--counter === 0) {
			writeFile("src/_data.ts", file, () => {});
		}
	});
}

readImpl("first_names_m", "firstNamesM", true);
readImpl("first_names_f", "firstNamesF", true);
readImpl("last_names", "lastNames", true);
readImpl("comuni", "comuni", false);
