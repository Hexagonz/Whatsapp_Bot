export interface Response {
	command: string;
	prefix: string;
	tag: string
}
export declare let Global: Response["command"]

export declare global {
	var command: string;
	var prefix: string;
	var tag: string;
}