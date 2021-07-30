import { WAConnection, MessageType } from "@adiwajshing/baileys";
import { Commands } from "../typings";
import { Tomp3, Tocute, CreateSticker, toVideoV2 } from "../tools";
import { Tunggu, Buffer } from "../functions/function";
import { ToVideo } from "../routers/api"
import * as fs from "fs";
import { IndTunggu,  IndBukanVid,  IndToVid, IndBukanAud, IndToCute } from "../lang/ind";

export class Converter {
	constructor() {}
	public async SendingConverter () {
		 this.toMP3()
		 this.Sticker()
		 this.ToVideo()
		 this.toCUTE()
	}
	protected async Sticker () {
		globalThis.CMD.on("converter|sticker", ["sticker", "s", "stiker"], async (res: WAConnection, data: Commands) => {
			const { args, media, from, mess } = data;
			if (!media) return;
			await res.sendMessage(from, IndTunggu(), MessageType.text, { quoted: mess})
			const input: string = await res.downloadAndSaveMediaMessage(media,  "./lib/storage/temp/" + Date.now())
			await CreateSticker(input, args[0] || undefined).then(async (result: string | Error) => {
				if (typeof result == "string") {
					await res.sendMessage(from, fs.readFileSync(result), MessageType.sticker, { quoted: mess})
					await Tunggu(2000)
					if (fs.existsSync(result)) fs.unlinkSync(result)
				} else {
					const Res: string | Error = await CreateSticker(input, args[0] || undefined)
					if (typeof Res !== "string") return;
					await res.sendMessage(from, fs.readFileSync(Res), MessageType.sticker, { quoted: mess})
					await Tunggu(2000)
					if (fs.existsSync(Res)) fs.unlinkSync(Res)
				}
			})
		})
	}
	protected async ToVideo () {
		globalThis.CMD.on("converter|tovid", "tovid", async (res: WAConnection, data: Commands) => {
			const { isQuotedSticker, media, from, mess, sender } = data
			if (!media && !isQuotedSticker)  return;
			await res.sendMessage(from, IndTunggu(), MessageType.text, { quoted: mess})
			const input: string = await res.downloadAndSaveMediaMessage(media, "./lib/storage/temp/" + Date.now() + sender.replace("@s.whatsapp.net", ""))
			await ToVideo(input).then(async (value: { status: number, data: string }) => {
				await res.sendMessage(from, await Buffer(value.data), MessageType.video, { quoted: mess})
			}).catch(async (err: Error) => {
				let respon: string
				try {
					respon = await toVideoV2(input)
				} catch (err) {
					console.log(err)
					await res.sendMessage(from,  IndToVid(), MessageType.text, { quoted: mess})
				} finally {
					await res.sendMessage(from, fs.readFileSync(respon), MessageType.video, { quoted: mess})
				}
			})
		}, { noPrefix: false})
	}
	protected async toMP3 () {
		globalThis.CMD.on("converter|tomp3", "tomp3", async (res: WAConnection, data:  Commands) => {
			const { media, isQuotedVideo, from, mess, isVideo, sender } = data
			if (!media && !isQuotedVideo || !media && isVideo) return res.sendMessage(from, IndBukanVid(), MessageType.text, { quoted: mess})
			await res.sendMessage(from, IndTunggu(), MessageType.text, { quoted: mess})
			const input: string = await res.downloadAndSaveMediaMessage(media, "./lib/storage/temp/" +  sender.replace("@s.whatsapp.net", ""))
			await Tomp3(input).then(async (result: string | Error) => {
				if (typeof result !== "string") {
					const Respon: string | Error = await Tomp3(input)
					if (typeof Respon !== "string") return
					await res.sendMessage(from, fs.readFileSync(Respon), MessageType.audio, { quoted: mess})
					await Tunggu(2000)
					if (fs.existsSync(Respon)) fs.unlinkSync(Respon)
				} else {
					res.sendMessage(from, fs.readFileSync(result), MessageType.audio, { quoted: mess})
					await Tunggu(2000)
					if (fs.existsSync(result)) fs.unlinkSync(result)
				}
			})
		}, { noPrefix: false })
	}
	protected async toCUTE () {
		globalThis.CMD.on("converter|tocute", "tocute", async (res: WAConnection, data:  Commands) => {
			const { media, isQuotedAudio, from, mess, isAudio, sender } = data
			if (!media && !isQuotedAudio || !media && isAudio) return res.sendMessage(from, IndBukanAud(), MessageType.text, { quoted: mess})
			await res.sendMessage(from, IndTunggu(), MessageType.text, { quoted: mess})
			const input: string = await res.downloadAndSaveMediaMessage(media, "./lib/storage/temp/" +  sender.replace("@s.whatsapp.net", ""))
			await Tocute(input).then(async (result: string | Error) => {
				if (typeof result !== "string") {
					const Respon: string | Error = await Tocute(input)
					if (typeof Respon !== "string") return
					await res.sendMessage(from, fs.readFileSync(Respon), MessageType.audio, { quoted: mess})
					await Tunggu(2000)
					if (fs.existsSync(Respon)) fs.unlinkSync(Respon)
				} else {
					res.sendMessage(from, fs.readFileSync(result), MessageType.audio, { quoted: mess})
					await Tunggu(2000)
					if (fs.existsSync(result)) fs.unlinkSync(result)
				}
			})
		}, { noPrefix: false })
	}
}
