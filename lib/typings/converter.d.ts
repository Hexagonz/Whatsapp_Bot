import { proto } from "@adiwajshing/baileys";

export interface MapSticker {
	sender: string
	id: number
	filesha: string
	mess: proto.WebMessageInfo
}
export interface AddSTICKER {
	Key: proto.WebMessageInfo,
    from: string,
    FileSha: string,
    sender: string,
	Stick: Map <String, MapSticker>
}