import { exec,  ExecException } from "child_process";
import ffmpeg from "fluent-ffmpeg";
import * as fs from "fs";
import { createExif, Sticker } from "wa-sticker-formatter";
import { Triggered } from "."


export async function CreateSticker (input: string, wm?: string): Promise <string | Buffer | Error> {
	return new Promise(async (resolve, reject) => {
		if (/^(mp4|gif)$/i.test(input.split(".")[2])) {
			const output: string =  `./lib/storage/temp/${Date.now()}.webp`;
			const exifPath: string = typeof wm == "string" ? `./lib/storage/exif/${Date.now()}` : `./lib/storage/exif/Ra_default_exif`;
			await ffmpeg(input)
			.inputFormat(`${input.split(".")[2]}`)
			.on("start", function () {
				console.log("[START FFMPEG]")
			})
			.on("error", function (error) {
				if (fs.existsSync(input)) fs.unlinkSync(input)
				reject(error)
			})
			.on("end", async function () {
				if (fs.existsSync(input)) fs.unlinkSync(input)
				if (fs.existsSync(exifPath + ".exif")) await createExif(`${wm}`, "", exifPath)
				exec(`webpmux -set exif ${exifPath}.exif ${output} -o ${output}`, function (error: ExecException | null) {
					if (error) {
						if (fs.existsSync(exifPath + ".exif") && typeof wm == "string") fs.unlinkSync(exifPath + ".exif");
						if (fs.existsSync(output)) fs.unlinkSync(output);
						reject(error)
					} else {
						if (fs.existsSync(output)) resolve(output)
					}
				})
			})
			.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(360,iw)':min'(360,ih)':force_original_aspect_ratio=decrease,fps=15, pad=360:360:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
			.toFormat('webp')
			.save(output)
		} else if (/^(webp)$/i.test(input.split(".")[2])) {
			const exifPath: string = typeof wm == "string" ? `./lib/storage/exif/${Date.now()}` : `./lib/storage/exif/Ra_default_exif`;
			if (fs.existsSync(exifPath + ".exif")) await createExif(wm || "RA BOT", "", exifPath)
			exec(`webpmux -set exif ${exifPath}.exif ${input} -o ${input}`, async function (error: ExecException | null) {
				if (error) {
					if (fs.existsSync(exifPath + ".exif") && typeof wm == "string") fs.unlinkSync(exifPath + ".exif");
					if (fs.existsSync(input)) fs.unlinkSync(input);
					reject(error)
				} else {
					if (fs.existsSync(input)) resolve(input)
				}
			})
		} else {
			const sticker: Sticker = new Sticker(input, { crop: true,  pack: typeof wm === "string" ? wm : "RA BOT", author: " "})
			await sticker.build()
			const output: Buffer = await sticker.get()
			resolve(output)
		}
	})
}
export async function createTrigger (input: string, wm?: string): Promise <string | Error>{
	return new Promise (async (resolve, reject) => {
		const data: string = await Triggered(input)
		const output: string = "./lib/storage/temp/" + Date.now() + ".webp";
		await ffmpeg(data)
		.inputFormat(`${data.split(".")[2]}`)
		.on("start", function () {
			console.log("[START FFMPEG]" )
		})
		.on("error", function (error) {
			if (fs.existsSync(data)) fs.unlinkSync(data)
			reject(error)
		})
		.on("end", async function() {
			const exifPath: string = typeof wm == "string" ? `./lib/storage/exif/${Date.now()}` : `./lib/storage/exif/Ra_default_exif`;
			if (fs.existsSync(exifPath + ".exif")) await createExif(`${wm}`, "", exifPath)
			if (fs.existsSync(data)) fs.unlinkSync(data)
			exec(`webpmux -set exif ${exifPath}.exif ${output} -o ${output}`, async function (error: ExecException | null) {
				if (error) {
					if (fs.existsSync(exifPath + ".exif") && typeof wm == "string") fs.unlinkSync(exifPath + ".exif");
					if (fs.existsSync(output)) fs.unlinkSync(output);
					reject(error)
				} else {
					if (fs.existsSync(output)) resolve(output);
				}
			})
		})
		.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(360,iw)':min'(360,ih)':force_original_aspect_ratio=decrease,fps=15, pad=360:360:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
		.toFormat('webp')
		.save(output)
	})
}