import {Converter as Convert} from ".";
import { WAConnection, MessageType } from "@adiwajshing/baileys";
import { Commands } from "../typings";
import { Ucapan, setPrefix, statusPrefix, multiPrefix, addPrefixMulti, delPrefixMulti, getMulti,  getHit } from "../plugins";
import Speed from "performance-now";
import moment from "moment-timezone";
import { Runtime} from "../functions/function";
import { Client } from "../src/Client"
import * as fs from "fs"
import { IndSuccesSetPrefix, IndSuccesSetMulti,  IndErrMulti, IndDonePushMulti, IndErrPushMulti, IndDoneDelMulti, IndErrDelMulti, IndMultiData} from "../lang/ind"


const LajuCepat: number = Speed();
const Ping: string = (Speed() - LajuCepat).toFixed(4)
const Jam: string = moment(new Date()).format("LLLL")

export class UserHandler extends Convert {
	constructor(public Ra: Client) {
		super(Ra)
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
			if (!sender) return
			const hasil = setPrefix(args[0], sender)
			this.Ra.reply (from, IndSuccesSetPrefix(hasil || "", statusPrefix(sender)),mess)
		}, { noPrefix: false })
	}
	private checkMulti () {
		globalThis.CMD.on("user|cekmulti", "cekmulti", (res: WAConnection, data: Commands) => {
			const { from, mess, sender, args } = data
			if (!sender) return
			const hasil: string | undefined = getMulti(sender)
			if (typeof hasil !== "string") return
			this.Ra.reply(from, IndMultiData(hasil), mess)
		})
	}
	private addPrefix () {
		globalThis.CMD.on("user|addmulti", ["addmulti"], (res: WAConnection, data: Commands) => {
			const { from, mess, sender, args } = data
			if (args[0] == undefined) return this.Ra.reply(from, IndErrPushMulti(), mess)
			if (!sender) return
			addPrefixMulti(sender, args[0])
			this.Ra.reply(from, IndDonePushMulti(args[0]), mess)
		}, { noPrefix: false})
	}
	private delPrefix () {
		globalThis.CMD.on("user|delmulti", ["delmulti"], (res: WAConnection, data: Commands) => {
			const { from, mess, sender, args } = data
			if (!sender) return
			if (args[0] == undefined) return this.Ra.reply(from, IndErrDelMulti(), mess)
			delPrefixMulti(sender, args[0])
			this.Ra.reply(from, IndDoneDelMulti(args[0]), mess)
		}, { noPrefix: false})
	}
	private multiPrefix () {
		globalThis.CMD.on("user|multi", ["multi"],  (res: WAConnection, data: Commands) => {
			const { from, mess, sender, args } = data
			if (!sender) return
			if (args[0] == "on") {
				multiPrefix(true, sender)
				this.Ra.reply(from, IndSuccesSetMulti(true), mess)
			} else if (args[0] == "off") {
				multiPrefix(false, sender)
				this.Ra.reply(from, IndSuccesSetMulti(false), mess)
			}
		},  { noPrefix: false })
	}
	private menu () {
		globalThis.CMD.on("user|menu", ["menu"], (res: WAConnection,  data: Commands) => {
			const { from, mess, isOwner, sender, command, Prefix } = data
			var _database: { ownerNumber: string[], bot: string} =  fs.existsSync("./lib/database/settings.json") ? JSON.parse(fs.readFileSync("./lib/database/settings.json").toString()) : {}
			const _typeMenu = Object.keys(globalThis.CMD.events)
			let Converter: string[] = []
			let User: string[] = []
			let Owner: string[] = ["=>", "$cat", "publik/public <on/off>"]
			let Storage: string[] = []
			let Stalker: string[] = []
			let Group: string[] = []
			_typeMenu.map((value: string) => {
				if (value.startsWith("converter")) {
					Converter.push(value.split("|")[1])
				} else if (value.startsWith("user")) {
					User.push(value.split("|")[1])
				} else if (value.startsWith("owner")) {
					Owner.push(value.split("|")[1])
				} else if (value.startsWith("storage")) {
					Storage.push(value.split("|")[1])
				} else if (value.startsWith("stalk")) {
					Stalker.push(value.split("|")[1])
				} else if (value.startsWith("admingc")) {
					Group.push(value.split("|")[1])
				}
			})
			let informasi: string = `
👋🏻 Halo ${isOwner ? "My Owner 🤴🏻" : "ka"} ${Ucapan()}


*🤴🏻 Bot :* ${_database.bot}
*⏰ Jam* : ${Jam}
*⏳ Runtime* : ${Runtime(process.uptime())}
*🍃 Speed* : ${Ping}
*🪀 Owner* : @33753045534 ( *Ra* )
*🌄 Lib* : Baileys
*♦️ Hit User* : ${getHit(sender || "")}
*📜 Language :* Typescript
*⚔️ Prefix :* ${Prefix}
*🔑 Apikey* : 𝐍𝐨𝐭 𝐅𝐨𝐮𝐧𝐝
*🛎 Script :* https://github.com/rayyreall/Whatsapp_Bot \n\n`

informasi += "\n         *MENU OWNER*\n\n"
for (let result of Owner.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + result + "*\n"
}
informasi += "\n         *MENU USER*\n\n"
for (let result of User.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result + "*\n"
}
informasi += "\n         *MENU CONVERTER*\n\n";
for (let result of Converter.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix  + result + "*\n"
}
informasi += "\n         *MENU STORAGE*\n\n";
for (let result of Storage.sort()) {
	informasi  += `*ℒ⃝🕊️ •* *` + Prefix  + result + "*\n"
}
informasi += "\n         *MENU STALK*\n\n";
for (let result of Stalker.sort()) {
	informasi  += `*ℒ⃝🕊️ •* *` + Prefix  + result + "*\n"
}
informasi += "\n         *MENU ADMIN GROUP*\n\n";
for (let result of Group.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix  + result + "*\n"
}
informasi += `\n\n__________________________________
*Notes :*
*- Jangan Pernah Menelpon Bot Dan Owner Jika Menelpon Akan di block Otomatis dan TIdak ada Kata Unblock ‼️*
*- Jika Menemukan Bug, Error, Saran Fitur Harap Segera Lapor Ke Owner*
*- Bot Ini masih dalam Tahap pengembangan baru bikin:v*
*- Prefix bisa di set sesuai keinginan sendiri*
*- Bot Ini Dilengkapi Anti Spam, anda bisa menggunakan command berikutnya setelah prosess sebelumnya berakhir*

*Group : Coming soon*
__________________________________
*🔖 || IG*
@rayyreall`

this.Ra.sendTextWithMentions(from, informasi, ["33753045534@s.whatsapp.net"], mess)
		})
	}
}