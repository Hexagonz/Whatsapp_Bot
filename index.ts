import { Connected  } from "./lib/routers/connect/koneksi";



class Start extends Connected {
	constructor(){
		super()
	}
	protected async Conect () {
		await this.Connect()
		console.log("succes")
	}
}
new Start().Connect()