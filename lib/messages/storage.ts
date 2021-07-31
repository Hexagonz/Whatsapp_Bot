import { UserHandler } from ".";
import { WAConnection, MessageType } from "@adiwajshing/baileys";
import * as fs from "fs";
import { Commands } from "../typings";
import filesize from "filesize";
import { IndFileGede, LimitStorage, IndIdDuplicate, IndSuccesSave, IndMasukkanId, IndIdStorageKosong,  IndCheckStorage  } from "../lang/ind";
import { isUrl } from "../functions/function";

export class Storager extends  UserHandler {
	constructor() {
		super()
	}
	public send () {
		this.sendData()
		this.SaveMedia()
		this.getMedia()
		this.checkMedia()
	}
	private async SaveMedia () {
		globalThis.CMD.on("storage|save", "save", async (res: WAConnection, data: Commands) => {
			const { isQuotedAudio, isQuotedVideo, isQuotedSticker, isQuotedImage, isVideo, isAudio, isGambar, media, Filesize, sender, args, isOwner, from, mess, Prefix } = data
			if (args[0] == undefined) return res.sendMessage(from, IndMasukkanId(), MessageType.text, { quoted: mess})
			if (media && isQuotedAudio || isQuotedVideo || isQuotedSticker || isQuotedImage || isVideo || isAudio || isGambar) {
				const size: any = filesize(Filesize, { output: "object"})
				if (!/(MB|KB|B)/i.test(size.symbol)) return res.sendMessage(from,  IndFileGede(sender), MessageType.text, { quoted: mess, contextInfo: { mentionedJid: [sender]}})
				if (size.value >= 50.00 && size.symbol == "MB") return  res.sendMessage(from,  IndFileGede(sender), MessageType.text, { quoted: mess, contextInfo: { mentionedJid: [sender]}})
				const Path: string = "./lib/storage/public/" + sender.replace(/@s.whatsapp.net/gi, "") + args[0]
				fs.readdir("./lib/storage/public/", async (err, call) => {
					const total: number = call.filter((duh: string) => duh.startsWith(sender.replace(/@s.whatsapp.net/gi, ""))).length
					if (!isOwner && total >= 4) return res.sendMessage(from, LimitStorage(), MessageType.text, { quoted: mess})
					const Check: string[] = call.filter(v => v.startsWith(sender.replace(/@s.whatsapp.net/gi, "")))
					if (call.find(v => v.startsWith(sender.replace(/@s.whatsapp.net/gi, "") + args[0]))) return res.sendMessage(from,  IndIdDuplicate(), MessageType.text, { quoted: mess})
					if (Check[0] == undefined) {
						await res.downloadAndSaveMediaMessage(media, Path)
						await res.sendMessage(from, IndSuccesSave(args[0], Prefix, isOwner, (total + 1)), MessageType.text, { quoted: mess})
					} else {
						await res.downloadAndSaveMediaMessage(media, Path)
						await res.sendMessage(from, IndSuccesSave(args[0], Prefix, isOwner, (total + 1)), MessageType.text, { quoted: mess})
					}
				})
			}
		})
	}
	private async checkMedia () {
		globalThis.CMD.on("storage|check", "check", (res: WAConnection, data: Commands) => {
			const { from, sender, mess} = data
			fs.readdir("./lib/storage/public/", async (err, call) => {
				const data = call.filter(v => v.startsWith(sender.replace(/@s.whatsapp.net/gi, "")))
				await res.sendMessage(from,  IndCheckStorage (data, sender.replace(/@s.whatsapp.net/gi, "")), MessageType.text, { quoted: mess})
			})
		})
	}
	private async getMedia () {
		globalThis.CMD.on("storage|get", "get", async (res: WAConnection, data:  Commands) => {
			const { sender, args, from, mess } = data
			if ( isUrl(args[0])) return
			if (args[0] == undefined) return res.sendMessage(from, IndMasukkanId(), MessageType.text, { quoted: mess})
			fs.readdir("./lib/storage/public/", async (err, call) => {
				const data: string[] = call.filter(v => v.startsWith(sender.replace(/@s.whatsapp.net/gi, "") + args[0]))
				if (data) {
					if (fs.existsSync("./lib/storage/public/" + data[0])) {
						const Types: string = data[0].split(".")[1] 
						if (/(jpeg|png|jpg)/gi.test(Types)) {
							await res.sendMessage(from, fs.readFileSync("./lib/storage/public/" + data[0]), MessageType.image, { quoted: mess })
						} else if (/(mp4)/gi.test(Types)) {
							await res.sendMessage(from, fs.readFileSync("./lib/storage/public/" + data[0]), MessageType.video, { quoted: mess })
						} else if (/(mp3|mp2a|m2a|mka)/gi.test(Types)) {
							await res.sendMessage(from, fs.readFileSync("./lib/storage/public/" + data[0]), MessageType.audio, { quoted: mess })
						} else if (/(webp)/gi.test(Types)) {
							 await res.sendMessage(from, fs.readFileSync("./lib/storage/public/" + data[0]), MessageType.sticker, { quoted: mess })
						} 
					} else {
						await res.sendMessage(from, IndIdStorageKosong(), MessageType.text, { quoted: mess})
					}
				} else {
					await res.sendMessage(from, IndIdStorageKosong(), MessageType.text, { quoted: mess })
				}
			})
		})
	}
}