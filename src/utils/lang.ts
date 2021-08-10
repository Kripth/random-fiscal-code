export class Lang {

	constructor(
		public code: string,
		public title: string,
		public fiscalCode: string,
		public firstName: string,
		public lastName: string,
		public gender: string,
		public genders: [ string, string ],
		public birthdate: string,
		public birthplace: string,
		public reset: string,
		public generate: string
	) {}

}

export const en = new Lang(
	"en",
	"Random Fiscal Code",
	"Fiscal Code",
	"First Name",
	"Last Name",
	"Gender",
	[ "Male", "Female" ],
	"Birth Date",
	"Birth Place",
	"Reset",
	"Generate"
);

export const it = new Lang(
	"it",
	"Codice Fiscale Casuale",
	"Codice Fiscale",
	"Nome",
	"Cognome",
	"Genere",
	[ "Maschio", "Femmina" ],
	"Data di Nascita",
	"Luogo di Nascita",
	"Ripristina",
	"Genera"
);
