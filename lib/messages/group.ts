import { MusicHandling } from ".";
import { Client } from "../src/Client";
import { WAConnection, MessageType, WAGroupModification, GroupSettingChange } from "@adiwajshing/baileys";
import { Commands } from "../typings";
import { BotGaAdmin, BukanDalamGroup, UserBaruOut, UserDalamGroup, UserPrivate, SuccesAdd, AddHarapTagSeseorang, UserGadaDalamGroup,  isOwnerGroupNokick, kickSucces, Admindia, ButakahLinkGc, IndLinkGroup, PilihBukatutup, SuccesOpenCloseGc, TagOrReply, PromoteSuccess, PromoteDiaAdmin, DemoteSuccess,DemoteBukanAdmin, GagalUpdatePP, SuccesUpdatePP, SuccesSetName ,  SuccesSetDesk  } from "../lang/ind";
import { Toimg } from "../tools";
import { RandomName, Tunggu } from "../functions/function";
import * as fs from "fs";


export class GroupData extends MusicHandling {
	constructor(public Ra: Client) {
		super(Ra)
	}
	public SendDataGc () {
		this.SendDataMusic()
		this.AddGroup()
		this.kickGroup()
		this.linkgroup()
		this.OpenCloseGc()
		this.Promote()
		this.Demote()
		this.setPPGc ()
		this.setNameGc()
		this.setBioGc()
	}
	protected AddGroup () {
		globalThis.CMD.on("admingc|add/masuk", ["add", "masuk"], async (res: WAConnection, data: Commands) => {
			const { isBotAdmins, from, isGroupAdmins, isGroupMsg, mess, mentioned, groupMember, isOwner, ownerGroup } = data
			if (!isOwner) return 
			if (!isGroupMsg && !isGroupAdmins && !isGroupMsg && !isBotAdmins) return isGroupMsg ? !isBotAdmins ? isGroupAdmins ? this.Ra.reply(from, BotGaAdmin(), mess) : undefined : undefined : this.Ra.reply(from, BukanDalamGroup(), mess)
			if (mentioned && mentioned[0] !== undefined) { 
				if (groupMember !== null ? groupMember?.map((value) => value.jid).includes(mentioned[0]) : true) return this.Ra.reply(from, UserDalamGroup(), mess)
				await res.groupAdd(from, [mentioned[0]])
				await this.Ra.reply(from, SuccesAdd(), mess)
			} else {
				await this.Ra.reply(from, AddHarapTagSeseorang(), mess)
			}
		})
	}
	protected kickGroup () {
		globalThis.CMD.on("admingc|kick/tendang/sepak", ["kick", "tendang", "sepak"], async (res: WAConnection, data: Commands) => {
			const { isBotAdmins, from, isGroupAdmins, isGroupMsg, mess, mentioned, groupMember,  isOwner, ownerGroup, sender } = data
			if (!isOwner) return 
			if (!isGroupMsg) return  this.Ra.reply(from, BukanDalamGroup(), mess)
			if (!isBotAdmins) return  this.Ra.reply(from, BotGaAdmin(), mess)
			if (!isGroupAdmins) return 
			if (groupMember !== null ? !groupMember?.map((value) => value.jid).includes(mentioned !== undefined ? mentioned[0] : "") : true) return  this.Ra.reply(from, UserGadaDalamGroup(), mess)
			if (mentioned && mentioned[0] !== undefined) {
				if (mentioned[0] == ownerGroup) return this.Ra.reply(from,  isOwnerGroupNokick(), mess)
				if (groupMember !== null ? groupMember?.filter((value) => value.isAdmin == true).map((value) => value.jid).includes(mentioned[0]) : false && ownerGroup == sender || isOwner) {
					await res.groupRemove(from, [mentioned[0]])
					await this.Ra.sendTextWithMentions(from, kickSucces(mentioned[0]), mentioned, mess)
				} else {
					await this.Ra.sendTextWithMentions(from, Admindia(mentioned[0]), mentioned, mess)
				}
			} else {
				await this.Ra.reply(from, TagOrReply(), mess)
			}
		})
	}
	protected linkgroup () {
		globalThis.CMD.on("admingc|linkgc", ["linkgroup", "linkgc", "linkgrup"], async (res: WAConnection, data: Commands) => {
			const { isBotAdmins, from, isGroupAdmins, groupMetadata, mess, isGroupMsg } = data
			if (!isGroupMsg) return  this.Ra.reply(from, BukanDalamGroup(), mess)
			if (!isBotAdmins) return  this.Ra.reply(from, BotGaAdmin(), mess)
			let LinkGc: string | undefined = await Object.keys(groupMetadata !== null ? groupMetadata : []).includes("desc") ? groupMetadata?.desc : ""
			if (isGroupAdmins) {
				if (groupMetadata == null) return
				this.Ra.reply(from, IndLinkGroup (groupMetadata , 'https://chat.whatsapp.com/' + await res.groupInviteCode(from)), mess)
			} else if (LinkGc?.match('https://chat.whatsapp.com/' + await res.groupInviteCode(from))) {
				this.Ra.reply(from, ButakahLinkGc(), mess)
			}
		})
	}
	protected OpenCloseGc () {
		globalThis.CMD.on("admingc|group <open/close>", ["group", "grup"], async (res: WAConnection, data: Commands) => {
			const { isBotAdmins, from, isGroupAdmins, mess, isGroupMsg, args } = data
			if (!isGroupMsg) return  this.Ra.reply(from, BukanDalamGroup(), mess)
			if (!isBotAdmins) return  this.Ra.reply(from, BotGaAdmin(), mess)
			if (!isGroupAdmins) return
			let BukaTutup: boolean | null = /^(open|buka)/i.test(args[0]) ? false : /^(close|tutup)/i.test(args[0]) ? true : null
			if (BukaTutup == null) return await this.Ra.reply(from, PilihBukatutup(), mess)
			await res.groupSettingChange(from, GroupSettingChange.messageSend, BukaTutup)
			await this.Ra.reply(from, SuccesOpenCloseGc(BukaTutup), mess)
		})
	}
	protected Promote () {
		globalThis.CMD.on("admingc|promote", ["promote", "getadmin"], async (res: WAConnection, data: Commands) => {
			const { isBotAdmins, from, isGroupAdmins, mess, isGroupMsg,  mentioned, isOwner, sender, groupMetadata } = data
			if (!isGroupMsg) return  this.Ra.reply(from, BukanDalamGroup(), mess)
			if (!isBotAdmins) return  this.Ra.reply(from, BotGaAdmin(), mess)
			if (!isGroupAdmins) return
			if (mentioned && mentioned[0] == undefined && isOwner) {
				await res.groupMakeAdmin(from, [sender || ""])
			} else if (mentioned  && mentioned[0] == undefined) {
				await this.Ra.reply(from, TagOrReply(), mess)
			} else if (!groupMetadata?.participants.filter((value) => value.isAdmin == true).map((value) => value.jid).includes(mentioned !== undefined ? mentioned[0] : "")){
				await res.groupMakeAdmin(from, [mentioned !== undefined ? mentioned[0] : ""])
				await this.Ra.sendTextWithMentions(from, PromoteSuccess (mentioned !== undefined ? mentioned[0] : ""), mentioned || [], mess)
			} else {
				await this.Ra.sendTextWithMentions(from, PromoteDiaAdmin(mentioned !== undefined ? mentioned[0] : ""), [mentioned !== undefined ? mentioned[0] : ""], mess)
			}
		})
	}
	protected Demote () {
		globalThis.CMD.on("admingc|demote", ["demote"], async (res: WAConnection, data: Commands) => {
			const { isBotAdmins, from, isGroupAdmins, mess, isGroupMsg,  mentioned, isOwner, sender, groupMetadata } = data
			if (!isGroupMsg) return  this.Ra.reply(from, BukanDalamGroup(), mess)
			if (!isBotAdmins) return  this.Ra.reply(from, BotGaAdmin(), mess)
			if (!isGroupAdmins) return
		    if (mentioned && mentioned[0] == undefined) {
				await this.Ra.reply(from, TagOrReply(), mess)
			} else if (groupMetadata?.participants.filter((value) => value.isAdmin == true).map((value) => value.jid).includes(mentioned !== undefined ? mentioned[0] : "")){
				await res.groupDemoteAdmin(from, [mentioned !== undefined ? mentioned[0] : ""])
				await this.Ra.sendTextWithMentions(from, DemoteSuccess(mentioned !== undefined ? mentioned[0] : ""), mentioned || [], mess)
			} else {
				await this.Ra.sendTextWithMentions(from, DemoteBukanAdmin(mentioned !== undefined ? mentioned[0] : ""), [mentioned !== undefined ? mentioned[0] : ""], mess)
			}
		})
	}
	protected setPPGc () {
		globalThis.CMD.on("admingc|setppgc", ["setppgc", "setppgroup"], async (res: WAConnection, data: Commands) => {
			const { isBotAdmins, from, isGroupAdmins, mess, isGroupMsg, media, isQuotedImage, isGambar, isQuotedSticker } = data
			if (!isGroupMsg) return  this.Ra.reply(from, BukanDalamGroup(), mess)
			if (!isBotAdmins) return  this.Ra.reply(from, BotGaAdmin(), mess)
			if (!isGroupAdmins) return
			if (media == null) return
			if (isGambar || isQuotedImage) {
				await res.updateProfilePicture(from, await res.downloadMediaMessage(media))
				await this.Ra.reply(from, SuccesUpdatePP(), mess)
			} else if (isQuotedSticker) {
				const Input: string = await res.downloadAndSaveMediaMessage(media, "./lib/storage/temp/" + RandomName(22))
				await Toimg (Input).then(async (value: string) => {
					await res.updateProfilePicture(from, fs.readFileSync(value))
					await Tunggu(2000)
					if (fs.existsSync(value)) fs.unlinkSync(value)
				}).catch (() => {
					if (fs.existsSync(Input)) fs.unlinkSync(Input)
					this.Ra.reply(from, GagalUpdatePP(), mess)
				})
			}
		})
	}
	protected setNameGc () {
		globalThis.CMD.on("admingc|setnamegc", ["setnamagc", "setnamegc", "setnamegrup", "setnamagroup"], async (res: WAConnection, data: Commands) => {
			const { isBotAdmins, from, isGroupAdmins, mess, isGroupMsg, args } = data
			if (!isGroupMsg) return  this.Ra.reply(from, BukanDalamGroup(), mess)
			if (!isBotAdmins) return  this.Ra.reply(from, BotGaAdmin(), mess)
			if (!isGroupAdmins) return
			await res.groupUpdateSubject(from, args.join(" ") || "")
			await this.Ra.reply(from, SuccesSetName(args.join(" ") || ""))
		})
	}
	protected setBioGc () {
		globalThis.CMD.on("admingc|setbiogc", ["setdesk", "setdeskgc", "setdesc"], async (res: WAConnection, data: Commands) => {
			const { isBotAdmins, from, isGroupAdmins, mess, isGroupMsg, args } = data
			if (!isGroupMsg) return  this.Ra.reply(from, BukanDalamGroup(), mess)
			if (!isBotAdmins) return  this.Ra.reply(from, BotGaAdmin(), mess)
			if (!isGroupAdmins) return
			await res.groupUpdateDescription(from, args.join(" ") || "")
			await this.Ra.reply(from,  SuccesSetDesk(), mess)
		})
	}
}