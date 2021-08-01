import { UserHandler } from ".";
import { WAConnection, MessageType } from "@adiwajshing/baileys";
import * as fs from "fs";
import { Commands } from "../typings";
import filesize from "filesize";
import { IndFileGede, LimitStorage, IndIdDuplicate, IndSuccesSave, IndMasukkanId, IndIdStorageKosong,  IndCheckStorage  } from "../lang/ind";
import { isUrl } from "../functions/function";
import { Client } from "../src/Client"

export class Storager extends  UserHandler {
	constructor(public Ra: Client) {
		super(Ra)
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
			if (args[0] == undefined) return this.Ra.reply(from, IndMasukkanId(), mess)
			if (media && isQuotedAudio || isQuotedVideo || isQuotedSticker || isQuotedImage || isVideo || isAudio || isGambar) {
				const size: any = filesize(Filesize, { output: "object"})
				if (!/(MB|KB|B)/i.test(size.symbol)) return this.Ra.sendTextWithMentions(from, IndFileGede(sender), [sender], mess)
				if (size.value >= 50.00 && size.symbol == "MB") return this.Ra.sendTextWithMentions(from, IndFileGede(sender), [sender], mess)
				const Path: string = "./lib/storage/public/" + sender.replace(/@s.whatsapp.net/gi, "") + args[0]
				fs.readdir("./lib/storage/public/", async (err, call) => {
					const total: number = call.filter((duh: string) => duh.startsWith(sender.replace(/@s.whatsapp.net/gi, ""))).length
					if (!isOwner && total >= 4) return this.Ra.reply(from, LimitStorage(), mess)
					const Check: string[] = call.filter(v => v.startsWith(sender.replace(/@s.whatsapp.net/gi, "")))
					if (call.find(v => v.startsWith(sender.replace(/@s.whatsapp.net/gi, "") + args[0]))) return this.Ra.reply(from,  IndIdDuplicate(), mess)
					if (Check[0] == undefined) {
						await res.downloadAndSaveMediaMessage(media, Path)
						await this.Ra.reply(from, IndSuccesSave(args[0], Prefix, isOwner, (total + 1)), mess)
					} else {
						await res.downloadAndSaveMediaMessage(media, Path)
						await this.Ra.reply(from, IndSuccesSave(args[0], Prefix, isOwner, (total + 1)), mess)
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
				await this.Ra.reply(from,  IndCheckStorage (data, sender.replace(/@s.whatsapp.net/gi, "")), mess)
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
							await this.Ra.sendImage(from, "./lib/storage/public/" + data[0], "", mess)
						} else if (/(mp4)/gi.test(Types)) {
							await this.Ra.sendVideo(from, "./lib/storage/public/" + data[0], "", mess)
						} else if (/(mp3|mp2a|m2a|mka)/gi.test(Types)) {
							await this.Ra.sendAudio(from, "./lib/storage/public/" + data[0], false, mess)
						} else if (/(webp)/gi.test(Types)) {
							 await this.Ra.sendSticker (from, fs.readFileSync("./lib/storage/public/" + data[0]), mess)
						} 
					} else {
						await this.Ra.reply(from, IndIdStorageKosong(), mess)
					}
				} else {
					await this.Ra.reply(from, IndIdStorageKosong(), mess)
				}
			})
		})
	}
}