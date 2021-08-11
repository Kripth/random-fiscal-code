export class Translation {

	constructor(public key: string, public value: string) {}

	toString() {
		return this.value;
	}

}

export class LanguageGroup {

	constructor(
		public code: Translation,
		public title: Translation,
		public description: Translation,
		public fiscalCode: Translation,
		public firstName: Translation,
		public lastName: Translation,
		public gender: Translation,
		public male: Translation,
		public female: Translation,
		public birthdate: Translation,
		public birthplace: Translation,
		public clear: Translation,
		public copy: Translation,
		public reset: Translation,
		public generate: Translation
	) {}

	toMessages() {
		return JSON.stringify(Object.fromEntries(Object.values(this).map(({ key, value }) => [ key, { message: value }])));
	}

}

function t(key: string, value: string) {
	return new Translation(key, value);
}

function group(
	code: string,
	title: string,
	description: string,
	fiscalCode: string,
	firstName: string,
	lastName: string,
	gender: string,
	male: string,
	female: string,
	birthdate: string,
	birthplace: string,
	clear: string,
	copy: string,
	reset: string,
	generate: string
) {
	return new LanguageGroup(
		t("code", code),
		t("title", title),
		t("description", description),
		t("fiscalCode", fiscalCode),
		t("firstName", firstName),
		t("lastName", lastName),
		t("gender", gender),
		t("male", male),
		t("female", female),
		t("birthdate", birthdate),
		t("birthplace", birthplace),
		t("clear", clear),
		t("copy", copy),
		t("reset", reset),
		t("generate", generate)
	);
}

export const en = group(
	"en",
	"Random Fiscal Code",
	"Generate random and semi-random italian fiscal codes",
	"Fiscal Code",
	"First Name",
	"Last Name",
	"Gender",
	"Male",
	"Female",
	"Birth Date",
	"Birth Place",
	"Clear",
	"Copy",
	"Reset",
	"Generate"
);

export const it = group(
	"it",
	"Codice Fiscale Casuale",
	"Genera codici fiscali casuali e semicasuali",
	"Codice Fiscale",
	"Nome",
	"Cognome",
	"Genere",
	"Maschio",
	"Femmina",
	"Data di Nascita",
	"Luogo di Nascita",
	"Cancella",
	"Copia",
	"Ripristina",
	"Genera"
);
