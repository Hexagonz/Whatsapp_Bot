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
import {  Stalking } from "../messages";
import { Detector } from "./detector";
import { Client } from "./Client";



let Public: boolean = false


export class Main  {
	public client: WAConnection = new WAConnection();
	public message: HandlerMsg = new HandlerMsg(this.client);
	public Ra: Client = new Client(this.client)
	private Respon: Stalking  = new Stalking(this.Ra);
	protected detector: Detector
	constructor() {
	}
	public Response () {
		this.client.on("chat-update", async (chats: WAChatUpdate) => {
			const data: HandlingMessage  | undefined= await  this.message.handling(chats)
			if (data == undefined) return;
			if (!data.isOwner || Public) return;
			if (data.fromMe) return;
			this.detector = new Detector(this.client, data)
			this.detector.Handling()
			globalThis.prefix = data.Prefix
			globalThis.CMD = new Command(globalThis.prefix)
			this.Respon.Sendding()
			CMD.on("owner|=>", /(?:)/, async (client: WAConnection, res: Commands ) => {
				const convert: string = ts.transpile(`(async () => { ${res._text}})()`)
				const send: string = util.format(eval(convert))
				await client.sendMessage(res.from, send, MessageType.text, { quoted: res.mess})
			},  { noPrefix: false, owner: true, prefix: /=>/})
			await CMD.validate(data, this.client)
		})
	}
}
