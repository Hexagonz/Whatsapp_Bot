import { Searching } from '.'
import { Client } from '../src/Client'
import { ConnectMoongo } from '../database/mongoodb/main'
import { WAConnection, MessageType } from '@adiwajshing/baileys'
import { Commands } from '../typings'
import { indAfkOn } from '../lang/ind'

export class GroupCommands extends Searching {
    constructor(public Ra: Client, public database: ConnectMoongo) {
        super(Ra, database)
    }
    public sendHandling() {
        this.sendResponse()
        this.Afk()
    }
    public async Afk() {
        globalThis.CMD.on('group|afk', ['afk'], async (res: WAConnection, data: Commands) => {
            const { from, sender, isGroupMsg, args, mess } = data
            if (!isGroupMsg) return
            const Format: { id: string; from: string; alasan: string; time: number } = {
                id: sender + from,
                from: from,
                alasan: args[0] ? args.join(' ') : 'Tanpa alasan',
                time: Date.now()
            }
            await this.database.AddAfk(sender + from, Format)
            return void (await this.Ra.reply(from, indAfkOn(), mess))
        })
    }
}
