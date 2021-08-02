import { proto, WAMessage } from "@adiwajshing/baileys"

export declare class Validasi {
	from: string;
	message: proto.IFutureProofMessage | undefined
	isGroupMsg: boolean;
	type: string;
	quotedType: string[] | null;
	typeQuoted: string;
	quotedMsg: proto.IContextInfo | null | undefined;
	bodyQuoted: string | null | undefined;
	bodyButton: string | null | undefined;
	body: string | null | undefined;
	media: WAMessage | null;
	sender: string | null | undefined;
	Filesize: number | Long;
	FileSha: string | null
	Command: string
}