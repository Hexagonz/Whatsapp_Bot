import * as fs from "fs";
import { exec, ExecException } from "child_process";
import { promisify } from "util";
import { loadImage, createCanvas, Image, Canvas, NodeCanvasRenderingContext2D } from "canvas";
import GIFEncoder from "gifencoder";
const webp =  require("node-webpmux");
const execute = promisify(exec);

export async function Triggered (input: string): Promise <string>{
	const base: Image = await loadImage("./lib/storage/polosan/triggered.png");
	const img: Image = await loadImage(input);
	const GIF: GIFEncoder = new GIFEncoder(256, 310);
	GIF.start()
	GIF.setRepeat(0)
	GIF.setDelay(15)
	const canvas: Canvas = createCanvas(256, 310)
	const ctx: NodeCanvasRenderingContext2D  = canvas.getContext("2d")
	for (let i: number = 0; i < 9; i++) {
		ctx.clearRect(0, 0, 256, 310)
		ctx.drawImage(img, Math.floor(Math.random() * 20) - 20, Math.floor(Math.random() * 20) - 20, 256 + 20, 310 - 54 + 20);
		ctx.fillStyle = `#FF000033`;
		ctx.fillRect(0, 0, 256, 310);
		ctx.drawImage(base, Math.floor(Math.random() * 10) - 10, 310 - 54 + Math.floor(Math.random() * 10) - 10, 256 + 10, 54 + 10);
		GIF.addFrame(ctx);
	}
	GIF.finish();
	const output: string = "./lib/storage/temp/" + Date.now() + ".gif";
	fs.writeFileSync(output, await GIF.out.getData())
	if (fs.existsSync(input)) fs.unlinkSync(input)
	return output
}
export async function toVideoV2 (input: string): Promise <string> {
	return new Promise (async (resolve, reject) => {
		const img = new webp.Image()
		const output: string = `./lib/storage/temp/${Date.now()}.mp4`
		const temp: string = "./lib/storage/temp/"
		await img.load(input)
		let frames: number = img.anim.frames.length
		for (let i: number = 0; frames > i; i++) {
			await execute(`webpmux -get frame ${i} ${input} -o ${temp}${i}.webp`)
			await execute(`dwebp ${temp}${i}.webp -o ${temp}${i}.png`)
		}
		await execute(`ffmpeg -framerate 22 -i ${temp}%d.png -y -c:v libx264 -pix_fmt yuv420p -loop 4 ${output}`)
		for (frames === 0; frames--; ) {
			fs.unlinkSync(`${temp}${frames}.webp`)
			fs.unlinkSync(`${temp}${frames}.png`)
		}
		if (fs.existsSync(output)) resolve(output)
	})
}
export function Tomp3 (input: string) {
	return new Promise(async (resolve, reject) => {
		const output: string = `./lib/storage/temp/${Date.now()}.mp3`
		exec(`ffmpeg -i ${input} -b:a 192K -vn ${output}`, function (error: ExecException | null) {
			if(error) {
				if (fs.existsSync(input)) fs.unlinkSync(input)
				reject(error)
			} else {
				if (fs.existsSync(input)) fs.unlinkSync(input)
				if (fs.existsSync(output)) resolve(output)
			}
		})
	})
}
export async function Tocute (input: string): Promise <string | Error> {
	return new Promise(async (resolve, reject) => {
		const output: string = `./lib/storage/temp/${Date.now()}.mp3`;
		exec(`ffmpeg -i ${input} -af atempo=3/4,asetrate=44500*4/3 ${output}`, function (error: ExecException | null) {
			if(error) {
				if (fs.existsSync(input)) fs.unlinkSync(input)
				reject(error)
			} else {
				if (fs.existsSync(input)) fs.unlinkSync(input)
				if (fs.existsSync(output)) resolve(output)
			}
		})
	})
}