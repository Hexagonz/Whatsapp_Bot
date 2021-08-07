import { Storager } from '.'
import { WAConnection, MessageType } from '@adiwajshing/baileys'
import { Commands, instaStalk, TiktokStalk } from '../typings'
import { InstaStalk, InstaStalkV2, InstaStalkV3, ytStalk, tiktokStalk } from '../routers/api'
import { ChannelSearchResult } from 'yt-search'
import {
    IgStalk,
    IndUserKosong,
    IndUsernameNoKosong,
    IndYtStalk,
    IndYtStalkError,
    IndStalkUsernameNull,
    IndTiktokStalk,
    IndMasukkanUsernameNoUrl
} from '../lang/ind'
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
        globalThis.CMD.on(
            'stalk|tiktokstalk <username>',
            ['stalktiktok', 'tiktokstalk'],
            async (res: WAConnection, data: Commands) => {
                const { from, mess, args, sendOwner } = data
                if (args[0] == undefined) return await this.Ra.reply(from, IndUsernameNoKosong(), mess)
                if (isUrl(args[0])) return await this.Ra.reply(from, IndMasukkanUsernameNoUrl('Tiktok'), mess)
                try {
                    await tiktokStalk(args[0]).then(async (value: TiktokStalk) => {
                        await this.Ra.sendImage(from, value.avatarThumb, IndTiktokStalk(value), mess)
                    })
                } catch (err) {
                    await this.Ra.reply(from, IndStalkUsernameNull('Tiktok'), mess)
                }
            }
        )
    }
    private async YoutubeStalk() {
        globalThis.CMD.on('stalk|ytstalk <username>', ['ytstalk'], async (res: WAConnection, data: Commands) => {
            const { from, mess, args, sendOwner } = data
            if (args[0] == undefined) return await this.Ra.reply(from, IndUsernameNoKosong(), mess)
            try {
                const result: ChannelSearchResult = await ytStalk(args.join(' ').trim())
                if (result == undefined) return await this.Ra.reply(from, IndStalkUsernameNull('Youtube'), mess)
                await this.Ra.sendImage(from, result.thumbnail, IndYtStalk(result), mess)
            } catch (err) {
                await this.Ra.reply(from, IndYtStalkError(), mess)
                await this.Ra.sendText(sendOwner, 'Youtube Stalker Error :' + err)
            }
        })
    }
    private async insta() {
        globalThis.CMD.on('stalk|igstalk <username>', ['igstalk'], async (res: WAConnection, data: Commands) => {
            const { from, mess, args, pushname } = data
            if (args[0] == undefined) return await this.Ra.reply(from, IndUsernameNoKosong(), mess)
            await InstaStalk(args[0])
                .then(async (respon: instaStalk) => {
                    await this.Ra.sendImage(from, respon.thumb, IgStalk(respon), mess)
                })
                .catch(async () => {
                    await InstaStalkV2(args[0])
                        .then(async (respon: instaStalk) => {
                            await this.Ra.sendImage(from, respon.thumb, IgStalk(respon), mess)
                        })
                        .catch(async () => {
                            await InstaStalkV3(args[0])
                                .then(async (respon: instaStalk) => {
                                    await this.Ra.sendImage(from, respon.thumb, IgStalk(respon), mess)
                                })
                                .catch(async () => {
                                    await this.Ra.reply(from, IndUserKosong(pushname), mess)
                                })
                        })
                })
        })
    }
}
