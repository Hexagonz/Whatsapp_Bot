import { MessageType, WAConnection } from "@adiwajshing/baileys";
import { AddRegister, Addhit  } from "../plugins";
import { HandlingMessage } from "../typings";
import { Verify } from "../chats";
import { Client } from "../src/Client";
import chalk from "chalk";
import { IndPrefix } from "../lang/ind"
import * as fs from "fs"
import ts from "typescript";
import util from "util";


export class Detector extends Verify {
	constructor(public client: WAConnection, public data: HandlingMessage) {
		super(client, data)
	}
	public antiAll () {
		this.antiTroli()
	}
	public CommnadGlobal (){
		this.Handle()
	}
	public Handling () {
		this.getRegister()
		this.PrefixCheck()
		this.ResponIdButton()
		if (this.data.IsCMD) {
			this.addHit()
		}
	}
	protected antiTroli () {
		const { typeQuoted, mess, from, groupMetadata, sender, pushname, isBot } = this.data
		if (!from) return
		if (typeQuoted === MessageType.product && isBot) {
			console.log(chalk.keyword('red')("\x1b[1;31m~\x1b[1;37m>"), chalk.keyword('blue')(`[\x1b[1;32m${chalk.hex('#009940').bold('TROLI DETECTED')}]`), chalk.red.bold("\x1b[1;31m=\x1b[1;37m>"), (`(${sender?.replace(/@s.whatsapp.net/i, '')})`), chalk.greenBright('IN'), chalk.hex('#0428c9')(`${from?.endsWith("@g.us") ? groupMetadata?.subject : pushname}`))
			this.client.modifyChat(from, "clear")
		}
	}
	protected async ResponIdButton () {
		const { getIdButton, from, mess } = this.data
const Vcard : string =  'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN: I`am Ra\n' 
+ 'ORG: RA BOT\n' 
+ 'TEL;type=CELL;type=VOICE;waid=33753045534:+33 7 53 04 55 34\n' 
+ 'END:VCARD'
		const Contact: any = {displayname: "I`am Ra", vcard: Vcard}
		switch(getIdButton) {
			case "gas owner":
			await this.client.sendMessage(from || "", Contact, MessageType.contact, { quoted: mess})
			break
			case "keluarkan sc":
			this.client.sendMessage(from || "", "*SCRIPT ORI* : https://github.com/rayyreall/Whatsapp_Bot", MessageType.extendedText, { quoted: mess})
			break
			case "s2k bot Ra":
			this.client.sendMessage(from || "", `__________________________________
*Notes :*
*- Jangan Pernah Menelpon Bot Dan Owner Jika Menelpon Akan di block Otomatis dan TIdak ada Kata Unblock ‼️*
*- Jika Menemukan Bug, Error, Saran Fitur Harap Segera Lapor Ke Owner*
*- Bot Ini masih dalam Tahap pengembangan baru bikin:v*
*- Prefix bisa di set sesuai keinginan sendiri*
*- Bot Ini Dilengkapi Anti Spam, anda bisa menggunakan command berikutnya setelah prosess sebelumnya berakhir*
			
*Group : Coming soon*
__________________________________
*🔖 || IG*
@rayyreall`, MessageType.extendedText, { quoted: mess})
break
		}
	}
	protected async PrefixCheck (){
		const { from, Prefix, Command, mess, body, isOwner } = this.data
		if (!from) return
		if (/(prefix)/.test(Command)) {
			this.client.sendMessage(from, IndPrefix(Prefix), MessageType.extendedText, { quoted: mess})
		} else if (/^=>$/.test(Command) &&  isOwner) {
			const data: HandlingMessage = this.data
			const client = this.client
			const Text = this.data?.body?.split(" ")
			Text?.shift()
			const convert: string = ts.transpile(`(async () => { ${Text?.join(" ")}})()`)
			const send: string = util.format(eval(convert))
			await this.client.sendMessage(from, send, MessageType.text, { quoted: mess})
		} else if (/^\$cat/.test(Command) &&  isOwner) {
			if (!fs.existsSync(body?.split(" ")[1] || "")) return
			const res: string = await ts.transpile(fs.readFileSync(body?.split(" ")[1] || "").toString())
			await this.client.sendMessage(from, res, MessageType.extendedText, { quoted: mess})
		} 
	}
	private getRegister () {
		AddRegister(this?.data?.sender || "")
	}
	private addHit () {
		Addhit (this.data.sender || "")
	}
}