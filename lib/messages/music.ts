import { Stalking  } from ".";
import { Client } from "../src/Client";

export class MusicHandling extends Stalking  {
	constructor(public Ra: Client) {
		super(Ra)
	}
	public SendDataMusic () {
		this.Sendding()
	}
}