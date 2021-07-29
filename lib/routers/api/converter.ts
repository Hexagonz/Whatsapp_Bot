import axios, { AxiosResponse } from "axios";
import cheerio, { CheerioAPI} from "cheerio";
import FormData from "form-data";
import * as fs from "fs";


export async function ToVideo (path: string): Promise <{ status: number, data: string } | Error> {
	return new Promise(async (resolve, reject) => {
		const Form: FormData = new FormData()
		Form.append("new-image", fs.createReadStream(path))
		Form.append('new-image-url', '')
		const upload: AxiosResponse = await axios({
			url: "https://s7.ezgif.com/webp-to-mp4",
			method: "POST",
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
				...Form.getHeaders()
			},
			data: Form
		})
		if (upload.status !== 200) reject(new Error(`Error status code : ${upload.status}`))
		const $: CheerioAPI = cheerio.load(upload.data)
		const NamaFile: string | undefined = $('form').find('input[type=hidden]:nth-child(1)').attr('value')
		const Format: { file: string | undefined, token: string | undefined, convert: string| undefined} | any = {
			file: NamaFile,
			token: $('form').find(' input[type=hidden]:nth-child(2)').attr('value'),
			convert: $("#tool-submit-button").find("input").attr("value")
		}
		const data: AxiosResponse = await axios({
			url: "https://ezgif.com/webp-to-mp4/" + NamaFile,
			method: "POST",
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
			},
			data: new URLSearchParams(Object.entries(Format))
		})
		if (data.status !== 200) reject(new Error(`Error status code : ${data.status}`))
		const ch: CheerioAPI = cheerio.load(data.data)
		const result: { status: number, data: string } = {
			status: data.status,
			data: "https:" + ch('#output > p.outfile').find('video > source').attr('src')
		}
		resolve(result)
	})
}