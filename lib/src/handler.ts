import { WAChatUpdate, WAMessage, WAGroupMetadata, WAContact, WAGroupParticipant } from "@adiwajshing/baileys";
import { Validation } from './validasi';
import { Validasi, HandlingMessage,  } from "../typings";
import moment from "moment-timezone";
import { getPRefix } from "../plugins";


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
			const bot: WAGroupParticipant | {} = isGroupMsg ? groupMetadata.participants.find(v=> v.jid === this.client.user.jid) : {}
			const user: WAGroupParticipant | {} = isGroupMsg ? groupMetadata.participants.find(v=> v.jid === this.client.user.jid) : {}
			const ownerNumber: string[] =  ['6282149344210@s.whatsapp.net', '33753045534@s.whatsapp.net', '79054685580@s.whatsapp.net', botNumber]
			const sendOwner: string = ownerNumber[1]
			const isOwner: boolean = ownerNumber.includes(sender || "");
			const isMedia: boolean =  (type === 'imageMessage' || type === 'videoMessage');
			const isGambar: boolean = (type === "imageMessage");
			const isVideo: boolean = (type === "videoMessage");
			const isAudio: boolean = (type === "audioMessage");
			const Jam: string = moment(new Date()).format("LLLL");
			const command: string =  body.toLowerCase().split(/ +/g)[0] || "";
			const Prefix: string = getPRefix(sender, command)
			const IsCMD: boolean = command.startsWith(Prefix)
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