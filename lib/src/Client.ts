import { WAConnection, MessageType, proto } from "@adiwajshing/baileys";
import * as fs from "fs";
import { isUrl, Buffer } from "../functions/function"

export class Client {
	constructor(public Client: WAConnection) {
	}
	public async sendText(from: string, text: string): Promise <void> {
		return void await this.Client.sendMessage(from, text, MessageType.text)
	}
	public async sendTextWithMentions(from: string, text: string, mentioned: string[], id?: proto.WebMessageInfo | undefined): Promise <void> {
		try {
			return  id ? void await this.Client.sendMessage(from, text, MessageType.text, { contextInfo: { mentionedJid: mentioned}}) : void await this.Client.sendMessage(from, text, MessageType.text, { contextInfo: { mentionedJid: mentioned}, quoted: id})
		} catch (err) {
			throw console.log(err)
		}
	}
	public async reply(from: string, text: string, id?: proto.WebMessageInfo | undefined): Promise <void> {
		try {
			if (id !== undefined) {
				return void await this.Client.sendMessage(from, text, MessageType.extendedText, { quoted: id})
			} else {
				return void await this.Client.sendMessage(from, text, MessageType.extendedText)
			}
		} catch (err) {
			throw console.log(new Error(`${err}`))
		}
	}
	public async sendVideo (from: string, media: Buffer | string, caption?: string, id?: proto.WebMessageInfo): Promise <void | Error> {
		try {
			if (typeof media !== "string") {
				const data: proto.WebMessageInfo = id ? await this.Client.prepareMessage(from,  media, MessageType.video, { quoted: id, caption }) :  await this.Client.prepareMessage(from, media, MessageType.video, { caption})
				return void await this.Client.relayWAMessage(data)
			} else if (fs.existsSync(media)){
				let Media: Buffer = fs.readFileSync(media)
				const data: proto.WebMessageInfo = id ? await this.Client.prepareMessage(from, Media, MessageType.video, { quoted: id, caption}) :  await this.Client.prepareMessage(from, Media, MessageType.video, { caption})
				return void await this.Client.relayWAMessage(data)
			} else if (isUrl(media)) {
				let Media: Buffer = await Buffer(media) 
				const data: proto.WebMessageInfo = id ? await this.Client.prepareMessage(from, Media, MessageType.video, { quoted: id }) :  await this.Client.prepareMessage(from, Media, MessageType.video, { caption})
				return void await this.Client.relayWAMessage(data)
			} else {
				throw new Error("Input Invalid")
			}
		} catch (err) {
			throw console.log(new Error(`${err}`))
		}
	}
	public async sendImage(from: string, media: Buffer | string,  caption?: string, id?: proto.WebMessageInfo): Promise <void | Error> {
		try {
			if (typeof media !== "string") {
				let Media: any = media
				const data: proto.WebMessageInfo = id ? await this.Client.prepareMessage(from,  media, MessageType.image, { quoted: id, thumbnail: Media, caption }) :  await this.Client.prepareMessage(from, media, MessageType.image, { thumbnail: Media, caption })
				return void await this.Client.relayWAMessage(data)
			} else if (fs.existsSync(media)){
				let Media: any = fs.readFileSync(media)
				const data: proto.WebMessageInfo = id ? await this.Client.prepareMessage(from, Media, MessageType.image, { quoted: id, thumbnail: Media, caption }) :  await this.Client.prepareMessage(from, Media, MessageType.image, { thumbnail: Media, caption })
				return void await this.Client.relayWAMessage(data)
			} else if (isUrl(media)) {
				let Media: any = await Buffer(media) 
				const data: proto.WebMessageInfo = id ? await this.Client.prepareMessage(from, Media, MessageType.image, { quoted: id, thumbnail: Media, caption }) :  await this.Client.prepareMessage(from, Media, MessageType.image, { thumbnail: Media, caption })
				return void await this.Client.relayWAMessage(data)
			} else {
				throw new Error("Input Invalid")
			}
		} catch (err) {
			throw console.log(new Error(`${err}`))
		}
	}
	public async sendAudio(from: string, media: Buffer | string,  ptt?: boolean,id?: proto.WebMessageInfo) {
		try {
			const Ptt: boolean = ptt ?  ptt : false
			if (typeof media !== "string") {
				return id ? void await this.Client.sendMessage(from, media, MessageType.audio, { quoted: id, ptt: Ptt}) : void await this.Client.sendMessage(from, media, MessageType.audio, { ptt: Ptt})
			} else if (fs.existsSync(media)) {
				return id ? void await this.Client.sendMessage(from, fs.readFileSync(media), MessageType.audio, { quoted: id, ptt: Ptt}) : void await this.Client.sendMessage(from, fs.readFileSync(media), MessageType.audio, { ptt: Ptt})
			} else if (isUrl(media)) {
				return id ? void await this.Client.sendMessage(from, await Buffer(media), MessageType.audio, { quoted: id, ptt: Ptt}) : void await this.Client.sendMessage(from, await Buffer(media), MessageType.audio, { ptt: Ptt})
			} else {
				throw new Error("Input Invalid")
			}
		} catch (err) {
			throw console.log(new Error(`${err}`))
		}
	}
	public async sendSticker (from: string, media: Buffer | string, id?: proto.WebMessageInfo) {
		try {
			if (typeof media !== "string") {
				return id ? void await this.Client.sendMessage(from, media, MessageType.sticker, { quoted: id}) : void await  await this.Client.sendMessage(from, media, MessageType.sticker)
			} else if (fs.existsSync(media)) {
				return id ? void await this.Client.sendMessage(from, fs.readFileSync(media), MessageType.sticker, { quoted: id}) : void await  await this.Client.sendMessage(from,  fs.readFileSync(media),  MessageType.sticker)
			} else if (isUrl(media)) {
				return id ? void await this.Client.sendMessage(from, await Buffer(media), MessageType.sticker, { quoted: id}) : void await  await this.Client.sendMessage(from, await Buffer(media),  MessageType.sticker)
			} else {
				throw new Error("Input Invalid")
			}
		} catch (err) {
			throw console.log(new Error(`${err}`))
		}
	}
}