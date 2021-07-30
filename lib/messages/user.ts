import {Converter as Convert} from ".";
import { WAConnection, MessageType } from "@adiwajshing/baileys";
import { Commands } from "../typings";
import { Ucapan  } from "../plugins";
import Speed from "performance-now";
import moment from "moment-timezone";
import { Runtime} from "../functions/function";


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
	}
	private menu () {
		globalThis.CMD.on("user|menu", ["menu", "help"], (res: WAConnection,  data: Commands) => {
			const { from, mess, isOwner, sender } = data
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
*⚔️ Prefix :* MULTI PREFIX
*🔑 Apikey* : 𝐍𝐨𝐭 𝐅𝐨𝐮𝐧𝐝\n\n`

informasi += "         *MENU CONVERTER*\n\n";
for (let result of Converter) {
	informasi += `*ℒ⃝🕊️ •* *` + "." + result + "*\n"
}
informasi += "\n         *MENU USER*\n\n"
for (let result of User) {
	informasi += `*ℒ⃝🕊️ •* *` + "." + result + "*\n"
}
informasi += "\n         *MENU OWNER*\n\n"
for (let result of Owner) {
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