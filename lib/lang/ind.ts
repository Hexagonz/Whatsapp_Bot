export const IndTest = () => {
	return `Test`
}
export const IndTunggu = () => {
	return `Tunggu sebentar sedang menjalankan perintah`
}
export const IndBukanVid = () => {
	return `Maaf file yang anda dikirim bukan termasuk video`
}
export const IndBukanAud = () => {
	return `Maaf file yang anda dikirim bukan termasuk audio`
}
export const IndToVid = () => {
	return `Maaf Fitur media tovideo anda sedang error harap ganti media`
}
export const IndToCute = () => {
	return `Maaf Fitur media tocute anda sedang error harap coba lagi`
}
export const IndSuccesSetPrefix = (prefix: string, status: boolean) => {
	return `Succes mengubah prefix menjadi ${prefix}.\n\n*Status Prefix :* ${status ? "multi" : prefix}`
}
export const IndSuccesSetMulti = (status: boolean) => {
	return `Succes  ${status ? "Mengaktifkan mode multi prefix" : "Menonaktifkan mode multi prefix"}`
}
export const IndErrMulti = (status: boolean) => {
	return `${status ? "Anda sudah berada dalam mode multi prefix" : "Anda sudah berada dalam mode non multi prefix check prefix anda, ketik prefix"}`
}
export const IndDonePushMulti = (Prefix: string) => {
	return `Succes menambakan prefix *[${Prefix}]* kedalam multi prefix`
}
export const IndErrPushMulti = () => {
	return `Harap masukkan prefix yang ingin di tambahkan kedalam multi prefix`
}
export const IndDoneDelMulti = (Prefix: string) => {
	return `Succes menghapus prefix *[${Prefix}]* dalam multi prefix`
}
export const IndErrDelMulti = () => {
	return `Harap masukkan prefix yang ingin di tambahkan dihapus dalam multi prefix`
}
export const IndMultiData = (prefix: string) => {
	return `Multi Prefix saat ini adalah  ${prefix}`
}
export const IndBukanSticker = () => {
	return `Harap kirim caption dengan reply sticker`
}
export const IndGagalSticker = () => {
	return `Gagal menbuat sticker harap ganti media lain`
}
export const IndFileGede = (sender: string) => {
	return `Maaf ka @${sender.replace(/@s.whatsapp.net/i, "")} Size media yang anda kirim terlalu besar untuk bot`
}
export const LimitStorage = () => {
	return `*「❗」* Maaf Limit storage anda telah habis, Agar anda bisa menggunakan kembali harap hapus salah satu media anda untuk menambah limit storage`
}
export const IndIdDuplicate = () => {
	return `*「❗」* Maaf Id yang anda masukkan duplicate harap ganti dengan id lain`
}
export const IndSuccesSave = (Id: string, Prefix: string, isOwner: boolean, limit: number) => {
	return `
*📬 ID :* ${Id}
*📍 STATUS :* Berhasil menyimpan media ketik ${Prefix}get ${Id} untuk mengambil file anda
*📧 NOTES :* Sisa Limit File anda tersisa  ${isOwner ? "Unlimited" : Number(4 - limit)}, jika habis anda tidak dapat menyimpan kembali`
}
export const IndMasukkanId = () => {
	return `*「❗」* Harap masukkan id`
}
export const IndIdStorageKosong = () => {
	return `*「❗」* Maaf id storage yang ingin anda cari kosong`
}
export const IndCheckStorage = (data: string[], sender: string) => {
	let jumlah = 1
	let text = `*「 𝐒𝐓𝐎𝐑𝐀𝐆𝐄 」*\n\n`
	for (let result of data) {
		text += `${jumlah}. ${result.split(".")[0].replace(sender, "")}\n`
		jumlah++
	}
	return text
}
export const IndErrorMP3 = () => {
	return `*「❗」* Maaf fitur media mp3 yang anda masukkan error`
}