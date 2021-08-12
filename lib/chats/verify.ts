import { Commands, HandlingMessage, FormatVerify } from "../typings";
import { WAConnection, MessageType } from '@adiwajshing/baileys';
import { RandomOtp, Buffer, RandomName } from '../functions/function';
import { Indverifikasi, IndSdhVerifikasi } from '../lang/ind';
import { ConnectMoongo } from '../database/mongoodb/main';
import * as fs from "fs";
import jimp from "jimp";

const register: Map<String, { otp: string; hit: number; status: boolean; open: boolean }> = new Map();


export class Verify {
	constructor(public client: WAConnection, public data: HandlingMessage, public database: ConnectMoongo) {

	}
	public Handle() {
		this.Verify()
		this.handlingCode()
    }
    private async handlingCode() {
		const { from, sender, body, mess, pushname, isGroupMsg, groupMetadata } = this.data
		if (!sender) return
		const respon: { otp: string; hit: number; status: boolean; open: boolean } | undefined = register.get(sender)
        if (await this.database.VerifyCheckDb(sender)) return
        if (respon && respon.open && body?.replace(/\D/g, '') === respon.otp && from) {
			await this.database.DoneVerify(sender)
            register.delete(sender)
			let profile: string | null | any = null
			try {
				profile =  await this.client.getProfilePicture(sender)
			} catch(err) {
				profile = fs.readFileSync("./lib/storage/polosan/thumb.png")
			} finally {
				if (typeof profile !== "string") {
					await jimp.read("./lib/storage/polosan/thumb.png", async (err, lenna) => {
						lenna.blur(10)
						let Media: any = await lenna.getBufferAsync(lenna.getMIME())
						this.client.sendMessage(from, profile, MessageType.image, { quoted: mess, caption: Indverifikasi(4, '', { nama: pushname, id: sender.replace("@s.whatsapp.net", ""), dalam: isGroupMsg ? groupMetadata?.subject || "" : "Private chat"}), thumbnail: Media })
					})
				} else {
					const Media: Buffer =  await Buffer(profile)
					const Thumb: string = "./lib/storage/temp/" + RandomName (20) + ".png"
					await fs.writeFileSync(Thumb, (Media))
					await jimp.read(Thumb, async (err, lenna) => {
						lenna.blur(10)
						let tum: any = await lenna.getBufferAsync(lenna.getMIME())
						await this.client.sendMessage(from, Media, MessageType.image, { quoted: mess, caption:  Indverifikasi(4, '', { nama: pushname, id: sender.replace("@s.whatsapp.net", ""), dalam: isGroupMsg ? groupMetadata?.subject || "" : "Private chat"}), thumbnail:  tum })
						if (fs.existsSync(Thumb)) fs.unlinkSync(Thumb)
					})
				}
			}
        }
    }
    private async Verify() {
        globalThis.CMD.on('user|verify', ['verify'], async (res: WAConnection, data: Commands) => {
            const { sender, from, mess, pushname } = data
			if (!sender) return
            if (await this.database.VerifyCheckDb(sender)) return (pushname == "Tidak Terdeteksi")  ? await this.client.sendMessage(from, IndSdhVerifikasi(sender), MessageType.extendedText, { quoted: mess, contextInfo: { mentionedJid: [sender]}}) : await this.client.sendMessage(from, IndSdhVerifikasi(pushname), MessageType.extendedText, { quoted: mess})
            const respon: FormatVerify  | undefined = register.get(sender)
            if (!respon) {
				const Format: FormatVerify = {
					otp: '',
                    hit: 1,
                    status: false,
                    open: false
                }
				register.set(sender, Format)
			}
            const value: FormatVerify | undefined  = register.get(sender)
            if (value && value.open) return
            if (value && Number(value.hit) > 3) return
            if (value && Number(value.hit) === 3) {
                const Format: FormatVerify  = {
					otp: RandomOtp(),
                    hit: value.hit + 1,
                    status: false,
                    open: true
                }
                register.set(sender, Format)
                const hasil: FormatVerify | undefined = register.get(sender)
                await res.sendMessage(from, Indverifikasi(3, hasil?.otp || ''), MessageType.extendedText, { quoted: mess })
                setTimeout(async () => {
                    if (await this.database.CheckRegister(sender)) return
                    register.delete(sender)
                }, 28800000)
            } else if (value && Number(value.hit) === 2) {
                const Format: FormatVerify = {
                    otp: RandomOtp(),
                    hit: value.hit + 1,
                    status: false,
                    open: true
                }
                register.set(sender, Format)
                const hasil: FormatVerify | undefined = register.get(sender)
                await res.sendMessage(from, Indverifikasi(2, hasil?.otp || ''), MessageType.extendedText, { quoted: mess })
                setTimeout(async () => {
                    if (await this.database.CheckRegister(sender)) return
                    const format: FormatVerify = {
                        otp: value.otp,
                        hit: 3,
                        status: false,
                        open: false
                    }
                    register.set(sender, format)
                }, 5400000)
            } else if (value && Number(value.hit) === 1) {
                const Format: FormatVerify = {
                    otp: RandomOtp(),
                    hit: value.hit + 1,
                    status: false,
                    open: true
                }
                register.set(sender, Format)
                const hasil: FormatVerify | undefined = register.get(sender)
                await res.sendMessage(from, Indverifikasi(1, hasil?.otp || ''), MessageType.extendedText, { quoted: mess })
                setTimeout(async () => {
                    if (await this.database.CheckRegister(sender || '')) return
                    const format: FormatVerify = {
                        otp: value.otp,
                        hit: 2,
                        status: false,
                        open: false
                    }
                    register.set(sender || '', format)
                }, 300000)
            }
        })
    }
}
