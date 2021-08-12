import { Storager } from '.'
import { WAConnection, MessageType } from '@adiwajshing/baileys'
import { Commands, instaStalk, TiktokStalk } from '../typings'
import { InstaStalk, InstaStalkV2, InstaStalkV3, ytStalk, tiktokStalk } from '../routers/api'
import { ChannelSearchResult } from 'yt-search'
import { IgStalk, IndUserKosong, IndUsernameNoKosong, IndYtStalk, IndYtStalkError,  IndTiktokStalk, IndMasukkanUsernameNoUrl,  IndTungguSearch  } from '../lang/ind'
import { Client } from '../src/Client'
import { isUrl } from '../functions/function'
import { ConnectMoongo } from '../database/mongoodb/main'

export class Stalking extends Storager {
    constructor(public Ra: Client, public database: ConnectMoongo) {
        super(Ra, database)
    }
    public async Sendding() {
        this.send()
        this.insta()
        this.YoutubeStalk()
        this.TiktokStalk()
    }
    private async TiktokStalk() {
        globalThis.CMD.on('stalk|tiktokstalk <username>', ['stalktiktok', 'tiktokstalk'], async (res: WAConnection, data: Commands) => {
			const { from, mess, args } = data
            if (args[0] == undefined) return await this.Ra.reply(from, IndUsernameNoKosong("Tiktok"), mess)
            if (isUrl(args[0])) return await this.Ra.reply(from, IndMasukkanUsernameNoUrl('Tiktok'), mess)
			this.Ra.reply(from,  IndTungguSearch(), mess)
            try {
				tiktokStalk(args[0]).then(async (value: TiktokStalk) => {
					return void await this.Ra.sendImage(from, value.avatarThumb, IndTiktokStalk(value), mess)
				})
			} catch (err) {
				return void await this.Ra.reply(from, IndUserKosong ('Tiktok'), mess)
			}
		})
    }
    private YoutubeStalk() {
        globalThis.CMD.on('stalk|ytstalk <username>', ['ytstalk'], async (res: WAConnection, data: Commands) => {
			const { from, mess, args, sendOwner } = data
            if (args[0] == undefined) return await this.Ra.reply(from, IndUsernameNoKosong("Youtube"), mess)
			this.Ra.reply(from,  IndTungguSearch(), mess)
            try {
				ytStalk(args.join(' ').trim()).then((result: ChannelSearchResult ) => {
					if (result == undefined) return  this.Ra.reply(from, IndUserKosong('Youtube'), mess)
					this.Ra.sendImage(from, result.thumbnail, IndYtStalk(result), mess)
				}).catch(() => {
					this.Ra.reply(from, IndYtStalkError(), mess)
				})
            } catch (err) {
				this.Ra.sendText(sendOwner, 'Youtube Stalker Error :' + err)
            }
        })
    }
    private async insta() {
        globalThis.CMD.on('stalk|igstalk <username>', ['igstalk'], async (res: WAConnection, data: Commands) => {
            const { from, mess, args } = data
            if (args[0] == undefined) return await this.Ra.reply(from, IndUsernameNoKosong("Instagram"), mess)
			this.Ra.reply(from,  IndTungguSearch(), mess)
			try {
				InstaStalk(args[0]).then(async (respon: instaStalk) => {
                    return void await this.Ra.sendImage(from, respon.thumb, IgStalk(respon), mess)
                }).catch(async () => {
					InstaStalkV2(args[0]).then(async (respon: instaStalk) => {
						return void await this.Ra.sendImage(from, respon.thumb, IgStalk(respon), mess)
                    }).catch(async () => {
						InstaStalkV3(args[0]).then(async (respon: instaStalk) => {
							return void await this.Ra.sendImage(from, respon.thumb, IgStalk(respon), mess)
						}).catch(async () => {
							return void await this.Ra.reply(from, IndUserKosong("Instagram"), mess)
						})
					})
				})
			} catch (err) {
				console.log(err)
				throw new Error(String(err))
			}
        })
    }
}
