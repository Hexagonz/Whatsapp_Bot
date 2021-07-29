import got from "got";

export function isUrl (Link: string): RegExpMatchArray | null {
	return Link.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}
export async function Buffer(Url: string): Promise <Buffer> {
	const data = await got(Url, {
		method: "GET",
		headers: {
			"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
		}
	}).buffer()
	return data
}