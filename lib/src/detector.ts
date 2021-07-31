import { WAConnection } from "@adiwajshing/baileys";
import { getPRefix, AddRegister, Addhit  } from "../plugins";
import { HandlingMessage } from "../typings"

export class Detector {
	constructor(private client: WAConnection, public data: HandlingMessage ) {}
	public Handling () {
		this.getRegister()
		this.addHit()
	}
	private getRegister () {
		AddRegister(this.data.sender)
	}
	private addHit () {
		Addhit (this.data.sender)
	}
}