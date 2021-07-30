import moment from "moment-timezone"

moment.tz.setDefault("Asia/Jakarta").locale('id')

export const Ucapan = () => {
	const data = moment(new Date())
	let ucapan = `Semoga harimu baik ya`
		if (Number(data.format("HH")) >= 3 && Number(data.format("HH")) <= 6) {
			ucapan = `Jangan Lupa solat subuh ya bagi yang muslim`
		} else if (Number(data.format("HH")) >= 6 && Number(data.format("HH")) <= 10) {
			ucapan = `Selamat pagi`
		} else if (Number(data.format("HH")) >= 10 && Number(data.format("HH")) <= 14) {
			ucapan = `Selamat Siang`
		} else if (Number(data.format("HH")) >= 14 && Number(data.format("HH")) <= 18) {
			ucapan = `Selamat Sore`
		} else if (Number(data.format("HH")) >= 18 && Number(data.format("HH")) <= 19) {
			ucapan = `Jangan Lupa solat magrib ya`
		} else if (Number(data.format("HH")) >= 19 && Number(data.format("HH")) <= 23) {
			ucapan = `Selamat malam`
		} else if (Number(data.format("HH")) >= 23 || Number(data.format("HH")) >= 0 && Number(data.format("HH")) <= 3) {
			ucapan = `Selamat tidur jangan kebanyakan begadang ya nanti sakit :)`
		}
	return ucapan
}