import { Validasi } from ".";
import { proto, WAMessage, WAGroupMetadata } from "@adiwajshing/baileys"

export interface  HandlingMessage {
	from: string | null | undefined;
	message: proto.IFutureProofMessage | undefined
	isGroupMsg: boolean | undefined;
	type: string;
	quotedType: string[] | null;
	typeQuoted: string;
	quotedMsg: proto.IContextInfo | null | undefined;
	bodyQuoted: string | null | undefined;
	bodyButton: string | null | undefined;
	body: string | null | undefined;
	media: WAMessage | null;
	sender: string | null | undefined
	mess: proto.WebMessageInfo | undefined
	//pushname: string;
	groupMetadata: WAGroupMetadata | null
	botNumber: string;
	isBot: boolean | undefined;
	fromMe: boolean | undefined | null;
	isOwner: boolean;
	bot: any;
	user: any
	isMedia: boolean;
	isGambar: boolean;
	isVideo: boolean;
	isQuotedSticker: boolean;
	isQuotedImage: boolean;
	isQuotedVideo: boolean;
	isQuotedAudio: boolean;
	isQuotedDokumen: boolean
}