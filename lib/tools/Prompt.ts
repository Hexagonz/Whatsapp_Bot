import prompt from "prompt-sync";
import * as fs from "fs"
import chalk from "chalk"
import { Stating } from "../functions/log";

export const Prompt = () => {
	if (!fs.existsSync("./lib/database/settings.json")) {
		const Input = prompt({ sigint: false})
		let owner: string | number | undefined  = Number(Input(chalk.yellow("Harap masukkan nomer owner bot (Nomer diawali dengan kode negara) : "))) || undefined
		owner = owner ? Number(`${owner}`.replace(/\D/g,'')) : undefined
		let nama_bot: string | undefined = Input(chalk.yellow("Masukkan Nama Bot anda : ")) || undefined
		let antispam: string | number |undefined = Input(chalk.yellow("Masukkan jeda anti spam (Satuian detik example 7 <detik>): ")) || undefined
		antispam = antispam ? Number(`${antispam}`.replace(/\D/g,''))  : undefined
		if (typeof owner !== "number") {
			owner =  '33753045534'
		} else if (owner  === undefined) {
			owner =  '33753045534'
		} else if (`${owner}`.length > 20) {
			owner = "33753045534"
		}
		if (nama_bot === undefined) {
			nama_bot = "RA BOT"
		}
		if (antispam === undefined) {
			antispam = 5000
		}
		fs.writeFileSync("./lib/database/settings.json", JSON.stringify({ ownerNumber: [owner + "@s.whatsapp.net"], bot: nama_bot, antispam: Number(antispam + "000")}, null, 4))
	}
}
export const StartingLog = () => {
	const data: { ownerNumber: string[], bot: string } = JSON.parse(fs.readFileSync("./lib/database/settings.json").toString())
	return void Stating(data.ownerNumber[0].replace(/\D/g,''), data.bot)
}