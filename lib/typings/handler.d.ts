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
	command: string;
	args: string[];
	pushname: string;
	groupName: string | null;
	groupMetadata: WAGroupMetadata | null
	groupId: string | null;
	botNumber: string;
	isBot: boolean | undefined;
	fromMe: boolean | undefined | null;
	isOwner: boolean;
	isCmd: boolean;
	isMedia: boolean;
	isGambar: boolean;
	isVideo: boolean;
	isQuotedSticker: boolean;
	isQuotedImage: boolean;
	isQuotedVideo: boolean;
	isQuotedAudio: boolean;
	isQuotedDokumen: boolean
}