import {  Downloader } from ".";
import { Client } from "../src/Client";


export class Searching extends Downloader {
	constructor(public Ra: Client) {
		super(Ra)
	}
	public sendResponse () {
		this.SendDownloader()
	}
}