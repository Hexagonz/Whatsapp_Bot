import {  GroupData } from ".";
import { Client } from "../src/Client";


export class Downloader extends  GroupData {
	constructor(public Ra: Client) {
		super(Ra)
	}
	public SendDownloader () {
		this.SendDataGc ()
	}
}