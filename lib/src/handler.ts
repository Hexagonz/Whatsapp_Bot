import { WAChatUpdate, WAMessage, WAGroupMetadata, WAContact, WAGroupParticipant } from "@adiwajshing/baileys";
import { Validation } from './validasi';
import { Validasi, HandlingMessage,  } from "../typings";
import moment from "moment-timezone";
import { getPRefix } from "../plugins";
import * as fs from "fs";

var _database: { ownerNumber: string[], bot: string} = fs.existsSync("./lib/database/settings.json") ? JSON.parse(fs.readFileSync("./lib/database/settings.json").toString()) : { ownerNumber: [], bot: ""}


export class HandlerMsg extends Validation {
	public async handling (chats: WAChatUpdate): Promise <HandlingMessage | undefined> {
		try {
			if (!chats.hasNewMessage) return;
			const mess: WAMessage | undefined = chats.messages?.all()[0];
			if (mess?.key && mess.key.remoteJid === "status@broadcast") return;
			const { message, from, isGroupMsg, type, quotedType, typeQuoted, quotedMsg, bodyQuoted, bodyButton, body, media, sender }: Validasi = this.validator(mess);
			const groupMetadata: WAGroupMetadata | null = isGroupMsg ? await this.client.groupMetadata(from || "") : null;
			const contacts: string | WAContact | any = mess?.key.fromMe ? this.client.user.jid : this.client.contacts[sender || ""] || { notify: sender?.replace(/@.+/, "")};
			const content: string = JSON.stringify(message?.message);
			const pushname: string = mess?.key.fromMe ? this.client.user.name : contacts?.notify || contacts.vname || contacts.name || "Tidak Terdeteksi";
			const fromMe: boolean | undefined | null = mess?.key ? mess.key.fromMe : false
			const isBot: boolean | undefined = mess?.key ? mess.key.id?.startsWith("3EB0") : false
			const botNumber: string = this.client.user.jid;
			const bot: WAGroupParticipant | {} | undefined = isGroupMsg ? groupMetadata?.participants.find(v=> v.jid === this.client.user.jid) : {}
			const user: WAGroupParticipant | {}| undefined  = isGroupMsg ? groupMetadata?.participants.find(v=> v.jid === this.client.user.jid) : {}
			_database.ownerNumber.push(botNumber)
			const ownerNumber: string[] = _database.ownerNumber
			const sendOwner: string = ownerNumber[0]
			const isOwner: boolean = ownerNumber.includes(sender || "");
			const groupMember: WAGroupParticipant[] | null | undefined = isGroupMsg ? groupMetadata?.participants : null
			const groupAdmins: string[]  =  isGroupMsg ?  groupMember !== null ? groupMember?.filter((value) => value.isAdmin == true) ? groupMember.filter((value) => value.isAdmin == true).map((value) => value.jid) : [] : [] : [];
			const isGroupAdmins: boolean = isGroupMsg ? groupAdmins.includes(sender || "") : false
			const isBotAdmins: boolean = isGroupMsg ? groupAdmins.includes(botNumber) : false
			const ownerGroup: string | null | undefined = isGroupMsg ? groupMetadata?.owner : null
 			const isMedia: boolean =  (type === 'imageMessage' || type === 'videoMessage');
			const isGambar: boolean = (type === "imageMessage");
			const isVideo: boolean = (type === "videoMessage");
			const isAudio: boolean = (type === "audioMessage");
			const Jam: string = moment(new Date()).format("LLLL");
			const command: string =  body?.toLowerCase().split(/ +/g)[0] || "";
			const Prefix: string = getPRefix(sender || "", command);
			const IsCMD: boolean = command.startsWith(Prefix);
			const isQuotedSticker: boolean = type === 'extendedTextMessage' && content.includes('stickerMessage');
			const isQuotedImage: boolean = type === 'extendedTextMessage' && content.includes('imageMessage');
			const isQuotedVideo: boolean = type === 'extendedTextMessage' && content.includes('videoMessage');
			const isQuotedAudio: boolean = typeQuoted === "audioMessage";
			const isQuotedDokumen: boolean = typeQuoted === "documentMessage";
			const Format: HandlingMessage = {
				...this.validator(mess),
				mess,
				bot,
				user,
				groupMetadata,
				pushname,
				botNumber,
				isBot,
				fromMe,
				isOwner,
				sendOwner,
				Jam,
				Prefix,
				groupAdmins,
				groupMember,
				isGroupAdmins,
				isBotAdmins,
				ownerGroup,
				IsCMD,
				isMedia,
				isGambar,
				isVideo,
				isAudio,
				isQuotedSticker,
				isQuotedImage,
				isQuotedVideo,
				isQuotedAudio,
				isQuotedDokumen
			}
			return Format
		} catch (err: unknown | any) {
			console.log(err)
		}
	}
}