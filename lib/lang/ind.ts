import { instaStalk, TiktokStalk } from "../typings";
import { ChannelSearchResult } from "yt-search";
import { WAgroupMetadata } from "@adiwajshing/baileys"

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
export const IndKesalahan = (): string => {
	return `Maaf terjadi kesalahan pada fitur ini, harap coba beberapa saat lagi`
}
export const IndSuccesSetPrefix = (prefix: string, status: boolean): string => {
	return `Sukses mengubah prefix menjadi *${prefix}*\n\n_*Status Prefix saat ini :* ${status ? "multi" : prefix}_`
}
export const IndSuccesSetMulti = (status: boolean): string => {
	return `Sukses  ${status ? "Mengaktifkan mode multi prefix" : "Menonaktifkan mode multi prefix"}`
}
export const IndErrMulti = (status: boolean): string => {
	return `${status ? 'Anda sudah berada dalam mode multi prefix' : 'Anda sudah berada dalam mode non multi prefix check prefix anda, ketik "prefix"'}`
}
export const IndDonePushMulti = (Prefix: string): string => {
	return `Sukses menambakan prefix *${Prefix}* kedalam multi prefix`
}
export const IndErrPushMulti = () => {
	return `Harap masukkan prefix yang ingin di tambahkan kedalam multi prefix`
}
export const IndDoneDelMulti = (Prefix: string): string => {
	return `Berhasil menghapus prefix *${Prefix}* dari multi prefix`
}
export const IndErrDelMulti = (): string => {
	return `Harap masukkan prefix yang ingin dihapus di dalam multi prefix`
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
	return `Maaf ka @${sender.replace(/@s.whatsapp.net/i, "")}, Size media yang anda kirim terlalu besar untuk bot`
}
export const LimitStorage = (): string => {
	return `Maaf, Limit storage anda telah habis. Agar anda bisa menggunakan kembali harap hapus salah satu media anda untuk menambah limit storage`
}
export const IndIdDuplicate = (): string => {
	return `Maaf, Id yang anda masukkan sudah ada di penyimpanan bot harap ganti dengan id lain`
}
export const IndSuccesSave = (Id: string, Prefix: string, isOwner: boolean, limit: number): string => {
	return `*ID File :* ${Id}
*STATUS :* Berhasil menyimpan media ketik "${Prefix}get ${Id}" untuk mengambil file anda

*-ˋˏ NOTES ˎˊ-*
Sisa Limit File anda tersisa  ${isOwner ? "Unlimited" : Number(4 - limit)}, jika habis anda tidak dapat menyimpan kembali`
}
export const IndMasukkanId = (): string => {
	return `Harap masukkan id`
}
export const IndIdStorageKosong = (): string => {
	return `Maaf id storage yang anda cari tidak ada`
}
export const IndCheckStorage = (data: string[], sender: string): string => {
	let jumlah = 1
	let text = `*-ˋˏ STORAGE ˎˊ-*\n`
	for (let result of data) {
		text += `${jumlah}. ${result.split(".")[0].replace(sender, "")}\n`
		jumlah++
	}
	return text
}
export const IgStalk = (data: instaStalk): string => {
	return `*-ˋˏ IG Stalk ˎˊ-*
*Id :* ${data.id}
*Username :* ${data.username}
*Nickname :* ${data.nickname}
*Kategori :* ${data.category}
*Bio :* ${data.bio}
*Akun bisnis :* ${data.akun_bisnis ? "Iya" : "Tidak"}
*Private Akun :* ${data.private ? "Iya" : "Tidak"}
* Akun Terverifikasi :* ${data.centang ? "Iya" : "Tidak"}
*Total Post:* ${data.total_post}`
}
export const IndUserKosong = (pushname: string): string => {
	return `Maaf ka ${pushname} Username instagram yang anda cari kosong / akun pemilik di private`
}
export const IndUsernameNoKosong = () => {
	return `Maaf ka Harap masukkan username instagram yang ingin anda stalk`
}
export const IndYtStalk = (data: ChannelSearchResult): string => {
	return `*-ˋˏ YT Stalk ˎˊ-*
*Nama :* ${data.name}
*Url :* ${data.url}
*Total Video :* ${data.videoCount}
*Total Subcriber :* ${data.subCountLabel}`
}
export const IndStalkUsernameNull = (fitur: string): string => {
	return `Username yang anda cari di ${fitur} tidak ada`
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
	return `*-ˋˏ TikTok Stalk ˎˊ-*
*ID :* ${data.id}
*Unique Id :* ${data.uniqueId}
*Nickname :* ${data.nickname}
*Signature :* ${data.signature}
*Tanggal Buat :* ${Tanggal_Upload}
*Verified :* ${data.verified ? "Yes" : "No"}
*Private :* ${data.privateAccount ? "Yes" : "No"}
*Bio Link :* ${data.bioLink ? data.bioLink.link : ""}
*Room Id :* ${data.roomId}`
}
export const IndMasukkanUsernameNoUrl = (fitur: string): string => {
	return `Maaf ka harap masukkan username yang ingin anda cari di ${fitur}, bukan Link`
}
export const Indverifikasi = (status: number, otp: string): string => {
	if (status === 1) {
		return `Kode Verifikasi anda adalah ${otp}, anda baru bisa meminta kode lagi dalam 5 menit`
	} else if (status === 2) {
		return `Kode Verifikasi anda adalah ${otp}, anda baru bisa meminta kode lagi dalam 90 menit`
	} else if (status === 3) {
		return `Kode verifikasi anda adalah ${otp}, anda baru bisa meminta kode lagi dalam 8 jam`
	} else if (status === 4) {
		return `Berhasil!, Anda telah selesai melakukan verifikasi`
	} else {
		return ""
	}
}
export const IndPublicSucces = (status: boolean): string => {
	return `Berhasil mengubah status Bot menjadi : *${status ? "Publik" : "Self"}*`
}
export const IndPublicDuplicate = (status: boolean): string => {
	return `Status Bot untuk saat ini sudah *${status ? "Publik" : "Self"}*`
}
export const IndPrefix = (Pref: string): string => {
	return `Prefix anda untuk saat ini adalah *[${Pref}]*`
}
export const IndSpammer = (): string => {
	return `Spam detected!, Harap tunggu sebentar untuk mencegah terjadinya spam`
}
export const IndStickerReply = (command: string): string => {
	return `Maaf ka harap Kirim/reply Gambar/video/sticker dengan caption ${command} untuk menggunakan fitur sticker`
}
export const IndSpam5S = (jeda: string): string => {
	return `Maaf ka setelah anda menggunakan command ada jeda ${jeda} detik untuk anda bisa menggunakan command kembali`
}
export const StickerDuplicate = (sender: string, posisi: number): string => {
	return `Maaf ka media itu udah pernah dijadiin sticker sebelumnya di grup ini sebelumnya si @${sender.replace("@s.whatsapp.net", "")}, Urutan ${posisi} sebelumnya`
}
export const StickerFound = (sender: string): string => {
	return `Ini ka @${sender.replace("@s.whatsapp.net", "")}, Stickernya jangan menggunakan media yang sama`
}
export const BotGaAdmin = () => {
	return `Maaf Bot bukan admin. Tidak bisa melaksanakan perintah`
}
export const PilihBukatutup = () => {
	return `Format salah, pilih buka/tutup`
}
export const BukanDalamgrup = () => {
	return `Maaf ka, perintah ini hanya tersedia didalam grup`
}
export const UserBaruOut = () => {
	return `Maaf, user tersebut baru-baru ini keluar grup. Anda tidak bisa memasukkannya`
}
export const UserDalamgrup = () => {
	return `Maaf, user tersebut telah berada didalam grup`
}
export const UserGadaDalamgrup = () => {
	return `Maaf, user tersebut tidak ada didalam grup`
}
export const UserPrivate = () => {
	return `Maaf, tidak dapat menginvite user tersebut kedalam grup. Kemungkinan di private`
}
export const SuccesAdd= () => {
	return `Berhasil add member ke grup`
}
export const AddHarapTagSeseorang = () => {
	return `Maaf ka, harap tag/reply seseorang yang ingin ditambahkan`
}
export const TagOrReply = () => {
	return `Maaf ka, harap tag/reply seseorang`
}
export const isOwnergrupNokick = () => {
	return `Maaf, Bot tidak dapat mengeluarkan owner grup`
}
export const kickSucces = (sender: string) => {
	return `Berhasil mengeluarkan @${sender.replace("@s.whatsapp.net", "")}`
}
export const Admindia = (sender: string) => {
	return `Tidak dapat mengeluarkan @${sender.replace("@s.whatsapp.net", "")} karena sesama admin, Hanya owner grup yang bisa mengeluarkan admin`
}
export const ButakahLinkGc = () => {
	return `Silahkan ambil linknya di desc grup`
}
export const IndLinkgrup = (grupMetadata: WAgroupMetadata, link: string) => {
	return `*grup :* ${grupMetadata.subject}
*Link :* ${link}`
}
export const SuccesOpenCloseGc = (Status: boolean) => {
	return Status ? "Berhasil menutup grup" : "Berhasil membuka grup"
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
	return `Anda tidak dapat menurunkan jabatan ${tag.replace("@s.whatsapp.net", "")} karena dia bukan admin`
} 
export const GagalUpdatePP = () => {
	return `Terjadi kesalahan saat ingin mengubah profile grup`
}
export const SuccesUpdatePP = () => {
	return `Berhasil mengubah foto profil grup`
}
export const SuccesSetName = (nama: string) => {
	return `Berhasil mengubah nama menjadi *${nama}*`
}
export const SuccesSetDesk = () => {
	return `Berhasil mengubah deskripsi grup`
}
export const IndListOn = (result: { id: string, nama: string | undefined}[]): string => {
	let Text: string = `*-ˋˏ List Online ˎˊ-*\n`
	let count: number = 1
	for (let respon of result) {
		Text += count + ". " + "@" + respon.id.replace("@s.whatsapp.net", "") + ` (${respon.nama})\n`
		count++
	}
	return Text
}
export const IndGadaOn = () =>{
	return `Untuk saat ini tidak ada yang terlihat online`
}
export const IndVoteStart = (pelapor: string, target: string, alasan: string, time: number) => {
	return `*-ˋˏ Voting ˎˊ-*
*Pengajuan Voting :* @${pelapor.replace('@s.whatsapp.net','')}
*Target Vote :* @${target.replace('@s.whatsapp.net','')}
*Alasan :* ${alasan}


Ketik *vote* Jika setuju
Ketik *devote* Jika tidak

Voting berlangsung selama ${time} Menit`
}
export const IndVoting = (pelapor: string, target: string, alasan: string, data: any) => {
	let Text = `*-ˋˏ Voting ˎˊ-*
*Pengajuan Voting :* @${pelapor.replace('@s.whatsapp.net','')}
*Target Vote :* @${target.replace('@s.whatsapp.net','')}
*Alasan :* ${alasan}


Ketik *vote* Jika setuju
Ketik *devote* Jika tidak`
let Vote: number = 1
let Devote: number = 1
let vote:  { id: string | null | undefined, status: string, pushname: string }[] = data.filter((value: { id: string | null | undefined, status: string, pushname: string }) => value.status == "vote")
let devote:  { id: string | null | undefined, status: string, pushname: string }[] = data.filter((value: { id: string | null | undefined, status: string, pushname: string }) => value.status == "devote")
Text += "*-ˋˏ Vote ˎˊ-*\n"
for (let result of vote) {
	Text += `${Vote}. ${result.pushname} *(${result.id?.replace("@s.whatsapp.net", "")})*\n`
	Vote++
}
Text += "\n*-ˋˏ Devote ˎˊ-*\n"
for (let result of devote) {
	Text += `${Devote}. ${result.pushname} *(${result.id?.replace("@s.whatsapp.net", "")})*\n`
	Devote++
}
return Text
}
export const IndHasilVote = (pelapor: string, target: string, alasan: string, data: any) => {
	let Text: string = `*-ˋˏ Voting ˎˊ-*
*Pengajuan Voting :* @${pelapor.replace('@s.whatsapp.net','')}
*Target Vote :* @${target.replace('@s.whatsapp.net','')}
*Alasan :* ${alasan}\n\n`
let Vote: number = 1
let Devote: number = 1
let vote:  { id: string | null | undefined, status: string, pushname: string }[] = data.filter((value:  { id: string | null | undefined, status: string, pushname: string }) => value.status == "vote")
let devote:  { id: string | null | undefined, status: string, pushname: string }[] = data.filter((value:  { id: string | null | undefined, status: string, pushname: string }) => value.status == "devote")
Text += `Voting berakhir dengan hasil :\n${(vote.length)}\nDevote : ${(devote.length)}\n\n\n`
Text += "*-ˋˏ Vote ˎˊ-*\n"
for (let result of vote) {
	Text += `${Vote}. ${result.pushname} *(${result.id?.replace("@s.whatsapp.net", "")})*\n`
	Vote++
}
Text += "\n*-ˋˏ Devote ˎˊ-*\n"
for (let result of devote) {
	Text += `${Devote}. ${result.pushname}  *(${result.id?.replace("@s.whatsapp.net", "")})*\n`
	Devote++
}
Text += "\n*Voting di tutup*"
return Text
}
export const IndTagall = (data: string[] | undefined) => {
	let Text: string = "*-ˋˏ Tag All ˎˊ-*\n"
	let count: number = 1
	for (let result of data || []) {
		Text += count + ". " + "@" + result.replace("@s.whatsapp.net", "") + "\n"
		count++
	}
	return Text
}
export const IndRevoked = (nama: string) => {
	return `Berhasil mereset link grup ${nama}`
}
export const IndSesiVotingAda = () => {
	return `Maaf sesi voting sedang berlangsung di grup ini, selesaikan sesi voting terlebih dahulu/admin grup bisa mereset sesi voting`
}
export const IndSesiVotingGada = () => {
	return `Maaf sesi voting tidak ada dalam grup ini, harap aktifkan sesi voting terlebih dahulu`
}
export const IndResetSesi = () => {
	return `Berhasil menghapus sesi voting dalam grup ini`
}
export const IndVoteLebih15 = () => {
	return `Maaf waktu voting tidak boleh lebih dari 15 menit`
}
export const BerhasilKickVote = (sender: string) => {
	return `Berhasil mengeluarkan @${sender.replace("@s.whatsapp.net", "")} berdasarkan sesi voting`
}
export const CancelVote = () => {
	return `Berhasil membatalkan vote dikarenakan lebih dari 15 orang memilih devote`
}
export const DiaKeluarVote = () => {
	return `Yah Out, voting ditutup`
}
export const BukanStickerGif = () => {
	return `Maaf ka, stiker bukan berformat gif`
}
export const InputImage = () => {
	return `Maaf ka, harap kirim/reply gambar dengan caption`
}
export const IndBukanSgif = () => {
	return `Maaf ka, sticker gif tidak bisa dijadiin profil`
}
