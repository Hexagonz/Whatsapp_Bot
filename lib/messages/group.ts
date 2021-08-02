import { MusicHandling } from ".";
import { Client } from "../src/Client";


export class GroupData extends MusicHandling {
	constructor(public Ra: Client) {
		super(Ra)
	}
	public SendDataGc () {
		this.SendDataMusic()
	}
}