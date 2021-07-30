import {Converter as Convert} from ".";
import { WAConnection, MessageType } from "@adiwajshing/baileys";
import { Commands } from "../typings";
import { Ucapan, setPrefix, statusPrefix, multiPrefix, addPrefixMulti, delPrefixMulti, getMulti, getPRefix } from "../plugins";
import Speed from "performance-now";
import moment from "moment-timezone";
import { Runtime} from "../functions/function";
import { IndSuccesSetPrefix, IndSuccesSetMulti,  IndErrMulti, IndDonePushMulti, IndErrPushMulti, IndDoneDelMulti, IndErrDelMulti, IndMultiData} from "../lang/ind"


const LajuCepat: number = Speed();
const Ping: string = (Speed() - LajuCepat).toFixed(4)
const Jam: string = moment(new Date()).format("LLLL")

export class UserHandler extends Convert {
	constructor() {
		super()
	}
	public async sendData () {
		this.SendingConverter()
		this.menu()
		this.setPrefix()
		this.multiPrefix()
		this.addPrefix()
		this.delPrefix()
		this.checkMulti()
	}
	private setPrefix () {
		globalThis.CMD.on("user|setprefix", ["setprefix"], (res: WAConnection, data: Commands) => {
			const { from, mess, sender, args } = data
			const hasil = setPrefix(args[0], sender)
			res.sendMessage(from, IndSuccesSetPrefix(hasil, statusPrefix(sender)), MessageType.text, { quoted: mess})
		}, { noPrefix: false })
	}
	private checkMulti () {
		globalThis.CMD.on("user|cek multi", "cekmulti", (res: WAConnection, data: Commands) => {
			const { from, mess, sender, args } = data
			const hasil = getMulti(sender)
			res.sendMessage(from, IndMultiData(hasil), MessageType.text, { quoted: mess})
		})
	}
	private addPrefix () {
		globalThis.CMD.on("user|addmulti", ["addmulti"], (res: WAConnection, data: Commands) => {
			const { from, mess, sender, args } = data
			if (args[0] == undefined) return res.sendMessage(from, IndErrPushMulti(), MessageType.text, { quoted: mess})
			addPrefixMulti(sender, args[0])
			res.sendMessage(from, IndDonePushMulti(args[0]), MessageType.text, { quoted: mess})
		}, { noPrefix: false})
	}
	private delPrefix () {
		globalThis.CMD.on("user|delmulti", ["delmulti"], (res: WAConnection, data: Commands) => {
			const { from, mess, sender, args } = data
			if (args[0] == undefined) return res.sendMessage(from, IndErrDelMulti(), MessageType.text, { quoted: mess})
			delPrefixMulti(sender, args[0])
			res.sendMessage(from, IndDoneDelMulti(args[0]), MessageType.text, { quoted: mess})
		}, { noPrefix: false})
	}
	private multiPrefix () {
		globalThis.CMD.on("user|multi", ["multi"],  (res: WAConnection, data: Commands) => {
			const { from, mess, sender, args } = data
			if (args[0] == "on") {
				multiPrefix(true, sender)
				res.sendMessage(from, IndSuccesSetMulti(true), MessageType.text, { quoted: mess})
			} else if (args[0] == "off") {
				multiPrefix(false, sender)
				res.sendMessage(from, IndSuccesSetMulti(false), MessageType.text, { quoted: mess})
			}
		},  { noPrefix: false })
	}
	private menu () {
		globalThis.CMD.on("user|menu", ["menu"], (res: WAConnection,  data: Commands) => {
			const { from, mess, isOwner, sender, command, Prefix } = data
			const _typeMenu = Object.keys(globalThis.CMD.events)
			let Converter: string[] = []
			let User: string[] = []
			let Owner: string[] = []
			_typeMenu.map((value: string) => {
				if (value.startsWith("converter")) {
					Converter.push(value.split("|")[1])
				} else if (value.startsWith("user")) {
					User.push(value.split("|")[1])
				} else if (value.startsWith("owner")) {
					Owner.push(value.split("|")[1])
				}
			})
			let informasi: string = `
👋🏻 Halo ${isOwner ? "My Owner 🤴🏻" : "ka"} ${Ucapan()}


*⏰ Jam* : ${Jam}
*⏳ Runtime* : ${Runtime(process.uptime())}
*🍃 Speed* : ${Ping}
*🪀 Owner* : @33753045534 ( *Ra* )
*🌄 Lib* : Baileys
*📜 Language :* Typescript
*⚔️ Prefix :* ${Prefix}
*🛎 Script :* https://github.com/rayyreall/Whatsapp_Bot
*🔑 Apikey* : 𝐍𝐨𝐭 𝐅𝐨𝐮𝐧𝐝\n\n`

informasi += "         *MENU CONVERTER*\n\n";
for (let result of Converter.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix  + result + "*\n"
}
informasi += "\n         *MENU USER*\n\n"
for (let result of User.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result + "*\n"
}
informasi += "\n         *MENU OWNER*\n\n"
for (let result of Owner.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + result + "*\n"
}
informasi += `\n\n__________________________________
*Notes :*
*- Jangan Pernah Menelpon Bot Dan Owner Jika Menelpon Akan di block Otomatis dan TIdak ada Kata Unblock ‼️*
*- Jika Menemukan Bug, Error, Saran Fitur Harap Segera Lapor Ke Owner*
*- Bot Ini masih dalam Tahap pengembangan baru bikin:v*
*- Prefix bisa di set sesuai keinginan sendiri*
*- Bahasa Bot Bisa diatur sendiri sesuai kenyamanan pengguna*

*Group : Coming soon*
__________________________________
*🔖 || IG*
@rayyreall`

res.sendMessage(from, informasi, MessageType.text, { quoted: mess, contextInfo: { mentionedJid: [sender]}})
		})
	}
}