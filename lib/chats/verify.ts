import { Commands, HandlingMessage } from "../typings";
import { WAConnection, MessageType } from "@adiwajshing/baileys";
import { checkVerify, SuccesVerify  } from "../plugins";
import {  RandomOtp } from "../functions/function";
import { Indverifikasi } from "../lang/ind"

const register: Map <String, { otp: string, hit: number, status: boolean, open: boolean } > = new Map();

export class Verify {
	constructor(public client: WAConnection, public data: HandlingMessage) {}
	public Handle () {
		this.Verify()
		this.handlingCode()
	}
	private async handlingCode (){
		const { Command, from, sender, body, mess } = this.data
		const respon: { otp: string, hit: number, status: boolean, open: boolean } = register.get(sender)
		if (checkVerify(sender)) return;
		if (respon && respon.open && body.replace(/\D/g,'') === respon.otp) {
			SuccesVerify(sender)
			register.delete(sender)
			this.client.sendMessage(from,  Indverifikasi(4, ""), MessageType.extendedText, { quoted: mess})
		}
	}
	private async Verify () {
		globalThis.CMD.on("user|verify", ["verify"], async (res: WAConnection, data: Commands) => {
			const { sender, from, mess } = data
			if (checkVerify(sender)) return 
			const respon: { otp: string, hit: number, status: boolean, open: boolean } = register.get(sender)
			if (!respon) {
				const Format: { otp: string, hit: number, status: boolean, open: boolean } = {
					otp: "",
					hit: 1,
					status: false,
					open: false,
				}
				register.set(sender, Format)
			}
			const value: { otp: string, hit: number, status: boolean, open: boolean } = register.get(sender)
			if (value && value.open) return 
			if (value && Number(value.hit) > 3) return
			if (value && Number(value.hit) === 3) {
				const Format: { otp: string, hit: number, status: boolean, open: boolean } = {
					otp: RandomOtp(),
					hit: (value.hit + 1),
					status: false,
					open: true,
				}
				register.set(sender, Format)
				const hasil: { otp: string, hit: number, status: boolean, open: boolean } = register.get(sender)
				await res.sendMessage(from, Indverifikasi(3, hasil.otp), MessageType.extendedText, { quoted: mess})
				setTimeout(() => {
					if (checkVerify(sender)) return;
					register.delete(sender)
				}, 28800000)
			} else if (value &&  Number(value.hit) === 2) {
				const Format: { otp: string, hit: number, status: boolean, open: boolean } = {
					otp: RandomOtp(),
					hit: (value.hit + 1),
					status: false,
					open: true,
				}
				register.set(sender, Format)
				const hasil: { otp: string, hit: number, status: boolean, open: boolean } = register.get(sender)
				await res.sendMessage(from, Indverifikasi(2, hasil.otp), MessageType.extendedText, { quoted: mess})
				setTimeout(() => {
					if (checkVerify(sender)) return;
					const format: { otp: string, hit: number, status: boolean, open: boolean } = {
						otp: value.otp,
						hit: 3,
						status: false,
						open: false,
					}
					register.set(sender, format)
				}, 5400000)
			} else if (value && Number(value.hit) === 1) {
				const Format: { otp: string, hit: number, status: boolean, open: boolean } = {
					otp: RandomOtp(),
					hit: (value.hit + 1),
					status: false,
					open: true,
				}
				register.set(sender, Format)
				const hasil: { otp: string, hit: number, status: boolean, open: boolean } = register.get(sender)
				await res.sendMessage(from, Indverifikasi(1, hasil.otp), MessageType.extendedText, { quoted: mess})
				setTimeout(() => {
					if (checkVerify(sender)) return;
					const format: { otp: string, hit: number, status: boolean, open: boolean } = {
						otp: value.otp,
						hit: 2,
						status: false,
						open: false,
					}
					register.set(sender, format)
				}, 300000)
			}
		})
	}
}
