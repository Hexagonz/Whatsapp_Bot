import { WAConnection } from "@adiwajshing/baileys";
import { getPRefix, AddRegister } from "../plugins";
import { HandlingMessage } from "../typings"

export class Detector {
	constructor(private client: WAConnection, public data: HandlingMessage ) {}
	public Handling () {
		this.getRegister()
	}
	private getRegister () {
		AddRegister(this.data.sender)
	}
}