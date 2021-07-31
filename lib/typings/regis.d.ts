export interface Registrasi {
	id: string;
	status: boolean;
	hit: number;
	verify: {
		otp: null | string;
		action: null | number;
		status: boolean;
	},
	prefix: string[]
	multi: boolean;
	Prefix: string;
}