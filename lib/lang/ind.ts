import { instaStalk, TiktokStalk } from "../typings";
import { ChannelSearchResult } from "yt-search";

export const IndTest = () => {
	return `Test`
}
export const IndTunggu = () => {
	return `Tunggu sebentar sedang menjalankan perintah...`
}
export const IndBukanVid = () => {
	return `Maaf file yang anda kirim bukan berformat video`
}
export const IndBukanAud = () => {
	return `Maaf file yang anda kirim bukan berformat audio`
}
export const IndToVid = () => {
	return `Maaf terjadi kesalahan pada fitur media tovideo harap coba lagi`
}
export const IndToCute = () => {
	return `Maaf terjadi kesalahan pada fitur media tocute harap coba lagi`
}
export const IndSuccesSetPrefix = (prefix: string, status: boolean) => {
	return `Sukses mengubah prefix menjadi ${prefix}.\n\n_*Status Prefix saat ini :* ${status ? "multi" : prefix}_`
}
export const IndSuccesSetMulti = (status: boolean) => {
	return `Sukses  ${status ? "Mengaktifkan mode multi prefix" : "Menonaktifkan mode multi prefix"}`
}
export const IndErrMulti = (status: boolean) => {
	return `${status ? "Anda sudah berada dalam mode multi prefix" : "Anda sudah berada dalam mode non multi prefix check prefix anda, ketik prefix"}`
}
export const IndDonePushMulti = (Prefix: string) => {
	return `Sukses menambakan prefix *[${Prefix}]* kedalam multi prefix`
}
export const IndErrPushMulti = () => {
	return `Harap masukkan prefix yang ingin di tambahkan kedalam multi prefix`
}
export const IndDoneDelMulti = (Prefix: string) => {
	return `Berhasil menghapus prefix *[${Prefix}]* dalam multi prefix`
}
export const IndErrDelMulti = () => {
	return `Harap masukkan prefix yang ingin di tambahkan dihapus dalam multi prefix`
}
export const IndMultiData = (prefix: string) => {
	return `Multi Prefix saat ini adalah *${prefix}*`
}
export const IndBukanSticker = () => {
	return `Harap kirim caption dengan reply sticker`
}
export const IndGagalSticker = () => {
	return `Terjadi keselahan dalam menbuat sticker harap coba lagi`
}
export const IndFileGede = (sender: string) => {
	return `Maaf ka @${sender.replace(/@s.whatsapp.net/i, "")} Size media yang anda kirim terlalu besar untuk bot`
}
export const LimitStorage = () => {
	return `Maaf, Limit storage anda telah habis. Agar anda bisa menggunakan kembali harap hapus salah satu media anda untuk menambah limit storage`
}
export const IndIdDuplicate = () => {
	return `Maaf, Id yang anda masukkan sudah ada di penyimpanan bot harap ganti dengan id lain`
}
export const IndSuccesSave = (Id: string, Prefix: string, isOwner: boolean, limit: number) => {
	return `
*ID :* ${Id}
*STATUS :* Berhasil menyimpan media ketik ${Prefix}get ${Id} untuk mengambil file anda
*NOTES*
Sisa Limit File anda tersisa  ${isOwner ? "Unlimited" : Number(4 - limit)}, jika habis anda tidak dapat menyimpan kembali`
}
export const IndMasukkanId = () => {
	return `Harap masukkan id`
}
export const IndIdStorageKosong = () => {
	return `Maaf id storage yang ingin anda cari kosong atau tidak ada`
}
export const IndCheckStorage = (data: string[], sender: string) => {
	let jumlah = 1
	let text = `*STORAGE*\n\n`
	for (let result of data) {
		text += `${jumlah}. ${result.split(".")[0].replace(sender, "")}\n`
		jumlah++
	}
	return text
}
export const IndErrorMP3 = () => {
	return `Maaf, Terjadi kesalahan pada fitur media mp3 silahkan coba kembali`
}
export const IgStalk = (data: instaStalk) => {
	return `
	*INSTAGRAM STALK*
	
*🎁 Id :* ${data.id}
*🌐 Username :* ${data.username}
*🌹 Nickname :* ${data.nickname}
*⚔️ Kategori :* ${data.category}
*🎀 Bio :* ${data.bio}
*🔖Akun bisnis :* ${data.akun_bisnis ? "Iya" : "Tidak"}
*🔐 Private Akun :* ${data.private ? "Iya" : "Tidak"}
*🚨 Akun Terverifikasi :* ${data.centang ? "Iya" : "Tidak"}
*📦 Total Post:* ${data.total_post}
`
}
export const IndUserKosong = (pushname: string) => {
	return `Maaf ka ${pushname} Username instagram yang anda cari kosong / akun pemilik di private`
}
export const IndUsernameNoKosong = () => {
	return `Maaf ka Harap masukkan username instagram yang ingin anda stalk`
}
export const IndYtStalk = (data: ChannelSearchResult) => {
	return `
Nama : ${data.name}
Url : ${data.url}
Total Video : ${data.videoCount}
Total Subcriber : ${data.subCountLabel}
`
}
export const IndYtStalkError = () => {
	return `Fitur Yt stalk sedang error harap coba lagi nanti`
}
export const IndStalkUsernameNull = (fitur: string) => {
	return `Username ${fitur} yang anda cari sedang kosong`
}
export const IndTiktokStalk = (data: TiktokStalk) => {
	const Tanggal_Upload = new Date(Number(data.createTime) * 1000).toLocaleString("id", {
	year: "numeric",
	month: "short",
	weekday: 'short',
	hour: 'numeric',
	minute: 'numeric',
	day: "numeric"
	})
	return `
ID : ${data.id}
Unique Id : ${data.uniqueId}
Nickname : ${data.nickname}
Signature : ${data.signature}
Tanggal Buat : ${Tanggal_Upload}
Verived : ${data.verified ? "Yes" : "No"}
Private : ${data.privateAccount ? "Yes" : "No"}
Bio Link : ${data.bioLink ? data.bioLink.link : ""}
Room Id : ${data.roomId}
`
}
export const IndMasukkanUsernameNoUrl = (fitur: string) => {
	return `Maaf ka harap masukkan username ${fitur} bukan Link`
}
