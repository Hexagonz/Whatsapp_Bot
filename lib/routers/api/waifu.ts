import axios, { AxiosResponse } from "axios";
import cheerio, { CheerioAPI} from "cheerio";

export async function getWaifu() {
  return new Promise(async (resolve, reject) => {
    const response: AxiosResponse = await axios("https://mywaifulist.moe/random", { method: "GET"})
    if (response.status !== 200) reject(new Error(`Error status code : ${response.status}`))
    const $: CheerioAPI = cheerio.load(response.data)
    const data = []
    let name = $('meta[property="og:title"]').attr('content');
    let link = $('meta[property="og:url"]').attr('content');
    let image = $('meta[property="og:image"]').attr('content');
    let description = $('meta[property="og:description"]').attr('content');
    data.push({name, link, image, description})
    resolve(data)
  })
}
