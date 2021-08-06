import got from "got";
import cheerio, { CheerioAPI } from "cheerio";

const MusicMatchReg: RegExp = /(?:http(?:s|):\/\/|)(?:www\.|)musixmatch.com/
const getJudul: RegExp = /.\/(.)\/(.*)$/
export async function LirikLagu (judul: string): Promise <{status: number, author: string,result: { title: string, thumbnail: string, artist: string, lirik: string }} | undefined> {
	return new Promise (async (resolve, reject) => {
		await got({
			url: "https://www.musixmatch.com/search/" + judul,
			method: "GET",
			headers: {
				"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
			}
		}).then((respon): void => {
			const c: CheerioAPI = cheerio.load(respon.body)
			const Url: string | undefined = c("#search-all-results > div.main-panel > div:nth-child(1)").find("div.box-content > div > ul > li > div > div.media-card-body > div > h2 > a").attr('href')
			if (Url === undefined) return resolve(undefined)
			got("https://www.musixmatch.com" + Url, {
				method: "GET",
				headers: {
					"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
				}
			}).then((response): void => {
				const $: CheerioAPI = cheerio.load(response.body);
				const title: string = $("div.mxm-track-banner.top > div > div > div > div").find("div.track-title-header > div.mxm-track-title").find("h1").text().trim().replace(/Lyrics/, "")
				const thumbnail: string = "https:" + $("div.mxm-track-banner.top > div > div > div").find("div > div > div > div > img").attr('src');
				const artist: string = $("div.mxm-track-banner.top > div > div > div > div").find("div.track-title-header > div.mxm-track-title > h2 > span").text().trim();
				const lirik: string = $("div.mxm-track-lyrics-container > div.container > div > div > div").find("div > div.mxm-lyrics > span").text().trim();
				const Format: {status: number, author: string,result: { title: string, thumbnail: string, artist: string, lirik: string }} = {
					status: response.statusCode,
					author: "I`am Ra",
					result: {
						title,
						thumbnail,
						artist,
						lirik
					}
				}
				resolve(Format)
			}).catch(reject)
		}).catch (reject)
	})
}
export async function LirikInfo (Url: string): Promise <{status: number, author: string,result: { title: string, thumbnail: string, artist: string, lirik: string }} | undefined | null> {
	return new Promise (async (resolve, reject) => {
		if (!MusicMatchReg.test(Url)) return resolve(null)
		await got({
			url: Url,
			method: "GET",
			headers: {
				"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
			}
		}).then((response): void => {
			const $: CheerioAPI = cheerio.load(response.body);
			const title: string = $("div.mxm-track-banner.top > div > div > div > div").find("div.track-title-header > div.mxm-track-title").find("h1").text().trim().replace(/Lyrics/, "")
			const thumbnail: string = "https:" + $("div.mxm-track-banner.top > div > div > div").find("div > div > div > div > img").attr('src');
			const artist: string = $("div.mxm-track-banner.top > div > div > div > div").find("div.track-title-header > div.mxm-track-title > h2 > span").text().trim();
			const lirik: string = $("div.mxm-track-lyrics-container > div.container > div > div > div").find("div > div.mxm-lyrics > span").text().trim();
			const Format: {status: number, author: string,result: { title: string, thumbnail: string, artist: string, lirik: string }}  = {
				status: response.statusCode,
				author: "I`am Ra",
				result: {
					title,
					thumbnail,
					artist,
					lirik
				}
			}
			resolve(Format)
		}).catch (reject)
	
	})
}
export async function LirikSearch (judul: string): Promise <{title: string, thumb: string | undefined, artist: string, url: string}[]> {
	return new Promise (async (resolve, reject) => {
		await got({
			url: "https://www.musixmatch.com/search/" + judul,
			method: "GET",
			headers: {
				"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
			}
		}).then((respon): void => {
			const $: CheerioAPI = cheerio.load(respon.body)
			const result: {title: string, thumb: string | undefined, artist: string, url: string}[] = []
			$("#search-all-results > div.main-panel").find("div:nth-child(2) > div.box-content > div > ul").each(function (san, sana) {
				$(sana).find("li").each(function (tyu, mina) {
					const url: string = "https://www.musixmatch.com" + $(mina).find("div > div.media-card-body > div > h2 > a").attr('href')
					const title: string = $(mina).find("div > div.media-card-body > div > h2 > a > span").text().trim()
					const thumb: string | undefined = $(mina).find("div > div.media-card-picture > img").attr("srcset") ||  $(mina).find("div > div.media-card-picture > img").attr("src")
					const artist: string = $(mina).find("div > div.media-card-body > div > h3 > span > span > a").text().trim()
					const Format: {title: string, thumb: string | undefined, artist: string, url: string} = {
							title, thumb, artist, url
					}
					result.push(Format)
				})
			})
			resolve(result)
		}).catch(reject)
	})
}
