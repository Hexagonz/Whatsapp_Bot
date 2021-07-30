import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { instaStalk } from "../../typings";


export const InstaStalk = async (username: string, headers?: AxiosRequestConfig): Promise <instaStalk | Error> => {
	return new Promise(async (resolve, reject) => {
		const Headers: AxiosRequestConfig= headers == undefined ? { headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
		}} : headers
		await axios.get(`https://www.instagram.com/${username}/?__a=1`, Headers).then((data: AxiosResponse) => {
			const Format: instaStalk = {
				id: data.data.graphql.user.id,
				username: data.data.graphql.user.username,
				nickname: data.data.graphql.user.full_name,
				thumb: data.data.graphql.user.profile_pic_url_hd,
				bio: data.data.graphql.user.biography,
				id_fb: data.data.graphql.user.fbid,
				akun_bisnis: data.data.graphql.user.is_business_account,
				category: data.data.graphql.user.category_name,
				private:  data.data.graphql.user.is_private,
				centang: data.data.graphql.user.is_verified,
				total_post: data.data.graphql.user.edge_owner_to_timeline_media.count
			}
			resolve(Format)
		}).catch((err: Error) => reject(err))
	})
}
