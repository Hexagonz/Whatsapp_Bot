import { Converter as Convert } from '.'
import { WAConnection, MessageType, proto, WAChat } from '@adiwajshing/baileys'
import { Commands } from '../typings'
import { Ucapan } from '../plugins'
import Speed from 'performance-now'
import moment from 'moment-timezone'
import jimp from 'jimp'
import { Runtime } from '../functions/function'
import { Client } from '../src/Client'
import * as fs from 'fs'
import { ConnectMoongo } from '../database/mongoodb/main'
import { config } from 'dotenv'
config({ path: './.env' })
import { IndSuccesSetPrefix, IndSuccesSetMulti, IndDonePushMulti, IndErrPushMulti, IndDoneDelMulti, IndErrDelMulti, IndMultiData, BerhasilJoin, IndGagalJoin, IndSudahDalamGc } from '../lang/ind'

const LajuCepat: number = Speed()
const Ping: string = (Speed() - LajuCepat).toFixed(4)
const Jam: string = moment(new Date()).format('LLLL')

export class UserHandler extends Convert {
    constructor(public Ra: Client, public database: ConnectMoongo) {
        super(Ra)
    }
    public async sendData(): Promise<void> {
        this.SendingConverter()
        this.menu()
        this.setPrefix()
        this.multiPrefix()
        this.addPrefix()
        this.delPrefix()
        this.checkMulti()
        this.Creator()
        this.Join()
    }
    private setPrefix(): void {
        globalThis.CMD.on('user|setprefix <prefix>', ['setprefix'], async (res: WAConnection, data: Commands) => {
			const { from, mess, sender, args } = data
            if (!sender) return
			await this.database.setprefix(sender, args[0])
			return void this.Ra.reply(from, IndSuccesSetPrefix(args[0], await this.database.statusPrefix(sender)), mess)
		}, { noPrefix: false })
    }
    private checkMulti(): void {
        globalThis.CMD.on('user|cekmulti', 'cekmulti', async (res: WAConnection, data: Commands) => {
			const { from, mess, sender } = data
            if (!sender) return
            const hasil: string | undefined = await this.database.getMultiPrefix(sender)
            if (typeof hasil !== 'string') return
            return void this.Ra.reply(from, IndMultiData(hasil), mess)
        })
    }
    private addPrefix(): void {
        globalThis.CMD.on('user|addmulti <prefix>', ['addmulti'], async (res: WAConnection, data: Commands) => {
                const { from, mess, sender, args } = data
                if (args[0] == undefined) return this.Ra.reply(from, IndErrPushMulti(), mess)
                if (!sender) return
                await this.database.addMultiPrefix(sender, args[0])
                return void this.Ra.reply(from, IndDonePushMulti(args[0]), mess)
            },
            { noPrefix: false }
        )
    }
    private Creator(): void {
        globalThis.CMD.on('user|creator/owner', ['owner', 'creator'], (res: WAConnection, data: Commands) => {
            const { from, mess } = data
            return void this.Ra.sendContactOwner(from, mess)
        })
    }
    private delPrefix(): void | undefined {
        globalThis.CMD.on('user|delmulti <prefix>', ['delmulti'], async (res: WAConnection, data: Commands) => {
			const { from, mess, sender, args } = data
            if (!sender) return
            if (args[0] == undefined) return this.Ra.reply(from, IndErrDelMulti(), mess)
            await this.database.delMultiPrefix(sender, args[0])
            return void this.Ra.reply(from, IndDoneDelMulti(args[0]), mess)
		}, { noPrefix: false })
    }
    private multiPrefix(): void {
        globalThis.CMD.on('user|multi <on/off>', ['multi'], async (res: WAConnection, data: Commands) => {
            const { from, mess, sender, args } = data
            if (!sender) return
            if (args[0] == 'on') {
				await this.database.multiPRefix(true, sender)
				return void this.Ra.reply(from, IndSuccesSetMulti(true), mess)
            } else if (args[0] == 'off') {
                await this.database.multiPRefix(false, sender)
                return void this.Ra.reply(from, IndSuccesSetMulti(false), mess)
			}
		}, { noPrefix: false })
    }
    private Join() {
        globalThis.CMD.on('user|join <link gc>', ['join', 'gabung'], async (res: WAConnection, data: Commands) => {
            const { from, mess, args, bodyQuoted, quotedMsg } = data
            let check: RegExpMatchArray | null | undefined = args[0] ? args.join(' ').match(/(?:http(?:s|):\/\/|)chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i) : quotedMsg ? bodyQuoted?.match(/(?:http(?:s|):\/\/|)chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i) : []
            if (!check) return this.Ra.reply(from, IndGagalJoin(), mess)
            let [link, id] = check
            let response = await res.query({
                json: ['query', 'invite', id]
            })
            const CheckData: WAChat[] = await res.chats.all()
            if (CheckData.find((value) => value.jid == response.id)) return this.Ra.reply(from, IndSudahDalamGc(), mess)
            await res.acceptInvite(id).then(async () => {
				this.Ra.reply(from, BerhasilJoin(), mess)
			}).catch(() => {
				this.Ra.reply(from, IndGagalJoin(), mess)
			})
        })
    }
    private menu(): void {
        globalThis.CMD.on('user|menu', ['menu'], async (res: WAConnection, data: Commands) => {
			const { from, isOwner, sender, command, Prefix } = data
            const _typeMenu: string[] = Object.keys(globalThis.CMD.events)
            let Converter: string[] = []
            let User: string[] = []
            let Owner: string[] = ['=>', '$cat', 'publik/public <on/off>']
            let Storage: string[] = []
            let Stalker: string[] = []
            let Group: string[] = []
            let GroupMem: string[] = []
            let Musik: string[] = []
            let Voting: string[] = []
			let Guards: string[] = []
            _typeMenu.map((value: string) => {
                if (value.startsWith('converter')) {
                    Converter.push(value.split('|')[1])
                } else if (value.startsWith('user')) {
                    User.push(value.split('|')[1])
                } else if (value.startsWith('owner')) {
                    Owner.push(value.split('|')[1])
                } else if (value.startsWith('storage')) {
                    Storage.push(value.split('|')[1])
                } else if (value.startsWith('stalk')) {
                    Stalker.push(value.split('|')[1])
                } else if (value.startsWith('admingc')) {
                    Group.push(value.split('|')[1])
                } else if (value.startsWith('voting')) {
                    Voting.push(value.split('|')[1])
                } else if (value.startsWith('musik')) {
                    Musik.push(value.split('|')[1])
                } else if (value.startsWith('group')) {
                    GroupMem.push(value.split('|')[1])
                } else if (value.startsWith("guard")) {
					Guards.push(value.split("|")[1])
				}
            })
            let informasi: string = `
👋🏻 Halo ${isOwner ? 'My Owner 🤴🏻' : 'ka'} ${Ucapan()}


*🤴🏻 Bot :* ${process.env.bot}
*⏰ Jam* : ${Jam}
*⏳ Runtime* : ${Runtime(process.uptime())}
*🍃 Speed* : ${Ping}
*🪀 Creator* : @33753045534 ( *Ra* )
*🌄 Lib* : Baileys
*🗄️ Database* : MongoDB
*♦️ Hit User* : ${await this.database.getHIT(sender || '')}
*📜 Language :* Typescript
*⚔️ Prefix :* ${Prefix}
*🔑 Apikey* : 𝐍𝐨𝐭 𝐅𝐨𝐮𝐧𝐝\n\n`

informasi += '\n         *MENU OWNER*\n\n'
for (let result of Owner.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + result.charAt(0).toUpperCase() + result.slice(1) + '*\n'
}
informasi += '\n         *MENU USER*\n\n'
for (let result of User.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result.charAt(0).toUpperCase() + result.slice(1)+ '*\n'
}
informasi += '\n         *MENU CONVERTER*\n\n'
for (let result of Converter.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result.charAt(0).toUpperCase() + result.slice(1) + '*\n'
}
informasi += '\n         *MENU MUSIK*\n\n'
for (let result of Musik.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result.charAt(0).toUpperCase() + result.slice(1) + '*\n'
}
informasi += '\n         *MENU STORAGE*\n\n'
for (let result of Storage.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result.charAt(0).toUpperCase() + result.slice(1) + '*\n'
}
informasi += '\n         *MENU STALK*\n\n'
for (let result of Stalker.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result.charAt(0).toUpperCase() + result.slice(1) + '*\n'
}
informasi += '\n         *MENU ADMIN GROUP*\n\n'
for (let result of Group.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result.charAt(0).toUpperCase() + result.slice(1) + '*\n'
}
informasi += '\n         *MENU GROUP*\n\n'
for (let result of GroupMem.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result.charAt(0).toUpperCase() + result.slice(1) + '*\n'
}
informasi +=  '\n         *MENU GROUP GUARD*\n\n'
for (let result of Guards.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result.charAt(0).toUpperCase() + result.slice(1) + '*\n'
}
informasi += '\n         *VOTING*\n\n'
for (let result of Voting.sort()) {
	informasi += `*ℒ⃝🕊️ •* *` + Prefix + result.charAt(0).toUpperCase() + result.slice(1) + '*\n'
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
            const Thumb: Buffer = fs.readFileSync('./lib/storage/polosan/thumb2.png')
            const Buttons = {
                contentText: informasi,
                footerText: '🔖 @Powered bye Ra',
                buttons: [
                    {
                        buttonId: 'gas owner',
                        buttonText: { displayText: '𝗢𝗪𝗡𝗘𝗥 / 𝗖𝗥𝗘𝗔𝗧𝗢𝗥' },
                        type: 1
                    },
                    {
                        buttonId: 'keluarkan sc',
                        buttonText: { displayText: '𝗦𝗖𝗥𝗜𝗣𝗧 𝗕𝗢𝗧' },
                        type: 1
                    },
                    {
                        buttonId: 's2k bot Ra',
                        buttonText: { displayText: '𝗦𝗬𝗔𝗥𝗔𝗧 & 𝗞𝗘𝗧𝗘𝗡𝗧𝗨𝗔𝗡' },
                        type: 1
                    }
                ],
                headerType: 4,
                imageMessage: await (await res.prepareMessageMedia(fs.readFileSync('./lib/storage/polosan/thumb.png'), MessageType.image,{ thumbnail: Thumb.toString()})).imageMessage
            } as proto.ButtonsMessage
            let response: proto.WebMessageInfo | any = await res.prepareMessage(from, Buttons, MessageType.buttonsMessage, { thumbnail: Thumb.toString(), contextInfo: { mentionedJid: ['33753045534@s.whatsapp.net', sender || '']}})
            if (response.message?.ephemeralMessage) {
                response.message.ephemeralMessage.message.buttonsMessage.imageMessage.jpegThumbnail = Thumb
            } else {
                response.message.buttonsMessage.imageMessage.jpegThumbnail = Thumb
            }
            return void (await res.relayWAMessage(response))
        })
    }
}
