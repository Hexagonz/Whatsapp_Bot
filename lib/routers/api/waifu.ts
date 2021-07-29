import axios, { AxiosResponse } from "axios";
import cheerio, { CheerioAPI} from "cheerio";

export async function getWaifu(): Promise <{ name: string | undefined, link: string | undefined, image: string | undefined, description: string | undefined}[] | Error> {
  return new Promise(async (resolve, reject) => {
    const response: AxiosResponse = await axios("https://mywaifulist.moe/random", { method: "GET"})
    if (response.status !== 200) reject(new Error(`Error status code : ${response.status}`))
    const $: CheerioAPI = cheerio.load(response.data)
    const data: { name: string | undefined, link: string | undefined, image: string | undefined, description: string | undefined}[] = []
    let name: string | undefined = $('meta[property="og:title"]').attr('content');
    let link: string | undefined = $('meta[property="og:url"]').attr('content');
    let image: string | undefined = $('meta[property="og:image"]').attr('content');
    let description: string | undefined = $('meta[property="og:description"]').attr('content');
    data.push({name, link, image, description})
    resolve(data)
  })
}
