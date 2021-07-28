import { config } from "dotenv";
config();
import { Connected as Base} from "../routers/connect/koneksi";
import { WAChatUpdate, WAConnection, MessageType } from "@adiwajshing/baileys";
import { HandlerMsg } from "./handler";
import { Validasi, HandlingMessage} from "../typings";
import utils from "util";
import ts from "typescript";

let menu: any = []


export class Main  {
	public client: WAConnection = new WAConnection();
	public message: HandlerMsg = new HandlerMsg(this.client)
	constructor() {
	}
	public Response () {
		this.client.on("chat-update", async (chats: WAChatUpdate) => {
			const data: HandlingMessage  | undefined= await  this.message.handling(chats)
			if (data == undefined) return
			const { message, command, isOwner, args, from, mess } = data
			if (isOwner && from) {
				switch(true) {
					case /^=>/.test(command): {
						args.shift()
							const Ev: string = ts.transpile(`(async () => {
								${args?.join(" ")}
							})()`)
							const send: string = utils.format(eval(Ev))
							await this.client.sendMessage(from, send, MessageType.text, { quoted: mess })
					}
					break
				}
			}
		})
	}
	public async sendText (data: HandlingMessage, text: string) {
		await this.client.sendMessage(data.from ? data.from : "", text, MessageType.text)
	}
	public async on (tags: string, command: string, prefix?: string, _data?: HandlingMessage, printCb?: (send: this) => void){
	}
}

