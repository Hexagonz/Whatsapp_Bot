import { WAConnection, MessageType, proto } from '@adiwajshing/baileys'
import { Commands } from '../typings'
import { Tomp3, Tocute, CreateSticker, toVideoV2, Toimg, createStickerV2, createStickerV3 } from '../tools'
import { Tunggu, Buffer, RandomName, CheckSticker, AddSticker } from '../functions/function'
import { ToVideo } from '../routers/api'
import * as fs from 'fs'
import { Client } from '../src/Client';
import {  MapSticker } from "../typings";
import parsems from "parse-ms";
import filesize from "filesize"
import { IndTunggu, IndBukanVid, IndToVid, IndBukanAud, IndBukanSticker, IndGagalSticker, IndErrorMP3, IndStickerReply, StickerDuplicate, StickerFound, BukanStickerGif, InputSticker,  IndSuccesToVid, IndToimgDone,  IndStickerVideoPanjang  } from '../lang/ind'

const Stick: Map<string, MapSticker[]> = new Map()
export class Converter {
    constructor(public Ra: Client) {}
    public async SendingConverter(): Promise<void> {
        this.toMP3()
        this.Sticker()
        this.ToVideo()
        this.toCUTE()
        this.toImg()
    }
    protected async Sticker(): Promise<void> {
        globalThis.CMD.on('converter|sticker <img,vid,sticker>', ['sticker', 's', 'stiker', 'stickergif', 'stikergif', 'sgif'], async (res: WAConnection, data: Commands) => {
			const { args, media, from, mess, sendOwner, isQuotedDokumen, Command, FileSha, sender, quotedMsg, isVideo, isQuotedVideo } = data
            if (!media) return await this.Ra.reply(from, IndStickerReply(Command), mess)
			if (isVideo && Number(media.message?.videoMessage?.seconds) > 15) return await this.Ra.reply(from,  IndStickerVideoPanjang(), mess)
			if (isQuotedVideo && Number(media.message?.videoMessage?.seconds) > 15) return await this.Ra.reply(from,  IndStickerVideoPanjang(), mess)
			if (isQuotedDokumen && !/(image|video)/gi.test(String(quotedMsg?.quotedMessage?.documentMessage?.mimetype))) return await this.Ra.reply(from, IndStickerReply(Command), mess)
			if (isQuotedDokumen && /(video)/gi.test(String(quotedMsg?.quotedMessage?.documentMessage?.mimetype)) && /(mb)/i.test(filesize(Number(quotedMsg?.quotedMessage?.documentMessage?.fileLength))) && Number(filesize(Number(quotedMsg?.quotedMessage?.documentMessage?.fileLength)).replace(/mb/i, "")) > 12) return  await this.Ra.reply(from,  IndStickerVideoPanjang(), mess)
            if (CheckSticker(from, FileSha || 'undefined', Stick)) {
				const Hasil:  MapSticker[] | undefined = Stick.get(from)
                if (!Hasil) return
                const Respon:  MapSticker | undefined = Hasil.find((value) => value.filesha == FileSha)
				await this.Ra.sendTextWithMentions(from, StickerDuplicate(Respon?.sender || '', Respon?.id || 0), [Respon?.sender || ''], mess)
                await this.Ra.sendTextWithMentions(from, StickerFound(sender || ''), [sender || ''], Respon?.mess)
			}
			if (CheckSticker(from, FileSha || '', Stick)) return
            const Wm: string | null | undefined = args[0] === undefined ? undefined : args.join(' ')
            await this.Ra.reply(from, IndTunggu(), mess)
            const input: string = await res.downloadAndSaveMediaMessage(media, './lib/storage/temp/' + RandomName(22))
            await CreateSticker(input, Wm).then(async (result: string | Error) => {
				try {
					if (typeof result !== 'string') return
					let ress: proto.WebMessageInfo = await res.sendMessage(from, fs.readFileSync(result), MessageType.sticker, { quoted: mess })
					await AddSticker(ress, from, FileSha || 'undefined', sender || '', Stick)
                    await Tunggu(2000)
					if (fs.existsSync(result)) fs.unlinkSync(result)
                    if (fs.existsSync(input)) fs.unlinkSync(input)
				} catch (err) {
					if (typeof result === 'string' && fs.existsSync(result)) fs.unlinkSync(result)
					if (fs.existsSync(input)) fs.unlinkSync(input)
                            // Jan dihapus ntar bocor
				}
			}).catch(async () => {
				await CreateSticker(input, Wm).then(async (Res) => {
					try {
						if (typeof Res !== 'string') return
						let ress: proto.WebMessageInfo = await res.sendMessage(from, fs.readFileSync(Res), MessageType.sticker, { quoted: mess })
                        await AddSticker(ress, from, FileSha || 'undefined', sender || '', Stick)
                        await Tunggu(2000)
						if (fs.existsSync(Res)) fs.unlinkSync(Res)
						if (fs.existsSync(input)) fs.unlinkSync(input)
					} catch (err) {
						if (typeof Res === 'string' && fs.existsSync(Res)) fs.unlinkSync(Res)
                        if (fs.existsSync(input)) fs.unlinkSync(input)
                    }
				}).catch(async () => {
					await createStickerV2(input, Wm).then(async (Result) => {
						try {
							if (typeof Result !== 'string') return
                            let ress: proto.WebMessageInfo = await res.sendMessage(from, fs.readFileSync(Result), MessageType.sticker, { quoted: mess })
                            await AddSticker(ress, from, FileSha || 'undefined', sender || '', Stick)
                            await Tunggu(2000)
                            if (fs.existsSync(Result)) fs.unlinkSync(Result)
                            if (fs.existsSync(input)) fs.unlinkSync(input)
						} catch (err) {
                            if (typeof Result === 'string' && fs.existsSync(Result)) fs.unlinkSync(Result)
                            if (fs.existsSync(input)) fs.unlinkSync(input)
						}
					}).catch(async () => {
						await createStickerV3(input, Wm).then(async (Res) => {
							 try {
								 if (typeof Res !== 'string') return
								 let ress: proto.WebMessageInfo = await res.sendMessage(from, fs.readFileSync(Res), MessageType.sticker, { quoted: mess })
                                 await AddSticker(ress, from, FileSha || 'undefined', sender || '', Stick)
								 await Tunggu(2000)
								 if (fs.existsSync(Res)) fs.unlinkSync(Res)
								 if (fs.existsSync(input)) fs.unlinkSync(input)
								} catch (err) {
									if (typeof Res === 'string' && fs.existsSync(Res)) fs.unlinkSync(Res)
									if (fs.existsSync(input)) fs.unlinkSync(input)
                                }
							}).catch((err) => {
								if (fs.existsSync(input)) fs.unlinkSync(input)
                                this.Ra.reply(from, IndGagalSticker(), mess)
                                this.Ra.sendText(sendOwner, 'ERROR Sticker : ' + err)
							})
						})
					})
				})
			})
		}
    protected async ToVideo() {
        globalThis.CMD.on('converter|tovid <stickergif>', 'tovid', async (res: WAConnection, data: Commands) => {
			const { isQuotedSticker, media, from, mess, sender, Command } = data
			let Proses: number = Date.now()
			if (!media && !isQuotedSticker) return this.Ra.reply(from, IndBukanSticker(Command), mess)
            if (!media) return
            if (!media.message?.stickerMessage?.isAnimated) return this.Ra.reply(from, BukanStickerGif(), mess)
            await this.Ra.reply(from, IndTunggu(), mess)
            const input: string = await res.downloadAndSaveMediaMessage(media, './lib/storage/temp/' + RandomName(23) + sender?.replace('@s.whatsapp.net', ''))
            await ToVideo(input).then(async (value: { status: number; data: string } | any) => {
				const Timer = parsems(Date.now() - Proses)
				await this.Ra.sendVideo(from, await Buffer(value?.data),  IndSuccesToVid(String(Timer.seconds + " Detik, " + Timer.milliseconds + " Miliseconds")), mess)
                if (fs.existsSync(input)) fs.unlinkSync(input)
			}).catch(async (err: Error) => {
				let respon: string | any
				try {
					respon = await toVideoV2(input)
				} catch (err) {
					if (fs.existsSync(input)) fs.unlinkSync(input)
                    console.log(err)
                    await this.Ra.reply(from, IndToVid(), mess)
                } finally {
					if (fs.existsSync(input)) fs.unlinkSync(input)
					const Timer = parsems(Date.now() - Proses)
                    await this.Ra.sendVideo(from, fs.readFileSync(respon),  IndSuccesToVid(String(Timer.seconds + " Detik, " + Timer.milliseconds + " Miliseconds")), mess)
                    if (fs.existsSync(respon)) fs.unlinkSync(input)
				}
			})
		},{ noPrefix: false })
	}
    protected async toMP3() {
		globalThis.CMD.on('converter|tomp3 <video>', 'tomp3', async (res: WAConnection, data: Commands) => {
			const { media, isQuotedVideo, from, mess, isVideo, sender, sendOwner } = data
            if ((!media && !isQuotedVideo) || (!media && isVideo)) return this.Ra.reply(from, IndBukanVid(), mess)
            if (!media) return
            await this.Ra.reply(from, IndTunggu(), mess)
            const input: string = await res.downloadAndSaveMediaMessage(media, './lib/storage/temp/' + RandomName(24))
			await Tomp3(input).then(async (result: string | Error) => {
				if (typeof result !== 'string') return
                this.Ra.sendAudio(from, fs.readFileSync(result), false, mess)
                await Tunggu(2000)
                if (fs.existsSync(result)) fs.unlinkSync(result)
			}).catch(async () => {
				await Tomp3(input).then(async (Respon) => {
					if (typeof Respon !== 'string') return
					await this.Ra.sendAudio(from, fs.readFileSync(Respon), false, mess)
                    await Tunggu(2000)
                    if (fs.existsSync(Respon)) fs.unlinkSync(Respon)
				}).catch((err) => {
					this.Ra.reply(from, IndErrorMP3(), mess)
					this.Ra.sendText(sendOwner, 'ERROR tomp3 :' + err)
				})
			})
		},{ noPrefix: false })
	}
	protected async toImg() {
		globalThis.CMD.on('converter|toimg <img>','toimg', async (res: WAConnection, data: Commands) => {
			const { from, mess, isQuotedSticker } = data
			const Time = Date.now()
            if (!isQuotedSticker) return this.Ra.reply(from,  InputSticker(), mess)
            if (!data.media) return
			await this.Ra.reply(from, IndTunggu(), mess)
            const result: string = await Toimg(await res.downloadAndSaveMediaMessage(data.media, './lib/storage/temp/' + RandomName(27)))
			const Timer = parsems(Date.now() - Time)
            return void (await this.Ra.sendImage(from, fs.readFileSync(result || ''),  IndToimgDone(String(Timer.seconds + " Detik, " + Timer.milliseconds + " Miliseconds")), mess))
        }, { noPrefix: false })
	}
    protected async toCUTE() {
		globalThis.CMD.on('converter|tocute <audio>', 'tocute', async (res: WAConnection, data: Commands) => {
			const { media, isQuotedAudio, from, mess, isAudio, sender } = data
            if ((!media && !isQuotedAudio) || (!media && isAudio)) return this.Ra.reply(from, IndBukanAud(), mess)
            if (!media) return
            await this.Ra.reply(from, IndTunggu(), mess)
            const input: string = await res.downloadAndSaveMediaMessage(media, './lib/storage/temp/' + RandomName(28))
			await Tocute(input).then(async (result: string | Error) => {
				if (typeof result !== 'string') {
					const Respon: string | Error = await Tocute(input)
                    if (typeof Respon !== 'string') return
                    await this.Ra.sendAudio(from, fs.readFileSync(Respon), false, mess)
                    await Tunggu(2000)
                    if (fs.existsSync(Respon)) fs.unlinkSync(Respon)
				} else {
					this.Ra.sendAudio(from, fs.readFileSync(result), true, mess)
                    await Tunggu(2000)
                    if (fs.existsSync(result)) fs.unlinkSync(result)
				}
			})},{ noPrefix: false })
    }
}
