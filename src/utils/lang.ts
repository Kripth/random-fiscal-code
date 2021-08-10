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
		public fiscalCode: Translation,
		public firstName: Translation,
		public lastName: Translation,
		public gender: Translation,
		public male: Translation,
		public female: Translation,
		public birthdate: Translation,
		public birthplace: Translation,
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
	fiscalCode: string,
	firstName: string,
	lastName: string,
	gender: string,
	male: string,
	female: string,
	birthdate: string,
	birthplace: string,
	reset: string,
	generate: string
) {
	return new LanguageGroup(
		t("code", code),
		t("title", title),
		t("fiscalCode", fiscalCode),
		t("firstName", firstName),
		t("lastName", lastName),
		t("gender", gender),
		t("male", male),
		t("female", female),
		t("birthdate", birthdate),
		t("birthplace", birthplace),
		t("reset", reset),
		t("generate", generate)
	);
}

export const en = group(
	"en",
	"Random Fiscal Code",
	"Fiscal Code",
	"First Name",
	"Last Name",
	"Gender",
	"Male",
	"Female",
	"Birth Date",
	"Birth Place",
	"Reset",
	"Generate"
);

export const it = group(
	"it",
	"Codice Fiscale Casuale",
	"Codice Fiscale",
	"Nome",
	"Cognome",
	"Genere",
	"Maschio",
	"Femmina",
	"Data di Nascita",
	"Luogo di Nascita",
	"Ripristina",
	"Genera"
);
