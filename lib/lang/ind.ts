import { instaStalk, TiktokStalk } from "../typings";
import { ChannelSearchResult } from "yt-search";
import { WAGroupMetadata } from "@adiwajshing/baileys"

export const IndTest = (): string => {
	return `Test`
}
export const IndTunggu = (): string => {
	return `Tunggu sebentar sedang menjalankan perintah...`
}
export const IndBukanVid = (): string => {
	return `Maaf file yang anda kirim bukan berformat video`
}
export const IndBukanAud = (): string => {
	return `Maaf file yang anda kirim bukan berformat audio`
}
export const IndToVid = (): string => {
	return `Maaf terjadi kesalahan pada fitur media tovideo harap coba lagi`
}
export const IndToCute = (): string => {
	return `Maaf terjadi kesalahan pada fitur media tocute harap coba lagi`
}
export const IndSuccesSetPrefix = (prefix: string, status: boolean): string => {
	return `Sukses mengubah prefix menjadi ${prefix}.\n\n_*Status Prefix saat ini :* ${status ? "multi" : prefix}_`
}
export const IndSuccesSetMulti = (status: boolean): string => {
	return `Sukses  ${status ? "Mengaktifkan mode multi prefix" : "Menonaktifkan mode multi prefix"}`
}
export const IndErrMulti = (status: boolean): string => {
	return `${status ? "Anda sudah berada dalam mode multi prefix" : "Anda sudah berada dalam mode non multi prefix check prefix anda, ketik prefix"}`
}
export const IndDonePushMulti = (Prefix: string): string => {
	return `Sukses menambakan prefix *[${Prefix}]* kedalam multi prefix`
}
export const IndErrPushMulti = () => {
	return `Harap masukkan prefix yang ingin di tambahkan kedalam multi prefix`
}
export const IndDoneDelMulti = (Prefix: string): string => {
	return `Berhasil menghapus prefix *[${Prefix}]* dalam multi prefix`
}
export const IndErrDelMulti = (): string => {
	return `Harap masukkan prefix yang ingin di tambahkan dihapus dalam multi prefix`
}
export const IndMultiData = (prefix: string): string => {
	return `Multi Prefix saat ini adalah *${prefix}*`
}
export const IndBukanSticker = (): string => {
	return `Harap kirim caption dengan reply sticker`
}
export const IndGagalSticker = (): string => {
	return `Terjadi keselahan dalam menbuat sticker harap coba lagi`
}
export const IndFileGede = (sender: string): string => {
	return `Maaf ka @${sender.replace(/@s.whatsapp.net/i, "")} Size media yang anda kirim terlalu besar untuk bot`
}
export const LimitStorage = (): string => {
	return `Maaf, Limit storage anda telah habis. Agar anda bisa menggunakan kembali harap hapus salah satu media anda untuk menambah limit storage`
}
export const IndIdDuplicate = (): string => {
	return `Maaf, Id yang anda masukkan sudah ada di penyimpanan bot harap ganti dengan id lain`
}
export const IndSuccesSave = (Id: string, Prefix: string, isOwner: boolean, limit: number): string => {
	return `
*ID :* ${Id}
*STATUS :* Berhasil menyimpan media ketik ${Prefix}get ${Id} untuk mengambil file anda
*NOTES*
Sisa Limit File anda tersisa  ${isOwner ? "Unlimited" : Number(4 - limit)}, jika habis anda tidak dapat menyimpan kembali`
}
export const IndMasukkanId = (): string => {
	return `Harap masukkan id`
}
export const IndIdStorageKosong = (): string => {
	return `Maaf id storage yang ingin anda cari kosong`
}
export const IndCheckStorage = (data: string[], sender: string): string => {
	let jumlah = 1
	let text = `*STORAGE*\n\n`
	for (let result of data) {
		text += `${jumlah}. ${result.split(".")[0].replace(sender, "")}\n`
		jumlah++
	}
	return text
}
export const IndErrorMP3 = (): string => {
	return `Maaf, Terjadi kesalahan pada fitur media mp3 silahkan coba kembali`
}
export const IgStalk = (data: instaStalk): string => {
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
export const IndUserKosong = (pushname: string): string => {
	return `Maaf ka ${pushname} Username instagram yang anda cari kosong / akun pemilik di private`
}
export const IndUsernameNoKosong = () => {
	return `Maaf ka Harap masukkan username instagram yang ingin anda stalk`
}
export const IndYtStalk = (data: ChannelSearchResult): string => {
	return `
Nama : ${data.name}
Url : ${data.url}
Total Video : ${data.videoCount}
Total Subcriber : ${data.subCountLabel}
`
}
export const IndYtStalkError = (): string => {
	return `Fitur Yt stalk sedang error harap coba lagi nanti`
}
export const IndStalkUsernameNull = (fitur: string): string => {
	return `Username ${fitur} yang anda cari sedang kosong`
}
export const IndTiktokStalk = (data: TiktokStalk): string => {
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
export const IndMasukkanUsernameNoUrl = (fitur: string): string => {
	return `Maaf ka harap masukkan username ${fitur} bukan Link`
}
export const Indverifikasi = (status: number, otp: string): string => {
	if (status === 1) {
		return `Kode Verifikasi anda adalah ${otp}, anda baru bisa meminta kode lagi dalam 5 menit`
	} else if (status === 2) {
		return `Kode Verifikasi anda adalah ${otp}, anda baru bisa meminta kode lagi dalam 90 menit`
	} else if (status === 3) {
		return `Kode verifikasi anda adalah ${otp}, anda baru bisa meminta kode lagi dalam 8 jam`
	} else if (status === 4) {
		return `Berhasil anda telah selesai melakukan verifikasi`
	} else {
		return ""
	}
}
export const IndPublicSucces = (status: boolean): string => {
	return `Berhasil mengubah status Bot ${status ? "ke publik" : "ke Self"}`
}
export const IndPublicDuplicate = (status: boolean): string => {
	return `Status Bot untuk saat ini sudah ${status ? "PUBLIK" : "SELF"}`
}
export const IndPrefix = (Pref: string): string => {
	return `Prefix anda untuk saat ini adalah *[${Pref}]*`
}
export const IndSpammer = (): string => {
	return `Warning Harap tunggu perintah anda sebelumnya berakhir untuk mencegah terjadinya spam`
}
export const IndStickerReply = (command: string): string => {
	return `Maaf ka harap Kirim/ reply Gambar/video/sticker dengan caption ${command} untuk menggunakan fitur sticker`
}
export const IndSpam5S = (jeda: string): string => {
	return `Maaf ka setelah anda menggunakan command ada jeda ${jeda} detik untuk anda bisa menggunakan command kembali`
}
export const StickerDuplicate = (sender: string, posisi: number): string => {
	return `Maaf ka media itu udah pernah dijadiin sticker sebelumnya di grup ini sebelumnya si @${sender.replace("@s.whatsapp.net", "")}, Urutan ${posisi} sebelumnya`
}
export const StickerFound = (sender: string): string => {
	return `Ini ka @${sender.replace("@s.whatsapp.net", "")} stickernya jangan menggunakan media yang sama`
}
export const BotGaAdmin = () => {
	return `Maaf Bot bukan admin tidak bisa melaksanakan perintah`
}
export const PilihBukatutup = () => {
	return `Format salah Pilih buka/tutup`
}
export const BukanDalamGroup = () => {
	return `Maaf ka bot bukan Perintah ini hanya tersedia didalam group`
}
export const UserBaruOut = () => {
	return `Maaf user tersebut baru baru ini keluar group anda tidak bisa memasukkannya`
}
export const UserDalamGroup = () => {
	return `Maaf user tersebut telah berada didalam group`
}
export const UserGadaDalamGroup = () => {
	return `Maaf user tersebut tidak ada didalam group`
}
export const UserPrivate = () => {
	return `Maaf tidak dapat menginvit user tersebut kedalam group kemungkinan di private`
}
export const SuccesAdd= () => {
	return `Succes add member ke group`
}
export const AddHarapTagSeseorang = () => {
	return `Maaf ka harap tag/ reply seseorang yang ingin ditambahkan`
}
export const TagOrReply = () => {
	return `Maaf ka Harap tag/reply seseorang`
}
export const isOwnerGroupNokick = () => {
	return `Maaf Bot tidak dapat mengeluarkan owner group`
}
export const kickSucces = (sender: string) => {
	return `Berhasil mengeluarkan @${sender.replace("@s.whatsapp.net", "")}`
}
export const Admindia = (sender: string) => {
	return `Tidak dapat mengeluarkan @${sender.replace("@s.whatsapp.net", "")} karena sesama admin, Hanya owner group yang bisa mengeluarkan admin`
}
export const ButakahLinkGc = () => {
	return `Butakah ? di deskripsi group ada tod, caper caper`
}
export const IndLinkGroup = (groupMetadata: WAGroupMetadata, link: string) => {
	return `
Group : ${groupMetadata.subject}
Link: ${link}`
}
export const SuccesOpenCloseGc = (Status: boolean) => {
	return Status ? "Berhasil menutup group" : "Berhasil membuka group"
}
export const PromoteSuccess = (tag: string) => {
	return `Berhasil menjadikan ${tag.replace("@s.whatsapp.net", "")} seorang admin`
}
export const DemoteSuccess = (tag: string) => {
	return `Berhasil menurunkan jabatan ${tag.replace("@s.whatsapp.net", "")}`
}
export const PromoteDiaAdmin = (tag: string) => {
	return `Anda tidak dapat menaikkan jabatan ${tag.replace("@s.whatsapp.net", "")} karena dia sudah menjadi admin`
}
export const DemoteBukanAdmin = (tag: string) => {
	return `Gagal, anda tidak dapat menurunkan jabatan ${tag.replace("@s.whatsapp.net", "")} karena dia bukan admin`
} 
export const GagalUpdatePP = () => {
	return `Terjadi kesalahan saat ingin mengubah profile grup`
}
export const SuccesUpdatePP = () => {
	return `Berhasil mengubah foto profil group`
}
export const SuccesSetName = (nama: string) => {
	return `Berhasil mengubah nama  menjadi ${nama}`
}
export const SuccesSetDesk = () => {
	return `Berhasil mengubah deskripsi group`
}