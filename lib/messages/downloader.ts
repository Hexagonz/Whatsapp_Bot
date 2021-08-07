import { GroupData } from '.'
import { Client } from '../src/Client'
import { ConnectMoongo } from '../database/mongoodb/main'

export class Downloader extends GroupData {
    constructor(public Ra: Client, public database: ConnectMoongo) {
        super(Ra, database)
    }
    public SendDownloader() {
        this.SendDataGc()
    }
}
