import { WAConnection, MessageType } from "@adiwajshing/baileys";
import { Commands } from "../typings";
import { Tomp3, Tocute, CreateSticker, toVideoV2,  Toimg, createStickerV2, createStickerV3 } from "../tools";
import { Tunggu, Buffer, RandomName } from "../functions/function";
import { ToVideo } from "../routers/api";
import * as fs from "fs";
import { Client } from "../src/Client"
import { IndTunggu,  IndBukanVid,  IndToVid, IndBukanAud, IndToCute, IndBukanSticker, IndGagalSticker, IndErrorMP3  } from "../lang/ind";

export class Converter {
	constructor(public Ra: Client) {}
	public async SendingConverter () {
		 this.toMP3()
		 this.Sticker()
		 this.ToVideo()
		 this.toCUTE()
		 this.toImg()
	}
	protected async Sticker () {
		globalThis.CMD.on("converter|sticker", ["sticker", "s", "stiker", "stickergif", "stikergif", "sgif"], async (res: WAConnection, data: Commands) => {
			const { args, media, from, mess, sendOwner } = data;
			if (!media) return;
			const Wm: string = args[0] === undefined ? undefined : args.join(" ")
			await this.Ra.reply(from, IndTunggu(), mess)
			const input: string = await res.downloadAndSaveMediaMessage(media,  "./lib/storage/temp/" + RandomName(22))
			await CreateSticker(input, Wm).then(async (result: string | Error) => {
				if (typeof result !== "string") return
				await this.Ra.sendSticker(from, fs.readFileSync(result), mess)
				await Tunggu(2000)
				if (fs.existsSync(result)) fs.unlinkSync(result)
				if (fs.existsSync(input)) fs.unlinkSync(input)
			}).catch(async () => {
				await CreateSticker(input, Wm).then(async (Res) => {
					if (typeof Res !== "string") return
					await this.Ra.sendSticker(from, fs.readFileSync(Res), mess)
					await Tunggu(2000)
					if (fs.existsSync(Res)) fs.unlinkSync(Res)
					if (fs.existsSync(input)) fs.unlinkSync(input)
				}).catch(async () => {
					await createStickerV2(input, Wm).then(async (Result) => {
						if (typeof Result !== "string") return
						await this.Ra.sendSticker(from, fs.readFileSync(Result), mess)
						await Tunggu(2000)
						if (fs.existsSync(Result)) fs.unlinkSync(Result)
						if (fs.existsSync(input)) fs.unlinkSync(input)
					}).catch(async () => {
						await createStickerV3(input, Wm).then(async (Res) => {
							if (typeof Res !== "string") return
							await this.Ra.sendSticker(from, fs.readFileSync(Res), mess)
							await Tunggu(2000)
							if (fs.existsSync(Res)) fs.unlinkSync(Res)
							if (fs.existsSync(input)) fs.unlinkSync(input)
						}).catch((err) => {
							if (fs.existsSync(input)) fs.unlinkSync(input)
							this.Ra.reply(from, IndGagalSticker(), mess)
							this.Ra.sendText(sendOwner, "ERROR Sticker : " + err)
						})
					})
				})
			})
		})
	}
	protected async ToVideo () {
		globalThis.CMD.on("converter|tovid", "tovid", async (res: WAConnection, data: Commands) => {
			const { isQuotedSticker, media, from, mess, sender } = data
			if (!media && !isQuotedSticker)  return this.Ra.reply(from, IndBukanSticker(), mess)
			await this.Ra.reply(from, IndTunggu(), mess)
			const input: string = await res.downloadAndSaveMediaMessage(media, "./lib/storage/temp/" + RandomName(23) + sender.replace("@s.whatsapp.net", ""))
			await ToVideo(input).then(async (value: { status: number, data: string }) => {
				await this.Ra.sendVideo(from, await Buffer(value.data), "", mess)
				if (fs.existsSync(input)) fs.unlinkSync(input)
			}).catch(async (err: Error) => {
				let respon: string
				try {
					respon = await toVideoV2(input)
				} catch (err) {
					if (fs.existsSync(input)) fs.unlinkSync(input)
					console.log(err)
					await this.Ra.reply(from,  IndToVid(), mess)
				} finally {
					if (fs.existsSync(input)) fs.unlinkSync(input)
					await this.Ra.sendVideo(from, fs.readFileSync(respon), "", mess)
					if (fs.existsSync(respon)) fs.unlinkSync(input)
				}
			})
		}, { noPrefix: false})
	}
	protected async toMP3 () {
		globalThis.CMD.on("converter|tomp3", "tomp3", async (res: WAConnection, data:  Commands) => {
			const { media, isQuotedVideo, from, mess, isVideo, sender, sendOwner } = data
			if (!media && !isQuotedVideo || !media && isVideo) return this.Ra.reply(from, IndBukanVid(), mess)
			await this.Ra.reply(from, IndTunggu(),mess)
			const input: string = await res.downloadAndSaveMediaMessage(media, "./lib/storage/temp/" +  RandomName(24))
			await Tomp3(input).then(async (result: string | Error) => {
				if (typeof result !== "string") return 
					this.Ra.sendAudio(from, fs.readFileSync(result), false, mess)
					await Tunggu(2000)
					if (fs.existsSync(result)) fs.unlinkSync(result)
			}).catch(async (err) => {
				await Tomp3(input).then(async (Respon) => {
					if (typeof Respon !== "string") return
					await this.Ra.sendAudio(from, fs.readFileSync(Respon), false, mess)
					await Tunggu(2000)
					if (fs.existsSync(Respon)) fs.unlinkSync(Respon)
				}).catch((err) => {
					this.Ra.reply(from, IndErrorMP3(), mess)
					this.Ra.sendText(sendOwner, "ERROR tomp3 :" + err)
				})
			})
		}, { noPrefix: false })
	}
	protected async toImg () {
		globalThis.CMD.on("converter|toimg", "toimg", async (res: WAConnection, data: Commands) => {
			const { from, mess} = data
			const result =  await  Toimg(await res.downloadAndSaveMediaMessage(data.media,"./lib/storage/temp/" + RandomName(27)))
			await this.Ra.sendImage(from, fs.readFileSync(result || ""), "", mess)
		}, { noPrefix: false})
	}
	protected async toCUTE () {
		globalThis.CMD.on("converter|tocute", "tocute", async (res: WAConnection, data:  Commands) => {
			const { media, isQuotedAudio, from, mess, isAudio, sender } = data
			if (!media && !isQuotedAudio || !media && isAudio) return this.Ra.reply(from, IndBukanAud(), mess)
			await this.Ra.reply(from, IndTunggu(), mess)
			const input: string = await res.downloadAndSaveMediaMessage(media, "./lib/storage/temp/" +  RandomName(28))
			await Tocute(input).then(async (result: string | Error) => {
				if (typeof result !== "string") {
					const Respon: string | Error = await Tocute(input)
					if (typeof Respon !== "string") return
					await this.Ra.sendAudio(from, fs.readFileSync(Respon), false, mess)
					await Tunggu(2000)
					if (fs.existsSync(Respon)) fs.unlinkSync(Respon)
				} else {
					this.Ra.sendAudio(from, fs.readFileSync(result),true, mess)
					await Tunggu(2000)
					if (fs.existsSync(result)) fs.unlinkSync(result)
				}
			})
		}, { noPrefix: false })
	}
}
