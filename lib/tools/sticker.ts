import { exec, ExecException } from 'child_process'
import ffmpeg from 'fluent-ffmpeg'
import * as fs from 'fs'
import { RandomName, isUrl }from '../functions/function'
import { videoToWebp, gifToWebp, pngToWebp } from '../routers/api';

async function createExif (pakage: string, author: string, Path: string) {
	const json: { "sticker-pack-name": string, "sticker-pack-publisher": string} = {	
		"sticker-pack-name": pakage,
		"sticker-pack-publisher": author,
	}
	const littleEndian: Buffer = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
	const bytes: number[] = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	
	let len: number = JSON.stringify(json).length	
	let last: string | number
	if (len > 256) {	
		len = len - 256	
		bytes.unshift(0x01)	
	} else {	
		bytes.unshift(0x00)	
	}	
	if (len < 16) {	
		last = len.toString(16)	
		last = "0" + len	
	} else {	
		last = len.toString(16)	
	}	
	const buf2: Buffer = Buffer.from(last, "hex")	
	const buf3: Buffer = Buffer.from(bytes)	
	const buf4: Buffer = Buffer.from(JSON.stringify(json))
	const buffer: Buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])
	return void await fs.writeFileSync(Path + ".exif", buffer)
}
export async function createStickerV3(input: string, wm?: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
		const { Buffer } = require("../functions/function")
        if (/^(mp4|gif)$/i.test(input.split('.')[2])) {
            await videoToWebp(input).then(async (res: { status: number; data: string }) => {
                if (!isUrl(res.data)) return reject(new Error('ERROR DATA Undefined'))
                const Output: string = `./lib/storage/temp/${RandomName(39)}.webp`
                const toBuffer: Buffer = await Buffer(res.data)
                await fs.writeFileSync(Output, toBuffer)
                if (fs.existsSync(Output)) {
                    const exifPath: string = typeof wm == 'string' ? `./lib/storage/exif/${RandomName(25)}` : `./lib/storage/exif/Ra_default_exif`
                    if (!fs.existsSync(exifPath + '.exif')) await createExif(wm || 'RA BOT', '', exifPath)
                    exec(`webpmux -set exif ${exifPath}.exif ${Output} -o ${Output}`, async function (error: ExecException | null) {
						if (error) {
							if (fs.existsSync(exifPath + '.exif') && typeof wm == 'string') fs.unlinkSync(exifPath + '.exif')
                            if (fs.existsSync(Output)) fs.unlinkSync(Output)
                            reject(error)
                        } else {
                            if (fs.existsSync(exifPath + '.exif') && typeof wm == 'string') fs.unlinkSync(exifPath + '.exif')
                            if (fs.existsSync(Output)) resolve(Output)
                        }
					})
                }
            })
        } else {
            await pngToWebp(input).then(async (res: any) => {
                if (!isUrl(res.data)) return reject(new Error('ERROR DATA Undefined'))
                const Output: string = `./lib/storage/temp/${RandomName(39)}.webp`
                const toBuffer: Buffer = await Buffer(res.data)
                await fs.writeFileSync(Output, toBuffer)
                if (fs.existsSync(Output)) {
                    const exifPath: string = typeof wm == 'string' ? `./lib/storage/exif/${RandomName(25)}`: `./lib/storage/exif/Ra_default_exif`
                    if (!fs.existsSync(exifPath + '.exif')) await createExif(wm || 'RA BOT', '', exifPath)
                    exec(`webpmux -set exif ${exifPath}.exif ${Output} -o ${Output}`, async function (error: ExecException | null) {
						if (error) {
							if (fs.existsSync(exifPath + '.exif') && typeof wm == 'string') fs.unlinkSync(exifPath + '.exif')
                            if (fs.existsSync(Output)) fs.unlinkSync(Output)
                            reject(error)
                        } else {
                            if (fs.existsSync(exifPath + '.exif') && typeof wm == 'string') fs.unlinkSync(exifPath + '.exif')
                            if (fs.existsSync(Output)) resolve(Output)
                        }
					})
                }
            })
        }
    })
}
export async function createStickerV2(input: string, wm?: string): Promise<string | Error> {
    return new Promise(async (resolve, reject) => {
        if (!/^(mp4|gif)$/i.test(input.split('.')[2])) {
            const output: string = `./lib/storage/temp/${RandomName(11)}.webp`
            exec(`magick ${input} ${output}`, async (err: ExecException | null, respon) => {
                if (err) return reject(err)
                const exifPath: string = typeof wm == 'string' ? `./lib/storage/exif/${RandomName(25)}` : `./lib/storage/exif/Ra_default_exif`
                if (!fs.existsSync(exifPath + '.exif')) await createExif(wm || 'RA BOT', '', exifPath)
                exec(`webpmux -set exif ${exifPath}.exif ${output} -o ${output}`, async function (error: ExecException | null) {
					if (error) {
						if (fs.existsSync(exifPath + '.exif') && typeof wm == 'string') fs.unlinkSync(exifPath + '.exif')
                        if (fs.existsSync(output)) fs.unlinkSync(output)
                        reject(error)
                } else {
					if (fs.existsSync(exifPath + '.exif') && typeof wm == 'string') fs.unlinkSync(exifPath + '.exif')
                    if (fs.existsSync(output)) resolve(output)
				}
			})
		})
	} else {
		await videoToWebp(input).then(async (res: { status: number; data: string }) => {
			if (!isUrl(res.data)) return reject(new Error('ERROR DATA Undefined'))
			const { Buffer } = require("../functions/function")
            const Output: string = `./lib/storage/temp/${RandomName(39)}.webp`
            const toBuffer: Buffer = await Buffer(res.data)
            await fs.writeFileSync(Output, toBuffer)
            if (fs.existsSync(Output)) {
				const exifPath: string = typeof wm == 'string' ? `./lib/storage/exif/${RandomName(25)}`: `./lib/storage/exif/Ra_default_exif`
                if (!fs.existsSync(exifPath + '.exif')) await createExif(wm || 'RA BOT', '', exifPath)
                exec(`webpmux -set exif ${exifPath}.exif ${Output} -o ${Output}`,async function (error: ExecException | null) {
					if (error) {
						if (fs.existsSync(exifPath + '.exif') && typeof wm == 'string') fs.unlinkSync(exifPath + '.exif')
                        if (fs.existsSync(Output)) fs.unlinkSync(Output)
                        reject(error)
					} else {
						if (fs.existsSync(exifPath + '.exif') && typeof wm == 'string') fs.unlinkSync(exifPath + '.exif')
                        if (fs.existsSync(Output)) resolve(Output)
					}
				})
			}
		})
	}
})
}
export async function CreateSticker(input: string, wm?: string): Promise<string | Error> {
    return new Promise(async (resolve, reject) => {
        if (/^(mp4|gif)$/i.test(input.split('.')[2])) {
            const output: string = `./lib/storage/temp/${RandomName(22)}.webp`
            const exifPath: string = typeof wm == 'string' ? `./lib/storage/exif/${RandomName(28)}` : `./lib/storage/exif/Ra_default_exif`
            await ffmpeg(input)
			.inputFormat(`${input.split('.')[2]}`)
            .on('error', function (error) {
				reject(error)
			})
            .on('end', async function () {
				if (fs.existsSync(input)) fs.unlinkSync(input)
                if (!fs.existsSync(exifPath + '.exif')) await createExif(`${wm}`, '', exifPath)
				exec(`webpmux -set exif ${exifPath}.exif ${output} -o ${output}`,function (error: ExecException | null) {
					if (error) {
						if (fs.existsSync(exifPath + '.exif') && typeof wm == 'string') fs.unlinkSync(exifPath + '.exif')
                        if (fs.existsSync(output)) fs.unlinkSync(output)
                        reject(error)
                    } else {
						if (fs.existsSync(exifPath + '.exif') && typeof wm == 'string') fs.unlinkSync(exifPath + '.exif')
                        if (fs.existsSync(input)) fs.unlinkSync(input)
                        if (fs.existsSync(output)) resolve(output)
                    }
				})
			})
			.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,`-preset`,`default`,`-an`,`-vsync`,`0`,`-s`,`512:512`])
            .toFormat('webp')
            .save(output)
        } else if (/^(webp)$/i.test(input.split('.')[2])) {
            const exifPath: string = typeof wm == 'string' ? `./lib/storage/exif/${RandomName(25)}` : `./lib/storage/exif/Ra_default_exif`
            if (!fs.existsSync(exifPath + '.exif')) await createExif(wm || 'RA BOT', '', exifPath)
            exec(`webpmux -set exif ${exifPath}.exif ${input} -o ${input}`, async function (error: ExecException | null) {
				if (error) {
                    if (fs.existsSync(exifPath + '.exif') && typeof wm == 'string') fs.unlinkSync(exifPath + '.exif')
					reject(error)
				} else {
					if (fs.existsSync(exifPath + '.exif') && typeof wm == 'string')
                    fs.unlinkSync(exifPath + '.exif')
                    if (fs.existsSync(input)) resolve(input)
				}
			})
        } else {
			const outpath: string = `./lib/storage/temp/${RandomName(20)}.webp`
			await ffmpeg(input)
			.input(input)
			.on('error', function (err) {
				reject(new Error(err))
			})
			.on('end', async function () {
				const exifPath: string = typeof wm == 'string' ? `./lib/storage/exif/${RandomName(25)}` : `./lib/storage/exif/Ra_default_exif`
				if (!fs.existsSync(exifPath + '.exif')) await createExif(wm || 'RA BOT', '', exifPath)
				exec(`webpmux -set exif ${exifPath}.exif ${outpath} -o ${outpath}`, (error, call) => {
					if (error) {
						if (fs.existsSync(exifPath + '.exif') && typeof wm == 'string') fs.unlinkSync(exifPath + '.exif')
						reject(error)
					} else {
						if (fs.existsSync(exifPath + '.exif') && typeof wm == 'string') fs.unlinkSync(exifPath + '.exif')
						if (fs.existsSync(input)) fs.unlinkSync(input)
						if (fs.existsSync(outpath)) return resolve(outpath)
					}
				})
			})
			.addOutputOptions([`-vcodec`,`libwebp`,`-y`,`-vf`,`scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1`])
			.toFormat('webp')
			.save(outpath)
		}
	})
}
