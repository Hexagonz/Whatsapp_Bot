import { Connected  } from "./lib/routers/connect/koneksi";
import { config} from "dotenv";
config({ path: __dirname + "\\.env"})

class Start extends Connected {
	constructor(){
		super()
	}
	protected async Conect () {
		await this.Connect()
	}
}
new Start().Connect()