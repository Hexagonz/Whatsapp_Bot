import { config } from "dotenv";
config();
import { WAChatUpdate, WAConnection } from "@adiwajshing/baileys";
import { HandlerMsg } from "./handler";
import { HandlingMessage, Commands } from "../typings";
import { Command } from "./command";
import {  Searching } from "../messages";
import { Detector } from "./detector";
import { Client } from "./Client";
import { IndPublicSucces, IndPublicDuplicate } from "../lang/ind"



let Public: boolean = false


export class Main  {
	public client: WAConnection = new WAConnection();
	public message: HandlerMsg = new HandlerMsg(this.client);
	public Ra: Client = new Client(this.client)
	private Respon: Searching  = new Searching(this.Ra);
	protected detector: any
	constructor() {
	}
	public Response () {
		this.client.on("chat-update", async (chats: WAChatUpdate) => {
			const data: HandlingMessage  | undefined= await  this.message.handling(chats)
			if (data == undefined) return;
			this.detector = new Detector(this.client, data)
			this.detector.antiAll()
			if (data.isBot) return;
			if (!data.isOwner && !Public) return;
			this.detector.Handling()
			globalThis.prefix = data.Prefix
			globalThis.CMD = new Command(globalThis.prefix)
			this.Respon.sendResponse()
			this.detector.CommnadGlobal()
			if (/^(publik|public)/i.test(data.Command) && data.isOwner) {
				let Body: string =  data.body ? data.body : ""
				if (/(on)/i.test(Body.split(" ")[1])) {
					if (Public) return this.Ra.reply(data.from || "", IndPublicDuplicate(true), data.mess)
					Public = true
					this.Ra.reply(data.from || "", IndPublicSucces(true), data.mess)
				} else if (/(off)/i.test(Body.split(" ")[1])){
					if(!Public) return this.Ra.reply(data.from || "", IndPublicDuplicate(false), data.mess)
					Public = false
					this.Ra.reply(data.from || "", IndPublicSucces(false), data.mess)
				}
			}
			return void await CMD.validate(data, this.client)
		})
	}
}
