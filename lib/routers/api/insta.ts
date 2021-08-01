import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { instaStalk } from "../../typings";
import got from "got";
import cheerio, { CheerioAPI } from "cheerio";


export const InstaStalk = async (username: string, headers?: AxiosRequestConfig): Promise <instaStalk> => {
	return new Promise(async (resolve, reject) => {
		const Headers: AxiosRequestConfig= headers == undefined ? { headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
		}} : headers
		await axios.get(`https://www.instagram.com/${username}/?__a=1`, Headers).then((data: AxiosResponse) => {
			if (data.status !== 200) return reject(new Error(`Error status code : ${data.status}`))
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
export const InstaStalkV2 = async (username: string): Promise <instaStalk> => {
	return new Promise(async (resolve, reject) => {
		try {
			const Data: any = await got(`https://www.instagram.com/${username}/`, { searchParams: {__a: 1}})
			if (Data.statusCode !== 200) return  reject(new Error(`Error status code : ${Data.statusCode}`))
			const data: any = Data.json()
			const Format: instaStalk = {
				id: data.graphql.user.id,
				username: data.graphql.user.username,
				nickname: data.graphql.user.full_name,
				thumb: data.graphql.user.profile_pic_url_hd,
				bio: data.graphql.user.biography,
				id_fb: data.graphql.user.fbid,
				akun_bisnis: data.graphql.user.is_business_account,
				category: data.graphql.user.category_name,
				private:  data.graphql.user.is_private,
				centang: data.graphql.user.is_verified,
				total_post: data.graphql.user.edge_owner_to_timeline_media.count
			}
			resolve(Format)
		} catch (err) {
			reject(err)
		}	
	})
}
export const InstaStalkV3 = async (username: string): Promise <instaStalk> => {
	return new Promise (async (resolve, reject) => {
		try {
			let Format: instaStalk;
			const data: AxiosResponse = await axios.get(`https://www.instagram.com/${username}/`, {
				headers: {
					"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
				}
			})
			if (data.status !== 200) return reject(new Error(`Error status code : ${data.status}`))
			const $: CheerioAPI= cheerio.load(data.data)
			try {
				const script: string = $("script").eq(3).html();
				const {
					entry_data: {
						ProfilePage: {
							[0]: {
								graphql: { user },
							},
						},
					},
				} = JSON.parse(/window\._sharedData = (.+);/g.exec(script)[1]);
				Format = {
					id: user.id,
					username:  user.username,
					nickname: user.full_name,
					thumb: user.profile_pic_url_hd,
					bio: user.biography,
					id_fb: user.fbid,
					akun_bisnis: user.is_business_account,
					category: user.category_name,
					private: user.is_private,
					centang: user.is_verified,
					total_post: user. edge_owner_to_timeline_media.count
				}
			} catch (err) {
				const script: string = $("script").eq(4).html();
				const {
					entry_data: {
						ProfilePage: {
							[0]: {
								graphql: { user },
							},
						},
					},
				} = JSON.parse(/window\._sharedData = (.+);/g.exec(script)[1]);
				Format = {
					id: user.id,
					username:  user.username,
					nickname: user.full_name,
					thumb: user.profile_pic_url_hd,
					bio: user.biography,
					id_fb: user.fbid,
					akun_bisnis: user.is_business_account,
					category: user.category_name,
					private: user.is_private,
					centang: user.is_verified,
					total_post: user. edge_owner_to_timeline_media.count
				}
			} finally {
				resolve(Format)
			}
		} catch(err) {
			reject(err)
		}
	})
}