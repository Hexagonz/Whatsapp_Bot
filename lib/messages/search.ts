import { Downloader } from '.'
import { Client } from '../src/Client'
import { ConnectMoongo } from '../database/mongoodb/main'

export class Searching extends Downloader {
    constructor(public Ra: Client, public database: ConnectMoongo) {
        super(Ra, database)
    }
    public sendResponse() {
        this.SendDownloader()
    }
}
