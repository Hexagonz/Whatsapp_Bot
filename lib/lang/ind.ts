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