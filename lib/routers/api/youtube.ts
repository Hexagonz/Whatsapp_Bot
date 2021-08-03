import ytSearch, { SearchResult, ChannelSearchResult } from "yt-search";
import axios, { AxiosResponse } from "axios";
import cheerio, { CheerioAPI } from "cheerio"


export async function ytStalk (channel: string): Promise <ChannelSearchResult> {
	return new Promise(async (resolve, reject) => {
		await ytSearch(channel, (err, call: SearchResult ) => {
			if (err) return reject(err)
			const Channel: ChannelSearchResult  = call.channels[0]
			resolve(Channel)
		})
	})
}
export async function Y2mateVid (url: string): Promise<{ link: string, thumb: string, size: string}> {
	return new Promise(async (resolve, reject) => {
		try {
			const ytIdRegex: RegExp = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
			const Format: { url: string, q_auto: string, ajax: string } = {
				url: url,
				q_auto: "0",
				ajax: "1"
			}
			const data: AxiosResponse= await axios({
				url: "https://www.y2mate.com/mates/en12/downloader/ajax",
				method: "POST",
				headers: {
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
				},
				data: new URLSearchParams(Object.entries(Format))
			})
			const $: CheerioAPI = cheerio.load(data.data.result)
			const IdYt: RegExpExecArray | null =  ytIdRegex?.exec(url)
			if (!IdYt) return
			const convert: { type: string, _id: string, v_id: string, ajax: number, token: string, ftype: string, fquality: string} | any = {
				type: "youtube",
				_id: data.data.result.split(/var k__id = /)[1].split("; ")[0].replace(/"/gi, ""),
				v_id: IdYt,
				ajax: 1,
				token: "",
				ftype: "mp4",
				fquality: "720p"
			}
			const Upload: AxiosResponse= await axios({
				url: "https://www.y2mate.com/mates/convert",
				method: "POST",
				headers: {
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
				},
				data: new URLSearchParams(Object.entries(convert))
			})
			const ch: CheerioAPI = cheerio.load(Upload.data.result)
			const result: { link: string, thumb: string, size: string} = {
				link: ch("div").find("a").attr("href") || "",
				thumb: $("div.thumbnail.cover").find("a > img").attr("src") || "",
				size:  $("#mp4 > table > tbody > tr:nth-child(2) > td:nth-child(2)").text(),
			}
			resolve(result)
		} catch(err) {
			reject(err)
		}
	})
}
export async function Snappea (Url: string) {
	return new Promise(async (resolve, reject) => {
		try {
			const data: AxiosResponse = await axios.get("https://api.snappea.com/v1/video/details?url=" + Url)
			resolve(data.data.videoInfo)
		} catch (err) {
			reject(err)
		}
	})
}
export async function keepVideoMP4 (Url: string): Promise <{ link: string, size: string}> {
	return new Promise(async (resolve, reject) => {
		try {
			const res: AxiosResponse = await axios({
				url: "https://keepv.id/",
				method: "POST",
				headers: {
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
				}
			})
			const $: CheerioAPI = cheerio.load(res.data)
			const Sid: string = $("#page-top > main").find("script:nth-child(10)").html() || ""
			const data: AxiosResponse = await axios({
				url: "https://keepv.id//",
				method: "POST",
				headers: {
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
					"cookie": res.headers["set-cookie"][0]
				},
				data: new URLSearchParams(Object.entries({ url: Url, sid: Sid.split("'")[1].split("'")[0]}))
			})
			const ch: CheerioAPI = cheerio.load(data.data)
			const Format: { link: string, size: string} = {
				link: ch("#moreOptions > h6:nth-child(3) > div > div:nth-child(1)").find("table:nth-child(2) > tbody > tr > td.text-right > a").attr("href") || "",
				size: ch("#moreOptions > h6:nth-child(3) > div > div:nth-child(1)").find("table:nth-child(2) > tbody > tr > td:nth-child(3)").text().trim()
			}
			resolve(Format)
		} catch (err) {
			reject(err)
		}
	})
}
export async function Yt1SVid (Url: string): Promise <{ url: string, quality: string, judul: string, type: string, size: string}> {
	return new Promise (async (resolve, reject) => {
		try {
			const data: AxiosResponse = await axios({
				url: "https://yt1s.com/api/ajaxSearch/index",
				method: "POST",
				headers: {
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
				},
				data: new URLSearchParams(Object.entries({ q: Url, vt: "home"}))
			})
			const Format: { vid: string, k: string} = {
				vid: data.data.vid,
				k: data.data.links.mp4["136"].k
			}
			const Upload: AxiosResponse= await axios({
				url: "https://yt1s.com/api/ajaxConvert/convert",
				method: "POST",
				headers: {
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
				},
				data: new URLSearchParams(Object.entries(Format))
			})
			const convert: { url: string, quality: string, judul: string, type: string, size: string} = {
				url: Upload.data.dlink,
				quality: Upload.data.fquality,
				judul: Upload.data.title,
				type: Upload.data.ftype,
				size: data.data.links.mp4["136"].size
			}
			resolve(convert)
		} catch(err) {
			reject(err)
		}
	})
}