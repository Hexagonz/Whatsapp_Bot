import * as fs from "fs";
import { Registrasi } from "../typings"

const _path: string = `./lib/database/register.json`
var _database: Registrasi[] = JSON.parse(fs.readFileSync(_path).toString())

export const AddRegister = (sender: string): unknown => {
	if (_database.find((value: Registrasi) => value.id == sender)) return;
	const Format: Registrasi  = {
		id: sender,
		status: false,
		hit: 1,
		prefix:  ["@", "#", "$", "%", "°", "•", "π", "÷", "×", "¶", "∆", "£", "¢", "€", "¥", "®", "™", "✓", "_", "=", "|", "~", "!", "^", "&", ".", "©","'", '"', "`"],
		multi: true,
		Prefix: "."
	}
	_database.push(Format)
	if (fs.existsSync(_path)) fs.writeFileSync(_path, JSON.stringify(_database))
}
export const checkVerify = (sender: string): boolean => {
	const value = _database.find((value: Registrasi) => value.id == sender)
	if (value) {
		return value.status
	} else {
		return false
	}
}
export const SuccesVerify = (sender: string) => {
	const posisi = _database.findIndex((user: Registrasi) => user.id === sender)
	_database[posisi].status = true
	fs.writeFileSync(_path, JSON.stringify(_database))
}
export const Addhit = (sender: string) => {
	const posisi = _database.findIndex((user: Registrasi) => user.id === sender)
	_database[posisi].hit = Number(_database[posisi].hit + 1)
	fs.writeFileSync(_path, JSON.stringify(_database))
}
export const getHit = (id: string): number => {
	const data = _database.find((user: Registrasi) => user.id === id)
	if (data !== undefined) {
		return data.hit
	} else {
		return 0
	}
}
export const setPrefix = (Prefix: string | undefined, sender: string): string | undefined => {
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
		let status: boolean = true
		data.prefix.map((value: string) => {
			if (value === Prefix) status = false
		})
		if (!status) return
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
			data.prefix.map((value) => {
				if (command.startsWith(value)) {
					hasil = value
				}
			})
			return hasil
		} else {
			return data.Prefix
		}
	} else {
		return "."
	}
}