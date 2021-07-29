import axios, { AxiosResponse } from "axios";
import cheerio, { CheerioAPI} from "cheerio";

export async function GroupWa(query: string): Promise <{ status: number, name: string, link: string | undefined }[]> {
  return new Promise(async (resolve, reject) => {
    const response: AxiosResponse = await axios(`http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search=` + query + `&searchby=name`, {
      method: "GET"
    })
    if (response.status !== 200) reject(new Error(`Error status code : ${response.status}`))
    const $: CheerioAPI = cheerio.load(response.data)
    const data: { status: number, name: string, link: string | undefined }[] = []
    $('div.wa-chat-body').each(function(i, elem) {
      let name: string  = $(elem).find('div.wa-chat-title-text').text()
      let link: string | undefined = $(elem).find('a').attr('href')
      const result: { status: number, name: string, link: string | undefined } = {
        status: response.status,
        name: name,
        link: link
      }
      data.push(result)
    })
    resolve(data)
  })
}
