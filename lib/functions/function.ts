import got from "got";

export function isUrl (Link: string): RegExpMatchArray | null {
	return Link.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}
export async function Buffer(Url: string): Promise <Buffer> {
	const data = await got(Url, {
		method: "GET",
		headers: {
			"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
		}
	}).buffer()
	return data
}
export function Tunggu (ms: number) {
	return new Promise (resolve => setTimeout(resolve, ms))
}
export function Runtime(seconds: number): string {
	seconds = Number(seconds);
	var day = Math.floor(seconds / (3600 * 24));
	var hours = Math.floor(seconds % (3600 * 24) / 3600);
	var minutes = Math.floor(seconds % 3600 / 60);
	var second = Math.floor(seconds % 60);
	var dDisplay = day > 0 ? day + (day == 1 ? " Hari " : " hari ") : "";
	var hDisplay = hours > 0 ? hours + (hours == 1 ? " Jam " : " jam ") : "";
	var mDisplay = minutes > 0 ? minutes + (minutes == 1 ? " Menit " : " menit ") : "";
	var sDisplay = second  > 0 ? second  + (second  == 1 ? " Detik" : " detik") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}
export function RandomName (jumlah: number): string {
	const result: string[] = []
	const karakter: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let Total: number = karakter.length;
	for (let i: number = 0; i < jumlah; i++) {
		result.push(karakter.charAt(Math.floor(Math.random() * Total)))
	}
	return result.join('');
}