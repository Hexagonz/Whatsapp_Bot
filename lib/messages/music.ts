import { Stalking } from '.'
import { Client } from '../src/Client'
import { WAConnection } from '@adiwajshing/baileys'
import { Commands, LirikResult, Azlirik } from '../typings'
import { LirikLagu, AzLirik } from '../routers/api'
import { IndLirikMusicMatch, IndAzLirik, LirikGada } from '../lang/ind'
import { ConnectMoongo } from '../database/mongoodb/main'

export class MusicHandling extends Stalking {
	constructor(public Ra: Client, public database: ConnectMoongo) {
        super(Ra, database)
    }
    public SendDataMusic() {
        this.Sendding()
        this.Lirik()
    }
    private Lirik() {
		globalThis.CMD.on('musik|lirik <judul>', ['lirik', 'lyrics'], async (res: WAConnection, data: Commands) => {
			const { from, args, mess } = data
            await LirikLagu(args.join(' ')).then(async (result: LirikResult | undefined) => {
				if (result == undefined) {
					await AzLirik(args.join(' ')).then((value: Azlirik) => {
						this.Ra.reply(from, IndAzLirik(value), mess)
					}).catch(() => {
						this.Ra.reply(from, LirikGada(), mess)
					})
				} else {
					this.Ra.sendImage(from, result.result.thumbnail, IndLirikMusicMatch(result), mess)
				}
			}).catch(async () => {
				await AzLirik(args.join(' ')).then((value: Azlirik) => {
					this.Ra.reply(from, IndAzLirik(value), mess)
				}).catch(() => {
					 this.Ra.reply(from, LirikGada(), mess)
					})
				})
			})
		}
	}
