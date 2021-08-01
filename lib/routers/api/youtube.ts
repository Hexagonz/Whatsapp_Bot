import ytSearch, { SearchResult, ChannelSearchResult } from "yt-search";


export async function ytStalk (channel: string): Promise <ChannelSearchResult> {
	return new Promise(async (resolve, reject) => {
		await ytSearch(channel, (err, call: SearchResult ) => {
			if (err) return reject(err)
			const Channel: ChannelSearchResult  = call.channels[0]
			resolve(Channel)
		})
	})
}