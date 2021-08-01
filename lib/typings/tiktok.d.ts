export declare class TiktokStalk {
	id: string;
	shortId: string;
	uniqueId: string;
	nickname: string;
	avatarLarger: string;
	avatarMedium: string;
	avatarThumb: string;
	signature: string;
	createTime: number;
	verified: boolean;
	secUid: string;
	ftc: boolean;
	relation: number;
	openFavorite: boolean;
	bioLink: {
		link: string;
		risk: number;
	}
	commentSetting: number;
	duetSetting: number;
	stitchSetting: number;
	privateAccount: boolean;
	secret: boolean;
	isADVirtual: boolean;
	roomId: string
}