import { WAConnection, MessageType } from "@adiwajshing/baileys";
import { Commands } from "../typings";
import { Tomp3, Tocute, CreateSticker, toVideoV2,  Toimg, createStickerV2, createStickerV3 } from "../tools";
import { Tunggu, Buffer, RandomName } from "../functions/function";
import { ToVideo } from "../routers/api";
import * as fs from "fs";
import { IndTunggu,  IndBukanVid,  IndToVid, IndBukanAud, IndToCute, IndBukanSticker, IndGagalSticker, IndErrorMP3  } from "../lang/ind";

export class Converter {
	constructor() {}
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
			await res.sendMessage(from, IndTunggu(), MessageType.text, { quoted: mess})
			const input: string = await res.downloadAndSaveMediaMessage(media,  "./lib/storage/temp/" + RandomName(22))
			await CreateSticker(input, Wm).then(async (result: string | Error) => {
				if (typeof result !== "string") return
				await res.sendMessage(from, fs.readFileSync(result), MessageType.sticker, { quoted: mess})
				await Tunggu(2000)
				if (fs.existsSync(result)) fs.unlinkSync(result)
				if (fs.existsSync(input)) fs.unlinkSync(input)
			}).catch(async () => {
				await CreateSticker(input, Wm).then(async (Res) => {
					if (typeof Res !== "string") return
					await res.sendMessage(from, fs.readFileSync(Res), MessageType.sticker, { quoted: mess})
					await Tunggu(2000)
					if (fs.existsSync(Res)) fs.unlinkSync(Res)
					if (fs.existsSync(input)) fs.unlinkSync(input)
				}).catch(async () => {
					await createStickerV2(input, Wm).then(async (Result) => {
						if (typeof Result !== "string") return
						await res.sendMessage(from, fs.readFileSync(Result), MessageType.sticker, { quoted: mess})
						await Tunggu(2000)
						if (fs.existsSync(Result)) fs.unlinkSync(Result)
						if (fs.existsSync(input)) fs.unlinkSync(input)
					}).catch(async () => {
						await createStickerV3(input, Wm).then(async (Res) => {
							if (typeof Res !== "string") return
							await res.sendMessage(from, fs.readFileSync(Res), MessageType.sticker, { quoted: mess})
							await Tunggu(2000)
							if (fs.existsSync(Res)) fs.unlinkSync(Res)
							if (fs.existsSync(input)) fs.unlinkSync(input)
						}).catch((err) => {
							if (fs.existsSync(input)) fs.unlinkSync(input)
							res.sendMessage(from, IndGagalSticker(), MessageType.extendedText, { quoted: mess})
							res.sendMessage(sendOwner, "ERROR Sticker : " + err, MessageType.text, { quoted: mess})
						})
					})
				})
			})
		})
	}
	protected async ToVideo () {
		globalThis.CMD.on("converter|tovid", "tovid", async (res: WAConnection, data: Commands) => {
			const { isQuotedSticker, media, from, mess, sender } = data
			if (!media && !isQuotedSticker)  return res.sendMessage(from, IndBukanSticker(), MessageType.text, { quoted: mess})
			await res.sendMessage(from, IndTunggu(), MessageType.text, { quoted: mess})
			const input: string = await res.downloadAndSaveMediaMessage(media, "./lib/storage/temp/" + RandomName(23) + sender.replace("@s.whatsapp.net", ""))
			await ToVideo(input).then(async (value: { status: number, data: string }) => {
				await res.sendMessage(from, await Buffer(value.data), MessageType.video, { quoted: mess})
				if (fs.existsSync(input)) fs.unlinkSync(input)
			}).catch(async (err: Error) => {
				let respon: string
				try {
					respon = await toVideoV2(input)
				} catch (err) {
					if (fs.existsSync(input)) fs.unlinkSync(input)
					console.log(err)
					await res.sendMessage(from,  IndToVid(), MessageType.text, { quoted: mess})
				} finally {
					if (fs.existsSync(input)) fs.unlinkSync(input)
					await res.sendMessage(from, fs.readFileSync(respon), MessageType.video, { quoted: mess})
					if (fs.existsSync(respon)) fs.unlinkSync(input)
				}
			})
		}, { noPrefix: false})
	}
	protected async toMP3 () {
		globalThis.CMD.on("converter|tomp3", "tomp3", async (res: WAConnection, data:  Commands) => {
			const { media, isQuotedVideo, from, mess, isVideo, sender, sendOwner } = data
			if (!media && !isQuotedVideo || !media && isVideo) return res.sendMessage(from, IndBukanVid(), MessageType.text, { quoted: mess})
			await res.sendMessage(from, IndTunggu(), MessageType.text, { quoted: mess})
			const input: string = await res.downloadAndSaveMediaMessage(media, "./lib/storage/temp/" +  RandomName(24))
			await Tomp3(input).then(async (result: string | Error) => {
				if (typeof result !== "string") return 
					res.sendMessage(from, fs.readFileSync(result), MessageType.audio, { quoted: mess})
					await Tunggu(2000)
					if (fs.existsSync(result)) fs.unlinkSync(result)
			}).catch(async (err) => {
				await Tomp3(input).then(async (Respon) => {
					if (typeof Respon !== "string") return
					await res.sendMessage(from, fs.readFileSync(Respon), MessageType.audio, { quoted: mess})
					await Tunggu(2000)
					if (fs.existsSync(Respon)) fs.unlinkSync(Respon)
				}).catch((err) => {
					res.sendMessage(from, IndErrorMP3(), MessageType.text, { quoted: mess})
					res.sendMessage(sendOwner, "ERROR tomp3 :" + err, MessageType.text, { quoted: mess})
				})
			})
		}, { noPrefix: false })
	}
	protected async toImg () {
		globalThis.CMD.on("converter|toimg", "toimg", async (res: WAConnection, data: Commands) => {
			const { from, mess} = data
			const result =  await  Toimg(await res.downloadAndSaveMediaMessage(data.media,"./lib/storage/temp/" + RandomName(27)))
			await res.sendMessage(from, fs.readFileSync(result || ""), MessageType.image, { quoted: mess})
		}, { noPrefix: false})
	}
	protected async toCUTE () {
		globalThis.CMD.on("converter|tocute", "tocute", async (res: WAConnection, data:  Commands) => {
			const { media, isQuotedAudio, from, mess, isAudio, sender } = data
			if (!media && !isQuotedAudio || !media && isAudio) return res.sendMessage(from, IndBukanAud(), MessageType.text, { quoted: mess})
			await res.sendMessage(from, IndTunggu(), MessageType.text, { quoted: mess})
			const input: string = await res.downloadAndSaveMediaMessage(media, "./lib/storage/temp/" +  RandomName(28))
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
