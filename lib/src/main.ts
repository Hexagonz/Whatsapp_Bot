import { config } from "dotenv";
config();
import { WAChatUpdate, WAConnection, MessageType, proto } from "@adiwajshing/baileys";
import { HandlerMsg } from "./handler";
import { HandlingMessage, Commands } from "../typings";
import * as fs from "fs";
import { isUrl, Buffer } from "../functions/function";
import { Command } from "./command";
import * as ts from "typescript";
import util from "util"
import {  UserHandler } from "../messages";

globalThis.prefix = ["#", ".", "!", "$"]

globalThis.CMD = new Command(globalThis.prefix)
let Public: boolean = false


export class Main  {
	public client: WAConnection = new WAConnection();
	public message: HandlerMsg = new HandlerMsg(this.client);
	private Respon: UserHandler = new UserHandler();
	constructor() {
	}
	public Response () {
		this.client.on("chat-update", async (chats: WAChatUpdate) => {
			const data: HandlingMessage  | undefined= await  this.message.handling(chats)
			if (data == undefined) return;
			if (!data.isOwner || Public) return;
			if (data.fromMe) return;
			this.Respon.sendData
			CMD.on("owner|=>", /(?:)/, async (client: WAConnection, res: Commands ) => {
				const convert: string = ts.transpile(`(async () => { ${res._text}})()`)
				const send: string = util.format(eval(convert))
				await client.sendMessage(res.from, send, MessageType.text, { quoted: res.mess})
			},  { noPrefix: false, owner: true, prefix: /=>/})
			await CMD.validate(data, this.client)
		})
	}
	
	public async sendText(from: string, text: string): Promise <void> {
		return void await this.client.sendMessage(from, text, MessageType.text)
	}
	public async sendTextWithMentions(from: string, text: string, mentioned: string[], id?: proto.WebMessageInfo | undefined): Promise <void> {
		try {
			return  id === undefined ? void await this.client.sendMessage(from, text, MessageType.text, { contextInfo: { mentionedJid: mentioned}}) : void await this.client.sendMessage(from, text, MessageType.text, { contextInfo: { mentionedJid: mentioned}, quoted: id})
		} catch (err) {
			throw console.log(err)
		}
	}
	public async reply(from: string, text: string, id?: proto.WebMessageInfo | undefined): Promise <void> {
		try {
			if (id !== undefined) {
				return void await this.client.sendMessage(from, text, MessageType.text, { quoted: id})
			} else {
				return void await this.client.sendMessage(from, text, MessageType.text)
			}
		} catch (err) {
			throw console.log(new Error(`${err}`))
		}
	}
	public async sendImage(from: string, file: string | Buffer, id?: proto.WebMessageInfo | undefined): Promise <void | Error>{
		try {
			if (typeof file !== "string") {
				return id === undefined ? void await this.client.sendMessage(from, file, MessageType.image) : void await this.client.sendMessage(from, file, MessageType.image, { quoted: id })
			} else if (fs.existsSync(file)) {
				return id === undefined ? void await this.client.sendMessage(from, fs.readFileSync(file), MessageType.image) : void await this.client.sendMessage(from, fs.readFileSync(file), MessageType.image, { quoted: id })
			} else if (isUrl(file)) {
				return id  === undefined ? void await this.client.sendMessage(from, await Buffer(file), MessageType.image) : void await this.client.sendMessage(from, await Buffer(file), MessageType.image,  { quoted: id})
			} else {
				return new Error("Input data yang bener")
			}
		} catch (err) {
			throw console.log(new Error("Error Ngab Lu salah type data kale, LOG ERROR :\n" + err))
		}
	}
	public async sendVideo(from: string, file: string | Buffer, id?: proto.WebMessageInfo | undefined): Promise <void | Error> {
		try {
			if (typeof file !== "string") {
				return id === undefined ? void await this.client.sendMessage(from, file, MessageType.video) : void await this.client.sendMessage(from, file, MessageType.video, { quoted: id })
			} else if (fs.existsSync(file)) {
				return id === undefined ? void await this.client.sendMessage(from, fs.readFileSync(file), MessageType.video) : void await this.client.sendMessage(from, fs.readFileSync(file), MessageType.video, { quoted: id })
			} else if (isUrl(file)) {
				return id  === undefined ? void await this.client.sendMessage(from, await Buffer(file), MessageType.video) : void await this.client.sendMessage(from, await Buffer(file), MessageType.video,  { quoted: id})
			} else {
				return new Error("Input data yang bener")
			}
		} catch (err) {
			throw console.log(new Error(`${err}`))
		}
	}
	public async sendAudio (from: string, file: string | Buffer, ptt?: boolean,  id?: proto.WebMessageInfo | undefined): Promise <void | Error> {
		const Ptt: boolean = ptt === undefined ? false : ptt
		try {
			if (typeof file !== "string") {
				return id === undefined ? void await this.client.sendMessage(from, file, MessageType.audio) : void await this.client.sendMessage(from, file, MessageType.audio, { quoted: id, ptt: Ptt })
			} else if (fs.existsSync(file)) {
				return id === undefined ? void await this.client.sendMessage(from, fs.readFileSync(file), MessageType.audio) : void await this.client.sendMessage(from, fs.readFileSync(file), MessageType.audio, { quoted: id, ptt: Ptt })
			} else if (isUrl(file)) {
				return id  === undefined ? void await this.client.sendMessage(from, await Buffer(file), MessageType.audio) : void await this.client.sendMessage(from, await Buffer(file), MessageType.audio,  { quoted: id, ptt: Ptt})
			} else {
				return new Error("Input data yang bener")
			}
		} catch (err) {
			throw console.log(new Error(`${err}`))
		}
	}
}
