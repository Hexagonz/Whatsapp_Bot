export interface Registrasi {
	id: string;
	status: boolean;
	verify: {
		otp: null | string;
		action: null | number;
		status: boolean;
	},
	prefix: string[]
	multi: boolean;
	Prefix: string;
}