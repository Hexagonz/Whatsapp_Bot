import got from "got";
import { proto } from "@adiwajshing/baileys";

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
export function convertAngka(number: number): string {
	const data: string[] = String(number).split("").reverse()
	let combine: string = ''

	for (let i = 0; i < data.length; i++) {
		if ((i + 1) % 3 == 0 && i != data.length -1) {
			data[i] = `.${data[i]}`
		}
	}
	combine = `${data.reverse().join("")}`
	return combine
}
export function RandomOtp () {
	const otp: string[] = [];
	const data: string = "1234567890";
	for (let i: number = 0; i < 6; i++) {
		otp.push(data.charAt(Math.floor(Math.random() * data.length)))
	}
	return otp.join("")
}
export function CheckCommand (Patert: string, Prefix: string, isOwner: boolean): boolean {
	const Type: string[] = Object.keys(globalThis.CMD.events)
	let Status = false
	Type.map((value: string) => {
		if (!isOwner && value.startsWith("owner")) return Status
		if (typeof globalThis.CMD.events[value].pattern === "string") {
			if (new RegExp(`${Patert.replace(new RegExp(`${Prefix}`), "")}`, 'i').test(globalThis.CMD.events[value].pattern)) {
				Status = true
			}
		} else if (typeof globalThis.CMD.events[value].pattern === "object") {
			if (new RegExp(`${Patert.replace(new RegExp(`${Prefix}`), "")}`, 'i').test(globalThis.CMD.events[value].pattern)) {
				Status = true
			}
		}
	})
	return Status
}

export function CheckSticker (from: string, FileSha: string, Stick: Map<string, { sender: string, id: number, filesha: string, mess: proto.WebMessageInfo}[]>): boolean {
	let status: boolean = false
	const hasil: { sender: string, id: number, filesha: string, mess: proto.WebMessageInfo}[] = Stick.get(from)
	if (!hasil) return status
	const result: { sender: string, id: number, filesha: string, mess: proto.WebMessageInfo} = hasil.find((x) => x.filesha === FileSha)
	if (result) {
		status = true
	}
	return status
}
export async function AddSticker (Key: proto.WebMessageInfo, from: string, FileSha: string, sender: string, Stick: Map<string, { sender: string, id: number, filesha: string, mess: proto.WebMessageInfo}[]>): Promise <void> {
	if (Stick.has(from)) {
		const hasil: { sender: string, id: number, filesha: string, mess: proto.WebMessageInfo}[]= Stick.get(from)
		if (hasil.length === 3) {
			let respon: { sender: string, id: number, filesha: string, mess: proto.WebMessageInfo}[] = []
			hasil.map((x) => {
				if (x.id == 1) return
				x.id = Number(x.id - 1)
				respon.push(x)
			})
			Stick.set(from, [...respon, { sender: sender, id: 3, filesha: FileSha, mess: Key}])
		} else if (hasil.length === 2) {
			const hasil: { sender: string, id: number, filesha: string, mess: proto.WebMessageInfo}[] = Stick.get(from)
			Stick.set(from, [...hasil, { sender: sender, id: 3, filesha: FileSha, mess: Key}])
		} else if (hasil.length === 1) {
			const hasil: { sender: string, id: number, filesha: string, mess: proto.WebMessageInfo}[] = Stick.get(from)
			Stick.set(from, [...hasil, { sender: sender, id: 2, filesha: FileSha, mess: Key}])
		} else if (hasil.length === 0) {
			Stick.set(from, [{ sender: sender, id: 1, filesha: FileSha, mess: Key}])
		}
	} else {
		Stick.set(from, [{ sender: sender, id: 1, filesha: FileSha, mess: Key}])
	}
}