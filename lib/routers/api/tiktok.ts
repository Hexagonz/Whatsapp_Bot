import { TiktokStalk } from '../../typings'
import axios, { AxiosResponse } from 'axios'
import cheerio, { CheerioAPI } from 'cheerio'
import { convertAngka } from "../../functions/function";

// Free cookies for tiktok
// if the feature error please replace the tiktok cookie on the tiktok.com web site

export async function tiktokStalk(username: string): Promise<TiktokStalk> {
    return new Promise(async (resolve, reject) => {
        const User: string = username.startsWith('@') ? username : '@' + username
        await axios({
            url: `https://www.tiktok.com/${User}?lang=id`,
            method: 'GET',
            headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
                cookie: 'tt_webid_v2=6986233640163411458; tt_webid=6986233640163411458; MONITOR_WEB_ID=6986233640163411458; passport_csrf_token_default=6c4582eb39e3a918b79bf19883e0383a; passport_csrf_token=6c4582eb39e3a918b79bf19883e0383a; passport_auth_status=b129aac2144e7d181e9206c77b829f33%2C; passport_auth_status_ss=b129aac2144e7d181e9206c77b829f33%2C; sid_guard=59bce8b9c36fd2ae7c65dc9ed1e57f4b%7C1626609635%7C5184000%7CThu%2C+16-Sep-2021+12%3A00%3A35+GMT; uid_tt=10f21da80e938dc4c74ac772a612ac900db73a510dce996f1e87038ed113d3b0; uid_tt_ss=10f21da80e938dc4c74ac772a612ac900db73a510dce996f1e87038ed113d3b0; sid_tt=59bce8b9c36fd2ae7c65dc9ed1e57f4b; sessionid=59bce8b9c36fd2ae7c65dc9ed1e57f4b; sessionid_ss=59bce8b9c36fd2ae7c65dc9ed1e57f4b; store-idc=alisg; store-country-code=id; tt_csrf_token=K1up8j9z7OmTrSfmvmoO1JP2; R6kq3TV7=AF7-iQB7AQAAqk-Wy_M1HqFLRc1VQ_I-5EkI1mYmYzKL9Nb5BnYDd5zx0dym|1|0|c5260d1687443f9982544406597db77fb23ffc52; s_v_web_id=verify_krsv2o62_iDlMefgy_hytF_4I87_9jYh_Ujpnwxam1TNO; cmpl_token=AgQQAPOgF-RMpbDNIuufsZ04-pWPSIhMP4ArYP5gWA; odin_tt=04cf5d9f07b62e050c679ab203370816484a861d3efc80bd5d0db6fd4b0c4a6018acdd2d4b2b814e487f25ba678a53103e29abb336446c456ee9dfff04a0a789bdc6b29b4685b81aa50161179b68c98b; ttwid=1%7C5hEmJiL5W2c3q3WVqHbF85173NjIdJm9ZJJPEvxQeyI%7C1627801693%7C48ff7670e842ddd8b838a35541a94891eb144539cba2b0cb308b20254e6fe089; passport_fe_beating_status=false'
            }
        }).then((data: AxiosResponse) => {
			const $: CheerioAPI = cheerio.load(data.data)
            const res: any = $('body').find('#__NEXT_DATA__').get()[0].children[0]
            const result = JSON.parse(res.data).props.pageProps.userInfo.user
			const Stat = JSON.parse(res.data).props.pageProps.userInfo.stats
			const Format: TiktokStalk = {
				...result,
				follower: convertAngka(Number(Stat.followerCount)),
				following: convertAngka(Number(Stat.followingCount)),
				suka: convertAngka(Number(Stat.heart)),
				total_video: Stat. videoCount,
			}
			resolve(Format)
		}).catch((err: Error) => {
			reject(err)
			})
    })
}
