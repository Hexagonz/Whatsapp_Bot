import { Storager } from "."
import { WAConnection, MessageType } from "@adiwajshing/baileys";
import { Commands, instaStalk } from "../typings";
import { InstaStalk, InstaStalkV2, InstaStalkV3 } from "../routers/api";
import { IgStalk, IndUserKosong, IndUsernameNoKosong  } from "../lang/ind";
import { Client } from "../src/Client";

export class Stalking extends Storager {
	constructor(public Ra: Client) {
		super(Ra)
	}
	public async Sendding () {
		this.send()
		this.insta()
	}
	private async insta () {
		globalThis.CMD.on("stalk|igstalk", ["igstalk"], async (res: WAConnection, data: Commands) => {
			const { from, mess, args, pushname } = data
			if (args[0] == undefined) return  await this.Ra.reply(from, IndUsernameNoKosong(), mess)
			await InstaStalk(args[0]).then(async (respon: instaStalk) => {
				await this.Ra.sendImage(from, respon.thumb, IgStalk(respon), mess)
			}).catch(async () => {
				await InstaStalkV2(args[0]).then(async (respon: instaStalk) => {
					await this.Ra.sendImage(from, respon.thumb,  IgStalk(respon), mess)
				}).catch(async () => {
					await InstaStalkV3(args[0]).then(async (respon: instaStalk) => {
						await this.Ra.sendImage(from, respon.thumb,  IgStalk(respon), mess)
					}).catch(async () => {
						await this.Ra.reply(from, IndUserKosong(pushname), mess)
					})
				})
			})
		})
	}
}