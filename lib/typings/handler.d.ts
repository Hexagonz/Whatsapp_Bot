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
	groupMetadata: WAGroupMetadata | null
	botNumber: string;
	isBot: boolean | undefined;
	fromMe: boolean | undefined | null;
	isOwner: boolean;
	sendOwner: string;
	Jam: string;
	Prefix: string;
	pushname: string;
	bot: any;
	user: any;
	isMedia: boolean;
	isGambar: boolean;
	isVideo: boolean;
	isAudio: boolean;
	isQuotedSticker: boolean;
	isQuotedImage: boolean;
	isQuotedVideo: boolean;
	isQuotedAudio: boolean;
	isQuotedDokumen: boolean
}
export declare class Commands {
	args: string[];
	_args: string[];
	text: string;
	command: string;
	_text: string;
	match: any;
	from: string;
	message: proto.IFutureProofMessage | undefined;
	isGroupMsg: boolean;
	type: string;
	quotedType: string[] | null;
	typeQuoted: string;
	quotedMsg: proto.IContextInfo | null | undefined;
	bodyQuoted: string | null | undefined;
	bodyButton: string | null | undefined;
	body: string | null | undefined;
	media: WAMessage | null;
	sender: string | null | undefined
	Filesize: number | null 
	mess: proto.WebMessageInfo | undefined;
	bot: isBOT;
	user: isUser;
	groupMetadata: WAGroupMetadata | null
	botNumber: string;
	isBot: boolean | undefined;
	fromMe: boolean | undefined | null;
	isOwner: boolean;
	sendOwner: string;
	pushname: string;
	Jam: string;
	Prefix: string;
	isMedia: boolean;
	isGambar: boolean;
	isVideo: boolean;
	isAudio: boolean;
	isQuotedSticker: boolean;
	isQuotedImage: boolean;
	isQuotedVideo: boolean;
	isQuotedAudio: boolean;
	isQuotedDokumen: boolean;
}

interface isBOT {
	jid: string;
	id: string;
	isAdmin: boolean;
	isSuperAdmin: boolean
}
interface isUser {
	jid: string;
	id: string;
	isAdmin: boolean;
	isSuperAdmin: boolean
}