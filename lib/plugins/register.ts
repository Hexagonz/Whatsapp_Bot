import * as fs from "fs";
import { Registrasi } from "../typings"

const _path: string = `./lib/database/register.json`
var _database: Registrasi[] = JSON.parse(fs.readFileSync(_path).toString())

export const AddRegister = (sender: string): unknown => {
	if (_database.find((value: Registrasi) => value.id == sender)) return;
	const Format: Registrasi  = {
		id: sender,
		status: false,
		verify: {
			otp: null,
			action: null,
			status: false
		},
		prefix:  ["@", "#", "$", "%", "°", "•", "π", "÷", "×", "¶", "+", "∆", "£", "¢", "€", "¥", "®", "™", "✓", "_", "=", "|", "~", "!", "?", "^", "&", ".", "©", "^"],
		multi: true,
		Prefix: "."
	}
	_database.push(Format)
	if (fs.existsSync(_path)) fs.writeFileSync(_path, JSON.stringify(_database))
}
export const setPrefix = (Prefix: string | undefined, sender: string): string => {
	const posisi: number = _database.findIndex((value: Registrasi) => value.id == sender)
	if (posisi !== -1) {
		_database[posisi].Prefix = Prefix ? Prefix : "."
		if (fs.existsSync(_path)) fs.writeFileSync(_path, JSON.stringify(_database))
		return Prefix ? Prefix : "."
	}
}
export const addPrefixMulti = (sender: string, Prefix: string) => {
	const data: Registrasi | undefined = _database.find((value: Registrasi) => value.id == sender)
	if (data) {
		const posisi: number = _database.findIndex((value: Registrasi) => value.id == sender)
		_database[posisi].prefix.push(Prefix)
		if (fs.existsSync(_path)) fs.writeFileSync(_path, JSON.stringify(_database))
	}
}
export const delPrefixMulti = (sender: string, Prefix: string) => {
	const data: Registrasi | undefined = _database.find((value: Registrasi) => value.id == sender)
	if (data) {
		const posisi: number = _database.findIndex((value: Registrasi) => value.id == sender)
		const Lock: number = _database[posisi].prefix.findIndex((value: string) => value == Prefix)
		_database[posisi].prefix.splice(Lock, 1)
		if (fs.existsSync(_path)) fs.writeFileSync(_path, JSON.stringify(_database))
	}
}
export const getMulti = (sender: string) => {
	const data: Registrasi | undefined = _database.find((value: Registrasi) => value.id == sender)
	if (data) {
		return data.prefix.join(", ")
	}
}
export const statusPrefix = (sender: string): boolean => {
	const data: Registrasi | undefined = _database.find((value: Registrasi) => value.id == sender)
	let status: boolean = false
	if (data && data.multi) {
		status = true
	}
	return status
}
export const multiPrefix = (status: boolean, sender: string): boolean | undefined => {
	const data: Registrasi | undefined = _database.find((value: Registrasi) => value.id == sender)
	if (status) {
		const posisi: number = _database.findIndex((value: Registrasi) => value.id == sender)
		_database[posisi].multi = true
		if (fs.existsSync(_path)) fs.writeFileSync(_path, JSON.stringify(_database))
		return true
	} else {
		const posisi: number = _database.findIndex((value: Registrasi) => value.id == sender)
		_database[posisi].multi = false
		if (fs.existsSync(_path)) fs.writeFileSync(_path, JSON.stringify(_database))
		return true
	}
}
export const getPRefix = (sender: string, command: string): string => {
	const data: Registrasi | undefined = _database.find((value: Registrasi) => value.id == sender)
	if (data) {
		if (data.multi) {
			let hasil: string =  "MULTI PREFIX"
			const prefix:  RegExpMatchArray | string | null =  new RegExp(`^[${data.prefix.join("")}]`, "gi").test(command) ? command.match(new RegExp(`^[${data.prefix.join("")}]`, "gi")) : "MULTI PREFIX"
			if (typeof prefix !== "string" && prefix !== null) hasil = prefix[0]
			return hasil
		} else {
			return data.Prefix
		}
	} else {
		return "."
	}
}